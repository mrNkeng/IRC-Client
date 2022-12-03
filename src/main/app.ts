import { User } from "@prisma/client";
import { Server } from "data-models/interfaces";
import { ipcMain } from "electron";
import { prisma } from "./db";
import { IRCClient } from "./irc/irc";
import { ServerInformaiton } from "./irc/protocol";
import { hashPassword } from "./util";
import log from 'electron-log';

 type serverAddress = string;
export class AOLMessenger {

  private currentUser: User | undefined
  public window: Electron.CrossProcessExports.BrowserWindow | null


  private clients: Map<serverAddress, IRCClient> = new Map<serverAddress, IRCClient>();

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

    ircClient.connect()
    this.registerEvents(ircClient)
  }


  private registerEvents(ircClient: IRCClient) {
    ircClient.onServerMessage((client, message) => {
      const serverName = ircClient.server.host
      this.window!.webContents.send('serverMessage', [message, serverName]);
    })
  }
}
