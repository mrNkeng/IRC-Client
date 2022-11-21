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
    parseFunction: (message: string) => {
      // TODO: parse message and return a json representation of
      // important information in the message
    }
  }

}
