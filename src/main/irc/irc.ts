// import { IRC_Replies } from "data-models/IRC";
import net from 'net';
import { EventEmitter } from 'typed-event-emitter';
import {
  ClientInformation,
  IRCClientConfiguration,
  IRCMessage,
  ServerInformaiton,
  tokenizeServerMessage,
} from './protocol';
import { IRCNumerics } from './IRCNumerics';
import log from 'electron-log';

export class IRCClient extends EventEmitter {
  // TODO: this could all be logged under a single configuraiton object. Yes we do this
  public server: ServerInformaiton;
  private client: ClientInformation;
  private config: IRCClientConfiguration;

  connected: boolean;
  authenticated: boolean;

  private serverMessage: string;
  private pingSendTime: number | undefined;
  private numberOfServerTimeouts: number = 0;
  private ircSocket: net.Socket | undefined;

  public readonly onPing = this.registerEvent<[number]>();
  public readonly onJOIN = this.registerEvent<[source: string, channel: string, usersInChannel: string[] | undefined]>();
  public readonly onPRIVMSG = this.registerEvent<[source: string, destination: string, message: string]>();
  public readonly onLIST = this.registerEvent<[source: string, destination: string, message: string[]]>();
  public readonly onNAMES = this.registerEvent<[source: string, destination: string, destinationChannel: string, message: string[]]>();
  public readonly onTOPIC = this.registerEvent<[source: string, destination: string, destinationChannel: string, message: string]>();
  public readonly onMOTD = this.registerEvent<[source: string, destination: string, message: string]>();
  public readonly onNOTICE = this.registerEvent<[source: string, destination: string, message: string]>();
  public readonly onERROR = this.registerEvent<[source: string, destination: string, message: string]>();


  //TODO emitters
  public readonly onErrorMessage = this.registerEvent<[]>(); //TODO send things when server sends error
  public readonly onConnectionLoss = this.registerEvent<[]>(); //TODO send things when server stops responding

  constructor(
    server: ServerInformaiton,
    client: ClientInformation,
    config: IRCClientConfiguration
  ) {
    super();
    this.server = server;
    this.client = client;
    this.config = config;

    this.serverMessage = '';
    this.connected = false;
    this.authenticated = false;
  }

  connect = () => {
    this.ircSocket = net.createConnection(this.server.port, this.server.host);

    this.ircSocket.on('data', this.onData);
    this.ircSocket.on('connect', this.onConnect);
    this.ircSocket.on('close', this.onClose);
    this.ircSocket.on('error', this.onError);
    this.ircSocket.on('end', this.onEnd);
    this.ircSocket.on('timeout', this.onTimeout);
  };

  // This feels kind of improper ~ come back this this. Maybe we should
  // subclass the socket? and then propagate messages upward? - JV
  private onData = (data: Buffer) => {
    for (const c of data) {
      const char = String.fromCharCode(c);
      // once we scan a new line char we know that we can try and parse the command
      if (char === '\n') {
        this.parseServerMessage();
      } else {
        this.serverMessage += char;
      }
    }
  };

  private onConnect = () => {
    this.connected = true;
    this.authenticateToIRCServer();
  };

  /**
   * Emitted when the server closes. If connections exist, this event is not emitted until all connections are ended.
   */
  private onClose = () => {
    // TODO: handle close
    this.connected = false;
  };

  private onError = () => {
    // TODO: handle errors
    this.connected = false;
    this.emit(this.onErrorMessage);
  };

  /**
   * When the server begins shutdown
   */
  private onEnd = () => {
    // TODO: handle end
  };

  /**
   * Occurs during timeout
   */
  private onTimeout = () => {
    //try 3 times to reconnect
    this.numberOfServerTimeouts++;
    if (this.numberOfServerTimeouts < 3)
    {
      this.connect();
    }

    this.connected = false;
    this.emit(this.onConnectionLoss);
    return;
  };

  private setConnected = (connection: boolean) => {
    // TODO: Not sure what this function is
  };

  private setAuthenticated = (authenticated: boolean) => {
    this.authenticated = authenticated;
    // this.emit("")
  };

  // https://modern.ircdocs.horse/#connection-registration
  private authenticateToIRCServer = () => {
    this.authenticated = false;

    // this.sendCommand(`CAP LS 302`);

    // set these commands on a timeout just in case the server doesn't like messages right at the start
    // I read about this for a bit...
    setTimeout(
      () => this.sendCommand(`NICK ${this.client.nickname}`),
      1 * 1000
    );
    setTimeout(
      () =>
        this.sendCommand(
          `USER ${this.client.username} 0 * :${this.client.realName}`
        ),
      2 * 1000
    );

    // start ping stuff
    this.pinger();
  };

