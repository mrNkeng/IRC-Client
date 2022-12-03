import { User } from "@prisma/client";
import { prisma } from "./db";
import { IRCClient } from "./irc/irc";
import { ServerInformaiton } from "./irc/protocol";
import { hashPassword } from "./util";
import log from 'electron-log';
import { Root } from "data-models";

 type serverAddress = string;
export class AOLMessenger {

  private currentUser: User | undefined
  public window: Electron.CrossProcessExports.BrowserWindow | null


  private clients: Map<serverAddress, IRCClient> = new Map<serverAddress, IRCClient>();
  private serverData: Root = {}

  constructor(window: Electron.CrossProcessExports.BrowserWindow | null) {
    this.window = window
  }

  async signUp(name: string, username: string, password: string) {
    const [hashedPassword, salt] = hashPassword(password);

    const data = {
      username: username,
      name: name,
      hashedPassword: hashedPassword,
      salt: salt,
    }

    const user = await prisma.user.create({data})
    this.window!.webContents.send('authSuccess', [user.username, user.name]);
    console.log(user);
  }

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
    this.clients.set(server.host, ircClient);

    // init server
    this.initServer(ircClient);

    ircClient.connect();
    this.registerEvents(ircClient);
  }

  sendServerData(serverName: string) {
    const metadata = this.serverData[serverName].metadata
    if (!metadata) {
      log.warn("can't send data that doesn't exist");
      return
    }
    this.window!.webContents.send('serverMetadata', [serverName, metadata]);

  }

  private initServer(ircClient: IRCClient) {
    // TODO:  grab data from database if it exists.
    this.serverData[ircClient.server.host] = {
      name: ircClient.server.host,
      users: {},
      channels: {},
      metadata: {
        motd: [],
        notices: []
      },
    }
  }

  private pustMetadata(ircClient: IRCClient) {
    this.window!.webContents.send('serverMetadata', [ircClient.server.host, this.serverData[ircClient.server.host].metadata])
  }


  private registerEvents(ircClient: IRCClient) {
    ircClient.onMOTDMessage((client, messsage) => {
      this.serverData[ircClient.server.host].metadata.motd.push(messsage)
      this.pustMetadata(ircClient)
    })

    ircClient.onServerMessage((client, message) => {
      const serverName = ircClient.server.host
      this.window!.webContents.send('serverMessage', [message, serverName]);
    })
  }
}

class ClientState {
  public data: Root

  constructor() {
    this.data = {}
  }
}
