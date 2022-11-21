//Interfaces for using data
//default strings
export interface Server {
  serverName: string;
}

export interface User {
  userName: string;
}

export interface Channel {
  channelName: string;
}

export interface Message {
  message: string;
}

//props
export interface ServerListProps {
  servers: ReadonlyArray<Server>;
  setServer: (server: Server) => void;
}

export interface UserListProps {
  users: ReadonlyArray<User>;
}

export interface ChannelListProps {
  currentServer: string | undefined;
  channels: ReadonlyArray<Channel>;
  setChannel: (channel: Channel) => void;
}

export interface WindowProps {
  currentChannel: string | undefined;
  messages: ReadonlyArray<Message>;
}

//-----------------------------
//Interfaces for ingesting data
//based on mockdata.json
export interface Root {
  ServerList: ServerList[]
}

export interface ServerList {
  serverName: string
  userList: string[]
  channelList: ChannelList[]
}

export interface ChannelList {
  channelName: string
  messages: string[]
}

