import { User } from "@prisma/client";
import { prisma } from "./db";
import { IRCClient } from "./irc/irc";
import { ServerInformaiton } from "./irc/protocol";
import { hashPassword } from "./util";
import log from 'electron-log';
import { Root } from "data-models";

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
    this.registerEvents(ircClient);
  }

  /**
   * Pushes all data assocaited with the server name to the frontend.
   * @param serverName
   */
  sendServerData(serverName: string) {
    // name has contender as refresh()

    // push each set of data
    this.pushMetadata(serverName);
    this.pushServerData();
    this.pushChannelData(serverName);
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
  private pushChannelData(serverName: string) {
    // TODO: push data that has to do with servers from here
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
  }



  /**
   * Registers all events from the {@link IRCClient} class for the newly created instance. Data transactions
   * occur as events have new data.
   * @param ircClient
   */
  private registerEvents(ircClient: IRCClient) {
    // MOTD Messages...
    ircClient.onMOTDMessage((client, messsage) => {
      this.serverData[ircClient.server.host]!.metadata.motd.push(messsage)
      this.pushMetadata(ircClient.server.host)
    })

    ircClient.onServerMessage((client, message) => {
      const serverName = ircClient.server.host
      this.window!.webContents.send('serverMessage', [message, serverName]);
    })
  }
}
