//Interfaces for using data
export interface Server {
  serverName: string;
}

export interface ServerListProps {
  servers: ReadonlyArray<Server>;
  setServer: (server: Server) => void;
}

export interface User {
  userName: string;
}

export interface UserListProps {
  users: ReadonlyArray<User>;
}

export interface ChannelListProps {
  currentServer: string | undefined,
  channels: string[],
}

//Interfaces for ingesting data
export interface Root {
  ServerList: ServerList[]
}

export interface ServerList {
  server: string
  UserList: string[]
  ChannelList: string[]
}
