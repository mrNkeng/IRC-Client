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
    //console.log(user)
  }

  logout = () => {
    log.info("logging user out!");
    const servers = Object.keys(this.serverData)
    for (const server of servers) {
      const client = this.serverData[server].ircClient
      client.disconnect();
    }
    this.currentUser = undefined;
    this.serverData = {};
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
      pingInterval: 60 * 1000, // this is arbitrary (maybe there is a proper number)
    };

    const ircClient = new IRCClient(server, client, config);

    // init server
    this.initServer(ircClient);

    ircClient.connect();
    this.pushServerData();
    this.registerEvents(ircClient);
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
    this.pushChannelData(serverName, channelName);
    this.pushMessages(serverName, channelName);
    this.pushChannelUsers(serverName, "client add here maybe", channelName);
    log.debug("Requesting ServerData!")
  }

  sendMessageToChannel(serverName: string, channelName: string, message: string) {
    if (!this.serverData[serverName]) {
      log.error("Server doesn't exist"); return;
    } else if (!this.serverData[serverName].channels[channelName]) {
      log.error("Channel doesn't exist"); return;
    } else if (!this.serverData[serverName].channels[channelName].hasJoined) {
      log.error("Channel hasn't been joined"); return;
    }

    this.serverData[serverName]!.ircClient.sendPrivmsg(channelName, message);

    this.addChannelData(serverName, this.currentUser!.username, channelName, message);
    this.pushMessages(serverName, channelName);
  }

  createIRCChannel(serverName: string, channel: string) {
    const client = this.serverData[serverName].ircClient;
    client.joinCHANNEL(["#" + channel], [""])
  }

  refreshChannelList(serverName: string) {
    const client = this.serverData[serverName].ircClient;
    client.requestLIST([]);
  }

  joinChannel(serverName: string, channelName: string) {
    const client = this.serverData[serverName].ircClient;
    this.serverData[serverName].channels[channelName].hasJoined=true;
    this.pushChannelUsers(serverName, "", channelName)
    this.pushChannelData(serverName, channelName)
    client.joinCHANNEL([channelName], []);
  }

  leaveChannel(serverName: string, channelName: string) {
    const client = this.serverData[serverName].ircClient;
    this.serverData[serverName].channels[channelName].hasJoined=false;
    this.pushChannelUsers(serverName, "", channelName)
    this.pushChannelData(serverName, channelName)
    client.partCHANNEL([channelName]);
  }

  /**
   * Initalize the ice client's object inside of {@link serverData} and deal with all the database related code.
   * @param ircClient
   */
  private initServer(ircClient: IRCClient) {
    // TODO:  grab data from database if it exists.
    this.serverData[ircClient.server.host] = {
      name: ircClient.server.host,
      ircClient: ircClient,
      users: {},
      naiveChannelList: [],
      naiveUsers: [],
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
  private pushChannelData(serverName: string, client: string) {
    if (!this.serverData[serverName]) {
      return;
    }
    const channels: {name: string, connected: boolean}[] = []
    for (const [channelName, channel] of Object.entries(this.serverData[serverName].channels)) {
      channels.push({name: channelName, connected: channel.hasJoined});
  }
    this.window!.webContents.send('sendChannels', [serverName, channels]);
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

  private pushGlobalUsers() {

  }

  private pushChannelUsers(serverName: string, client: string, destinationChannel: string) {
    //will sometimes be called before channels have been created
    if (!this.serverData[serverName]!.channels[destinationChannel]) {
      return;
    }
    this.window!.webContents.send('sendChannelUserList', [destinationChannel, this.serverData[serverName]!.channels[destinationChannel].naiveUsers]);
  }

  private pushMessages(serverName: string, destination: string) {
    if (this.serverData[serverName].channels[destination]) {
      this.window!.webContents.send('sendMessageData', [serverName, destination, this.serverData[serverName].channels[destination].messages]);
    } else if(this.serverData[serverName].privateMessages[destination]) {
      this.window!.webContents.send('sendMessageData', [serverName, destination, this.serverData[serverName].privateMessages[destination].messages]);
    }
  }

  /*
    Aims to populate channel with messages, if no channel exists, it creates a barebones structure
  */
  private addChannelData(serverName: string, source: string, channelName: string, messageContent: string | undefined) {
    if (!this.serverData[serverName]) {
      log.warn("server does not exist");
      return
    }
    // create channel if it doesn't exist
    if (!this.serverData[serverName]!.channels[channelName]) {
      this.serverData[serverName]!.channels[channelName] = {
        hasJoined: false,
        naiveUsers: [],
        users: {},
        name: channelName,
        messages: []
      }
      this.serverData[serverName]!.naiveChannelList.push(channelName);
    }

    if (messageContent) {
      const message: Message = {
        sender: source.split("!")[0],
        content: messageContent,
        isSelf: source === this.currentUser?.username,
        id: this.serverData[serverName]?.channels[channelName].messages.length!
      }

      this.serverData[serverName]?.channels[channelName].messages.push(message);
    }
  }

  /*
    Aims to populate channel with users, if no channel exists, it creates a barebones structure
  */
  private addChannelNames(serverName: string, source: string, channelName: string, usernames: string[]) {
    if (!this.serverData[serverName]) {
      log.warn("server does not exist");
      return
    }
    // create channel if it doesn't exist
    if (!this.serverData[serverName]!.channels[channelName]) {
      this.serverData[serverName]!.channels[channelName] = {
        hasJoined: false,
        naiveUsers: usernames,
        users: {},
        name: channelName,
        messages: []
      }
      this.serverData[serverName]!.naiveChannelList.push(channelName);
    } else {
      this.serverData[serverName]!.channels[channelName].naiveUsers = usernames;
      //TODO write the proper way
      //this.serverData[serverName]!.channels[channelName].users = usernames;
    }
  }

  /*
    Aims to update if channel has been joined and the number of users, if no channel exists, it creates a barebones structure
    Also aims to tell us how many users exist, users can be [] which means this is just a join confirm
  */
  private addChannelJoined(serverName: string, source: string, channelName: string, usernames: string[]) {
    if (!this.serverData[serverName]) {
      log.warn("server does not exist");
      return
    }

    // create channel if it doesn't exist
    if (!this.serverData[serverName]!.channels[channelName]) {
      this.serverData[serverName]!.channels[channelName] = {
        hasJoined: true,
        naiveUsers: usernames,
        users: {}, //todo this guy
        name: channelName,
        messages: []
      }
      this.serverData[serverName]!.naiveChannelList.push(channelName);
    } else {
      this.serverData[serverName]!.channels[channelName].hasJoined = true;
      // if (usernames){
      //   this.serverData[serverName]!.channels[channelName].naiveUsers = usernames;
      // }
    }
    //console.log(this.serverData[serverName]!.channels[channelName]);
  }

  private addPrivateMessage(serverName: string, source: string, target: string, messageContent: string) {
    if (!this.serverData[serverName]) {
      log.warn("server does not exist");
      return
    }

    // create channel if it doesn't exist
    if (!this.serverData[serverName]!.privateMessages[target]) {
      this.serverData[serverName]!.privateMessages[target] = {
        hasJoined: false,
        naiveUsers: [],
        users: {},
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
    ircClient.onMOTD((source, client, messsage) => {
      this.serverData[serverName]!.metadata.motd.push(messsage)
      this.pushMetadata(serverName)
    });

    ircClient.onAUTHENTICATE((source, client) => {
      ircClient.requestLIST([]);
      ircClient.joinCHANNEL(["#test"], []);
      ircClient.joinCHANNEL(["#general"], []);
    });

    ircClient.onLIST((source, client, message) => {
      if (message[0] === 'End' || message[0] === 'Channel') {
        //do nothing i guess?
        return;
      }
      this.addChannelData(serverName, source, message[0], undefined);
      this.pushChannelData(serverName, client);
    });

    ircClient.onJOIN((source, channel, usersInChannel) => {
      if (usersInChannel) {
        this.addChannelJoined(serverName, source, channel, usersInChannel);
        this.pushChannelData(serverName, "")
      } else {
        //broadcast to channel that a user has joined and update user list
        //this.addChannelData();
      }
    });

    ircClient.onPRIVMSG((source, destination, message) => {
      if (destination === this.currentUser?.username) {
        this.addPrivateMessage(serverName, source, destination, message);
        this.pushMessages(serverName, source)
      }
      else {
        this.addChannelData(serverName, source, destination, message)
        this.pushMessages(serverName, destination)
      }
    });

    ircClient.onNAMES((source, client, destinationChannel, message) => {
      if (message[0] === 'End' || message[0] === 'Channel') {
        //do nothing i guess?
        return;
      }
      this.addChannelNames(serverName, source, destinationChannel, message.slice(1));
      this.pushChannelUsers(serverName, client, destinationChannel);
    });
  }
}
