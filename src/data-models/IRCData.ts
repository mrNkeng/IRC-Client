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

export interface Root {
  ServerList: ServerData[]
}

export interface ServerData {
  serverName: string
  serverMessages: Message[]
  userList: string[]
  channelList: ChannelData[]
}

export interface ChannelData {
  channelName: string
  messages: string[]
}

