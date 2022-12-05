import { User } from "@prisma/client";
import { prisma } from "./db";
import { IRCClient } from "./irc/irc";
import { ServerInformaiton } from "./irc/protocol";
import { hashPassword } from "./util";
import log from 'electron-log';
import { Message, Root, Server } from "data-models";

export class AOLMessenger {

  private currentUser: User | undefined
  public window: Electron.CrossProcessExports.BrowserWindow | null

  private serverData: Root = {}

  constructor(window: Electron.CrossProcessExports.BrowserWindow | null) {
    this.window = window
  }

  /**
   * TODO: Define me
   * @param name
   * @param username
   * @param password
   */
  async signUp(name: string, username: string, password: string) {
    const [hashedPassword, salt] = hashPassword(password);

    const data = {
      username: username,
      name: name,
      hashedPassword: hashedPassword,
      salt: salt,
    }

    const user = await prisma.user.create({data})
    this.currentUser = user;
    this.window!.webContents.send('authSuccess', [user.username, user.name]);
  }

  /**
   * TODO: Define me
   * @param username
   * @param password
   * @returns
   */
  async login(username: string, password: string) {
    const user = await prisma.user.findFirst({where: {username: username}})

    if (!user) {
      console.error("user does not exsit for: ", username)
      // TODO throw error back towards the UI
      return
    }

    const [hashedPassword] = hashPassword(password, user.salt);

    if (user.hashedPassword !== hashedPassword) {
      console.error("BAD PASSWORD")
      return
    }

    this.currentUser = user;

    this.window!.webContents.send('authSuccess', [user.username, user.name]);
    console.log(user)
  }

  /**
   * TODO: define me
   * @param server
   * @returns
   */
  createIRCClient(server: ServerInformaiton) {
    if (!this.currentUser){
      log.warn("Attemping to login with no user...")
      return
    }

    const client = {
      realName: this.currentUser.name,
      username: this.currentUser.username,
      nickname: this.currentUser.username,
    };

    const config = {
      pingInterval: 20 * 1000, // this is arbitrary (maybe there is a proper number)
    };

    const ircClient = new IRCClient(server, client, config);

    // init server
    this.initServer(ircClient);

    ircClient.connect();
    this.pushServerData();
    this.registerEvents(ircClient);
    setTimeout(() => ircClient.requestLIST([]), 6500);
    setTimeout(() => ircClient.joinCHANNEL(["#test"], []), 5100);
    setTimeout(() => ircClient.joinCHANNEL(["#general"], []), 5200);
    setTimeout(() => ircClient.sendPrivmsg("#general", "Hello World"), 5300);
  }

  /**
   * Pushes all data assocaited with the server name to the frontend.
   * @param serverName
   */
  sendServerData(serverName: string, channelName: string) {
    // name has contender as refresh()

    // push each set of data
    this.pushMetadata(serverName);
    this.pushServerData();
    this.pushChannelData(channelName);
  }

  /**
   * Initalize the ice client's object inside of {@link serverData} and deal with all the database related code.
   * @param ircClient
   */
  private initServer(ircClient: IRCClient) {
    // TODO:  grab data from database if it exists.
    this.serverData[ircClient.server.host] = {
      name: ircClient.server.host,
      users: {},
      naiveChannelList: [],
      naiveUserList: [],
      channels: {},
      privateMessages: {},
      metadata: {
        motd: [],
        notices: []
      },
    }
  }

  /**
   * Pushes the metadata from the {@link serverData} over the electron connection for a valid serverName
   * @param serverName
   * @returns void
   */
  private pushMetadata(serverName: string) {
    const metadata = this.serverData[serverName]?.metadata
    if (!metadata) {
      log.warn("can't send data that doesn't exist");
      return
    }
    this.window!.webContents.send('serverMetadata', [serverName, metadata]);
  }

