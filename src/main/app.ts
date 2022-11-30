import { User } from "@prisma/client";
import { ipcMain } from "electron";
import { prisma } from "./db";
import { hashPassword } from "./util";



export class AOLMessenger {

  private currentUser: User | undefined
  public window: Electron.CrossProcessExports.BrowserWindow | null

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
}
