export const REGULAR_CHANNEL_PREFIX = '#';
export const LOCAL_CHANNEL_PREFIX = '&';
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
  // FIXME: Unnessesary for loop...
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

export const IRCNumerics = {
  welcome: "001",
  yourHost: "002",
  created: "003",
  myInfo: "004",
  iSupport: "005",
  bounce: "010",
  uModeIs: "221",
  lUserClient: "251",
  lUserUnknown: "253",
  lUserChannels: "254",
  lUserMe: "255",
  localUsers: "265",
  globalUsers: "266",
  none: "300",
  away: "301",
  userhost: "302",
  unaway: "305",
  nowaway: "306",
  whoRegNick: "307",
  whoIsUser: "311",
  whoIsServer: "312",
  whoIsOperator: "313",
  whoWasUser: "314",
  whoIsIdle: "317",
  endOfWhoIs: "318",
  whoIsChannels: "319",
  whoIsSpecial: "320",
  listStart: "321",
  list: "322",
  listEnd: "323",
  endOfWho: "315",
  whoReply: "352",
  namReply: "353",
  endOfNames: "366",
  motd: "372",
  motdStart: "375",
  endOfMotd: "376",
  noSuchNick: "401",
  noSuchServer: "402",
  cannotSendToChan: "404",
  tooManyTargets: "407",
  noRecipient: "411",
  notExtToSend: "412",
  noTopLevel: "413",
  wildTopLevel: "414",
  notRegistered: "451",
}