  private pinger = () => {
    // FIXME: Added a somewhat descriptive PING message
    // FIXME: please change this to an interval thing and then clear this on connection termination
    this.sendCommand('PING :Checking Connection');
    this.pingSendTime = Date.now();
    setTimeout(this.pinger, this.config.pingInterval);
  };

  /**
   * stands in as an example of how we'll propagate information out of the irc library.
   */
  private pong = () => {
    const pingMilliseconds = Date.now() - (this.pingSendTime ?? Date.now()); // catch for first ping value...
    this.emit(this.onPing, pingMilliseconds);
  };

  private ping = (token: string) => {
    this.sendCommand(`PONG :${token}`);
  };

  //##########################################
  // Receive fucntions
  private receiveJOIN = (ircMessage: IRCMessage) => {
    const source: string = ircMessage.source!;
    const destination: string = ircMessage.parameters[0];
    let usersInChannel: string[] | undefined = undefined;

    if (ircMessage.parameters.length > 1) {
      usersInChannel = ircMessage.parameters.slice(2);
    }

    this.emit(this.onJOIN, source, destination, usersInChannel)
  }

  private receivePRIVMSG = (ircMessage: IRCMessage) => {
    // TODO: implement chanops and half ops (@ and %)
    // TODO: don't do this here, but I'm saving my work for later
    const regex_symbols = new RegExp('@%#.+|%#.+|#.+');

    const source: string = ircMessage.source!;
    const destination: string = ircMessage.parameters[0];
    const message: string = ircMessage.parameters.slice(1).join(" ");

    this.emit(this.onPRIVMSG, source, destination, message);
  }

  private receiveLIST = (ircMessage: IRCMessage) => {
    const source: string = ircMessage.source!;
    const destination: string = ircMessage.parameters[0];
    const message: string[] = ircMessage.parameters.slice(1);

    this.emit(this.onLIST, source, destination, message);
  }

  private receiveNAMES = (ircMessage: IRCMessage) => {
    const source: string = ircMessage.source!;
    const destination: string = ircMessage.parameters[0];
    const destinationChannel: string = ircMessage.parameters[2];
    const message: string[] = ircMessage.parameters.slice(2);

    this.emit(this.onNAMES, source, destination, destinationChannel, message);
  }

  private receiveTOPIC = (ircMessage: IRCMessage) => {
    const source: string = ircMessage.source!;
    const destination: string = ircMessage.parameters[0];
    const destinationChannel: string = ircMessage.parameters[1];
    const message: string = ircMessage.parameters.slice(2).join(" ");

    this.emit(this.onTOPIC, source, destination, destinationChannel, message);
  }

  private receiveMOTD = (ircMessage: IRCMessage) => {
    const source: string = ircMessage.source!;
    const destination = ircMessage.parameters[0];
    const message = ircMessage.parameters.slice(1).join(' ');

    this.emit(this.onMOTD, source, destination, message);
  };

  private receiveNOTICE = (ircMessage: IRCMessage) => {
    //servers send this before they know your NICK
    //client isn't very useful here
    const source: string = ircMessage.source!;
    const destination = ircMessage.parameters[0];
    const message = ircMessage.parameters.slice(1).join(' ');

    this.emit(this.onNOTICE, source, destination, message);
  };

  private receiveERROR = (ircMessage: IRCMessage) => {
    const source: string = ircMessage.source!;
    const destination = ircMessage.parameters[0];
    const message = ircMessage.parameters.slice(1).join(' ');

    this.emit(this.onERROR, source, destination, message);
  };

