//Interfaces for using data
//default strings
export interface Server {
  name: string;
}

export interface User {
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

//Interfaces for ingesting data
//based on mockdata.json
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

