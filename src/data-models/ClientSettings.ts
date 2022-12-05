import { User } from "./User"

export interface ClientSettings {
  notificationVolume: number
  theme: string
  blockedUsers: Array<User>
}


export const defaultClientSettings: ClientSettings = {
    notificationVolume: 50,
    theme: "dark",
    blockedUsers: [],
}
