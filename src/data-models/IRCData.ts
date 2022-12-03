export interface Server {
  name: string;
}

export interface Channel {
  name: string;

}

export interface Message {
  id: number
  isSelf?: boolean
  content: string;
}

export interface IRCUser {
  nick: string,
  username: string,
  fullName: string,
}

export interface Root {
  [key: string]: ServerData | undefined
}

export interface ServerData {
  name: string
  metadata: ServerMetadata
  users: {[key: string]: IRCUser}
  channels: {[key: string]: Channel}
}
export interface ServerMetadata {
  notices: Array<string>
  connectedUsers?: number
  createdOn?: Date
  motd: Array<string>
  version?: string
}

