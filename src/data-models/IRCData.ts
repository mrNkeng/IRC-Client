import { IRCClient } from "main/irc/irc";

export interface Server {
  name: string;
}

export interface Channel {
  hasJoined: boolean;
  naiveUsers: Array<string>;
  users: {[key: string]: IRCUser}
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
  ircClient: IRCClient
  name: string
  metadata: ServerMetadata
  naiveChannelList: Array<string>
  naiveUsers: Array<string>;
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

