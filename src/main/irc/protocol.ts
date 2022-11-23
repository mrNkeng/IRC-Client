export const REGULAR_CHANNEL_PREFIX = '#'
export const LOCAL_CHANNEL_PREFIX = '&'

export const RESTRICTED_CHARACTERS = [' ', ',', '*', '?', '!', '@', '.'];
export const RESTRICTED_START_CHARACTERS = ['$', ':', REGULAR_CHANNEL_PREFIX, LOCAL_CHANNEL_PREFIX];


export interface ServerInformaiton {
  host: string
  port: number
}

export interface ClientInformation {
  realName: string
  username: string
  nickname: string
}

export interface IRCClientConfiguration {
  pingInterval: number
}

export interface IRCServerCapabilities {
  channelLimit: number
}

// TODO: come up with a better name for this...
export const IRCReplies = {
  welcome: {
    id: "001",
  },
  yourHost: {
    id: "002",
  },
  created: {
    id: "003",
  },
  myInfo: {
    id: "004",
  },
  iSupport: {
    id: "005",
  },
  bounce: {
    id: "010",
  },
  uModeIs: {
    id: "221",
  },
  lUserClient: {
    id: "251",
  },
  lUserUnknown: {
    id: "253",
  },
  lUserChannels: {
    id: "254",
  },
  lUserMe: {
    id: "255",
  },
  localUsers: {
    id: "265",
  },
  globalUsers: {
    id: "266",
  },
  motd: {
    id: "372",
  },
  motdStart: {
    id: "375",
  },
  endOfMotd: {
    id: "376",
  },
  notRegistered: {
    id: "451",
  }
}