  /**
   * Pushes the channel data from the {@link serverData} over the electron connection for a valid serverName
   * @param serverName
   * @returns void
   */
  private pushChannelData(channelName: string) {

  }

  /**
   * Pushes the server from the {@link serverData} over the electron connection for a valid serverName
   *
   * The data is the object keys from {@link serverData} with some of the assoicated server information.
   * @param serverName
   * @returns void
   */
  private pushServerData() {
    // TODO: push data that has to do with servers from here
    const data: Array<Pick<Server, "name">> = [];
    for (const [serverName, serverData] of Object.entries(this.serverData)) {
      data.push({name: serverName})
    }
    this.window!.webContents.send('sendServerData', [data]);
  }

  private pushMessages(serverName: string, destination: string) {
    if (this.serverData[serverName].channels[destination]) {
      this.window!.webContents.send('sendMessageData', [destination, this.serverData[serverName].channels[destination].messages]);
    } else if(this.serverData[serverName].privateMessages[destination]) {
      this.window!.webContents.send('sendMessageData', [destination, this.serverData[serverName].privateMessages[destination].messages]);
    }
  }

  /*

  */
  private addChannelData(serverName: string, source: string, channelName: string, messageContent: string | undefined) {
    if (!this.serverData[serverName]) {
      log.warn("server does not exist");
      return
    }

    // create channel if it doesn't exist
    if (!this.serverData[serverName]!.channels[channelName]) {
      this.serverData[serverName]!.channels[channelName] = {
        name: channelName,
        messages: []
      }
      this.serverData[serverName]!.naiveChannelList.push(channelName);
      console.log(this.serverData[serverName]!.channels[channelName])
      console.log(this.serverData[serverName]!.naiveChannelList);
    }

    if (messageContent) {
      const message: Message = {
        sender: source,
        content: messageContent,
        isSelf: source === this.currentUser?.username,
        id: this.serverData[serverName]?.channels[channelName].messages.length!
      }

      this.serverData[serverName]?.channels[channelName].messages.push(message);
    }
  }

  private addPrivateMessage(serverName: string, source: string, target: string, messageContent: string) {
    if (!this.serverData[serverName]) {
      log.warn("server does not exist");
      return
    }

    // create channel if it doesn't exist
    if (!this.serverData[serverName]!.privateMessages[target]) {
      this.serverData[serverName]!.privateMessages[target] = {
        name: target,
        messages: []
      }
    }

    const message: Message = {
      sender: source,
      content: messageContent,
      isSelf: source === this.currentUser?.username,
      id: this.serverData[serverName]?.privateMessages[target].messages.length!
    }

    this.serverData[serverName]?.privateMessages[target].messages.push(message);
  }

  /**
   * Registers all events from the {@link IRCClient} class for the newly created instance. Data transactions
   * occur as events have new data.
   * @param ircClient
   */
  private registerEvents(ircClient: IRCClient) {
    const serverName = ircClient.server.host
    // MOTD Messages...
    ircClient.onMOTD((source, destination, messsage) => {
      this.serverData[serverName]!.metadata.motd.push(messsage)
      this.pushMetadata(serverName)
    })

    ircClient.onLIST((source, destination, message) => {
      if (message[0] === 'End' || message[0] === 'Channel') {
        //do nothing i guess?
        return;
      }
      log.log("LIST---------")
      log.log("source: ", source)
      log.log("destination: ", destination)
      log.log("message: ", message)

      this.addChannelData(serverName, source, message[0], undefined);

      this.window!.webContents.send('sendChannels', [destination, this.serverData[serverName]!.naiveChannelList]);
    });

    ircClient.onPRIVMSG((source, destination, message) => {
        if (destination === this.currentUser?.username) {
          this.addPrivateMessage(serverName, source, source, message);
          this.pushMessages(serverName, source)
        }
        else {
          this.addChannelData(serverName, source, destination, message)
          this.pushMessages(serverName, destination)
        }
    })
  }
}
