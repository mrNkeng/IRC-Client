export interface Server {
  name: string;
}

export interface Channel {
  name: string;
  messages: Array<Message>
}

export interface Message {
  sender: string
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
  [key: string]: ServerData
}

export interface ServerData {
  name: string
  metadata: ServerMetadata
  naiveChannelList: Array<string>
  naiveUserList: Array<string>
  users: {[key: string]: IRCUser}
  channels: {[key: string]: Channel}
  privateMessages: {[key: string]: Channel}
}
export interface ServerMetadata {
  notices: Array<string>
  connectedUsers?: number
  createdOn?: Date
  motd: Array<string>
  version?: string
}