  private parseServerMessage = () => {
    let serverMessage = this.serverMessage;
    this.serverMessage = '';
    log.debug('Server: ', serverMessage);

    // TODO: properly tokenize the message instead of naive split
    // For above use this: https://modern.ircdocs.horse/#client-to-server-protocol-structure
    const ircMessage = tokenizeServerMessage(serverMessage);

    log.log(ircMessage);
    switch (ircMessage.command) {
      case "PRIVMSG":
        this.receivePRIVMSG(ircMessage);
        break;
      case "JOIN":
        this.receiveJOIN(ircMessage);
        break;
      case 'PING':
        this.ping(ircMessage.parameters[0]);
        break;
      case 'PONG':
        this.pong();
        break;
      case 'NOTICE':
        this.receiveNOTICE(ircMessage);
        break;
      case 'ERROR':
        this.receiveERROR(ircMessage);
        break;
      case IRCNumerics.welcome:
        break;
      case IRCNumerics.yourHost:
        break;
      case IRCNumerics.created:
        break;
      case IRCNumerics.myInfo:
        this.authenticated = true;
        break;
      case IRCNumerics.iSupport:
        break;
      case IRCNumerics.bounce:
        break;
      case IRCNumerics.uModeIs:
        break;
      case IRCNumerics.lUserClient:
        break;
      case IRCNumerics.lUserUnknown:
        break;
      case IRCNumerics.lUserChannels:
        break;
      case IRCNumerics.lUserMe:
        break;
      case IRCNumerics.localUsers:
        break;
      case IRCNumerics.globalUsers:
        break;
      case IRCNumerics.motd:
        this.receiveMOTD(ircMessage);
        break;
      case IRCNumerics.motdStart:
        this.receiveMOTD(ircMessage);
        break;
      case IRCNumerics.endOfMotd:
        this.receiveMOTD(ircMessage);
        break;
      case IRCNumerics.listStart:
        this.receiveLIST(ircMessage);
        break;
      case IRCNumerics.list:
        this.receiveLIST(ircMessage);
        break;
      case IRCNumerics.listEnd:
        this.receiveLIST(ircMessage);
        break;
      case IRCNumerics.namesReply:
        this.receiveNAMES(ircMessage);
        break;
      case IRCNumerics.endOfNames:
        this.receiveNAMES(ircMessage);
        break;
      case IRCNumerics.needMorePerms:
        this.receiveTOPIC(ircMessage);
        break;
      case IRCNumerics.noSuchChannel:
        this.receiveTOPIC(ircMessage);
        break;
      case IRCNumerics.notOnChannel:
        this.receiveTOPIC(ircMessage);
        break;
      case IRCNumerics.chanoPrivsNeeded:
        this.receiveTOPIC(ircMessage);
        break;
      case IRCNumerics.noTopic:
        this.receiveTOPIC(ircMessage);
        break;
      case IRCNumerics.topic:
        this.receiveTOPIC(ircMessage);
        break;
      case IRCNumerics.topicWhoTime:
        this.receiveTOPIC(ircMessage);
        break;
      default:
        log.warn('Unsupported message type: ', ircMessage.command);
        break;
    }
  };

  //##########################################
  // Send functions
  private sendCommand = (command: string) => {
    // if (!this.authenticated || !this.connect) {
    //   throw new Error("Cannot send commands when the server doesn't exist");
    // }

    log.debug('Client: ', command);
    this.ircSocket?.write(command + '\r\n');
  };

  //https://modern.ircdocs.horse/#privmsg-message:~:text=Sending%20Messages-,PRIVMSG%20message,-Command%3A%20PRIVMSG%0A%20%20Parameters
  public sendPrivmsg = (target: string, message: string) => {
    //channel processing perhaps?
    const outgoing = 'PRIVMSG ' + target + ' :' + message;
    this.sendCommand(outgoing);
  }

  //add support for other types of commands
  //https://modern.ircdocs.horse/#list-message:~:text=in%2Dnames%20Extension-,LIST%20message,-Command%3A%20LIST%0A%20%20Parameters
  public requestLIST = (channelList: string[]) => {
    const formattedChannels = channelList.join(',');
    const outgoing = 'LIST ' + formattedChannels;
    this.sendCommand(outgoing);
  }

  //https://modern.ircdocs.horse/#topic-message:~:text=topic%20for%20%22%23test%22-,NAMES%20message,-Command%3A%20NAMES%0A%20%20Parameters
  public requestNAMES = (namesList: string[]) => {
    const formattedNames = namesList.join(',');
    const outgoing = 'NAMES ' + formattedNames;
    this.sendCommand(outgoing);
  }

  //https://modern.ircdocs.horse/#topic-message:~:text=the%20channel%20%23test-,TOPIC%20message,-Command%3A%20TOPIC%0A%20%20Parameters
  public requestTOPIC = (channelList: string[]) => {
    //TODO add set and other abilities
    const formattedChannels = channelList.join(',');
    const outgoing = 'TOPIC ' + formattedChannels;
    this.sendCommand(outgoing);
  }

  //https://modern.ircdocs.horse/#list-message:~:text=the%20entire%20network.-,JOIN%20message,-Command%3A%20JOIN%0A%20%20Parameters
  public joinCHANNEL = (channelList: string[], channelKeyList: string[]) => {
    const formattedChannels = channelList.join(',');
    const formattedKeys = channelKeyList.join(',');
    const outgoing = 'JOIN ' + formattedChannels + ' ' + formattedKeys;
    this.sendCommand(outgoing);
  }

  //https://modern.ircdocs.horse/#list-message:~:text=extended%2Djoin%20Extension-,PART%20message,-Command%3A%20PART%0A%20%20Parameters
  public partCHANNEL = (channelList: string[]) => {
    const formattedChannels = channelList.join(',');
    const outgoing = 'PART ' + formattedChannels + ' :byebye';
    this.sendCommand(outgoing);
  }

  public terminateConnection = () => {
    this.sendCommand('QUIT :byebye');
  }
}
