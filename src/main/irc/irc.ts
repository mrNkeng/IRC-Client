// import { IRC_Replies } from "data-models/IRC";
import net from "net";
import { EventEmitter } from 'typed-event-emitter';
import { buffer } from "stream/consumers";
import { ClientInformation, createBlankIRCMessage, IRCClientConfiguration, IRCMessage, IRCReplies, ServerInformaiton, tokenizeServerMessage, IRCNumerics } from "./protocol";
import log from "electron-log";


export class IRCClient extends EventEmitter  {
  // TODO: this could all be logged under a single configuraiton object. Yes we do this
  public server: ServerInformaiton;
  private client: ClientInformation;
  private config: IRCClientConfiguration;

  connected: boolean;
  authenticated: boolean;

  private serverMessage: string;
  private pingSendTime: number | undefined;

  private ircSocket: net.Socket | undefined;

  public readonly onPing = this.registerEvent<[number]>();
  public readonly onServerMessage = this.registerEvent<[string, string]>()
  public readonly onMOTDMessage = this.registerEvent<[client: string, message: string]>();
  public readonly onConnectionLoss = this.registerEvent();

  constructor(server: ServerInformaiton, client: ClientInformation, config: IRCClientConfiguration) {
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
  }

  // This feels kind of improper ~ come back this this. Maybe we should
  // subclass the socket? and then propagate messages upward? - JV
  private onData = (data: Buffer) => {
    for(const c of data) {
      const char = String.fromCharCode(c);
      // once we scan a new line char we know that we can try and parse the command
      if(char === "\n") {
        this.parseServerMessage();
      }
      else {
        this.serverMessage += char;
      }
    }
  }

  private onConnect = () => {
    this.connected = true;
    this.authenticateToIRCServer();
  }

  /**
   * Emitted when the server closes. If connections exist, this event is not emitted until all connections are ended.
   */
  private onClose = () => {
    this.connected = false;
  }

  private onError = () => {
    // TODO: handle errors
  }

  private onEnd = () => {
    // TODO: handle end
  }

  private onTimeout = () => {
    // TODO: handle timeout
  }

  private setConnected = (connection: boolean) => {

  }

  private setAuthenticated = (authenticated: boolean) => {
    this.authenticated = authenticated
    // this.emit("")
  }

  // https://modern.ircdocs.horse/#connection-registration
  private authenticateToIRCServer = () => {
    this.authenticated = false;

    // this.sendCommand(`CAP LS 302`);

    // set these commands on a timeout just in case the server doesn't like messages right at the start
    // I read about this for a bit...
    setTimeout(() => this.sendCommand(`NICK ${this.client.nickname}`), 1*1000);
    setTimeout(() => this.sendCommand(`USER ${this.client.username} 0 * :${this.client.realName}`), 2*1000)

    // we can only run after we've connected and authenticated
    // setTimeout(() => this.sendCommand('JOIN #test'), 10000)

    // start ping stuff
    this.pinger()
  }

  private pinger = () => {
    // FIXME: do we need a unique message here? Please fix it
    // FIXME: please change this to an interval thing and then clear this on connection termination
    this.sendCommand("PING :msg");
    this.pingSendTime = Date.now();
    setTimeout(this.pinger, this.config.pingInterval);
  }

  /**
   * stands in as an example of how we'll propagate information out of the irc library.
   */
  private pong = () => {
    const pingMilliseconds = Date.now() - (this.pingSendTime ?? Date.now()) // catch for first ping value...
    this.emit(this.onPing, pingMilliseconds)
  }

  private ping = (token: string) => {
    this.sendCommand(`PONG :${token}`)
  }

  private handleError = (message: IRCMessage) => {

  }

  private motd = (ircMessage: IRCMessage) => {
    const client =  ircMessage.parameters[0]
    const message = ircMessage.parameters.slice(1).join(" ")
    this.emit(this.onMOTDMessage, client, message)
  }

  private parseServerMessage = () => {
    let serverMessage = this.serverMessage;
    this.serverMessage = "";
    console.debug("Server: ", serverMessage);

    // parsing
    // TODO: properly tokenize the message instead of naive split
    // For above use this: https://modern.ircdocs.horse/#client-to-server-protocol-structure
    const ircMessage = tokenizeServerMessage(serverMessage)
    // console.log("command: ", ircMessage.command)
    console.log(ircMessage);
    switch (ircMessage.command) {
      case "PING":
        this.ping(ircMessage.parameters[0])
        break;
      case "PONG":
        this.pong();
        break;
      case "NOTICE":
        break;
      case "ERROR":
        this.handleError(ircMessage)
        break;
      case IRCNumerics.welcome:
        console.debug("~~~DEBUG~~~: processing Welcome");
        break;
      case IRCNumerics.yourHost:
        console.debug("~~~DEBUG~~~: processing YourHost");
        break;
      case IRCNumerics.created:
        console.debug("~~~DEBUG~~~: processing created");
        break;
      case IRCNumerics.myInfo:
        console.debug("~~~DEBUG~~~: processing myInfo");
        this.authenticated = true
        break;
      case IRCNumerics.iSupport:
        console.debug("~~~DEBUG~~~: processing iSupport");
        // const result = IRCReplies.iSupport.parseFunction(serverMessage);
        // do something with the result...
        break;
      case IRCNumerics.bounce:
        //console.debug(Something here maybe?);
        break;
      case IRCNumerics.uModeIs:
        //console.debug(Something here maybe?);
        break;
      case IRCNumerics.lUserClient:
        //console.debug(Something here maybe?);
        break;
      case IRCNumerics.lUserUnknown:
        //console.debug(Something here maybe?);
        break;
      case IRCNumerics.lUserChannels:
        //console.debug(Something here maybe?);
        break;
      case IRCNumerics.lUserMe:
        //console.debug(Something here maybe?);
        break;
      case IRCNumerics.localUsers:
        //console.debug(Something here maybe?);
        break;
      case IRCNumerics.globalUsers:
        //console.debug(Something here maybe?);
        break;
      case IRCNumerics.motd:
        this.motd(ircMessage);
        //console.debug(Something here maybe?);
        break;
      case IRCNumerics.motdStart:
        this.motd(ircMessage);
        break;
      case IRCNumerics.endOfMotd:
        this.motd(ircMessage);
        break;
      case IRCNumerics.notRegistered:
        //console.debug(Something here maybe?);
        break;
      default:
        console.warn("Unsupported message type: ", ircMessage.command);
        break;
    }
  }

  private sendCommand = (command: string) => {
    console.debug("Client: ", command);
    this.ircSocket?.write(command + "\r\n");
  }
}
