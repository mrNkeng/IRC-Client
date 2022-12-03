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

export interface IRCMessage {
  tags: IRCMessageTags;
  source: string | undefined
  command: string | undefined
  parameters: string[]
  time: Date
}

export type IRCMessageTags = {[key: string]: string | number}

export const createBlankIRCMessage = () => {
  const message: IRCMessage = {
    tags: {},
    source: undefined,
    command: undefined,
    parameters: [],
    time: new Date()
  }
  return message;
}

export const tokenizeServerMessage = (message: string): IRCMessage => {
  const ircMessage: IRCMessage = createBlankIRCMessage();
  const tokens = message.split(" ");
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    // parse tags
    if (token[0] == "@") {
      ircMessage.tags = tokenizeTags(token)
    }
    // parse source
    else if (token[0] === ":" && ((Object.keys(ircMessage.tags).length
    === 0 && i === 0) || (ircMessage.tags.length > 0 && i === 1))) {
      ircMessage.source = token.slice(1)
    }

    // We can now parse the command and params
    else {
      ircMessage.command = token
      const parameters = tokens.slice(i + 1)
      ircMessage.parameters = cleanParameters(parameters)
      break
    }
  }
  return ircMessage
}

export const tokenizeTags = (input: string):IRCMessageTags => {
  const cleanedInput = input.slice(1)
  const tags: IRCMessageTags = {}
  const tokens = cleanedInput.split(";")
  for (const token of tokens) {
    const [key, value] = token.split('=');
    tags[key] = value ?? ''
  }
  return tags;
}

export const cleanParameters = (params: string[]): string[] => {
  const cleaned: string[] = [];
  for (let param of params) {
    if (param[0] === ":") {
      param = param.slice(1)
    }
    cleaned.push(param)
  }
  return cleaned
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
