// import { IRC_Replies } from "data-models/IRC";
import net from "net";
import EventEmitter from "events";
import { buffer } from "stream/consumers";
import { ClientInformation, createBlankIRCMessage, IRCClientConfiguration, IRCMessage, IRCReplies, ServerInformaiton, tokenizeServerMessage } from "./protocol";


// TODO: Create hooks that other objects need to  be aware of:
//       Some ides: onConfigurationChange, onMessage, onServerStatusChange?


// TODO: https://basarat.gitbook.io/typescript/main-1/typed-event -- john valanidas
export class IRCClient extends EventEmitter {
  // TODO: this could all be logged under a single configuraiton object. Yes we do this
  private server: ServerInformaiton;
  private client: ClientInformation;
  private config: IRCClientConfiguration;

  connected: boolean;
  authenticated: boolean;

  private serverMessage: string;
  private pingSendTime: number | undefined;

  private ircSocket: net.Socket | undefined;

  constructor(server: ServerInformaiton, client: ClientInformation, config: IRCClientConfiguration) {
    super();

    this.server = server
    this.client = client
    this.config = config

    this.serverMessage = '';
    this.connected = false;
    this.authenticated = false;
  }

  connect = () => {
    this.ircSocket = net.createConnection(this.server.port, this.server.host);

    this.ircSocket.on('data', this.onData)
    this.ircSocket.on('connect', this.onConnect)
    this.ircSocket.on('close', this.onClose)
    this.ircSocket.on('error', this.onError)
    this.ircSocket.on('end', this.onEnd)
    this.ircSocket.on('timeout', this.onTimeout)
  }

  // This feels kind of improper ~ come back this this. Maybe we should
  // subclass the socket? and then propagate messages upward? - JV
  private onData = (data: Buffer) => {
    for(const c of data) {
      const char = String.fromCharCode(c)
      // once we scan a new line char we know that we can try and parse the command
      if(char === "\n") {
        this.parseServerMessage();
      }
      else {
        this.serverMessage += char
      }
    }
  }

  private onConnect = () => {
    this.connected = true;
    this.authenticateToIRCServer()
  }

  /**
   * Emitted when the server closes. If connections exist, this event is not emitted until all connections are ended.
   */
  private onClose = () => {
    this.connected = false
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
    this.emit("")
  }

  // https://modern.ircdocs.horse/#connection-registration
  private authenticateToIRCServer = () => {
    this.authenticated = false;

    this.sendCommand(`CAP LS 302`);

    this.sendCommand(`NICK ${this.client.nickname}`);
    this.sendCommand(`USER ${this.client.username} 0 * :${this.client.realName}`)

    // we can only run after we've connected and authenticated
    // setTimeout(() => this.sendCommand('JOIN #test'), 10000)

    // start ping stuff
    this.ping()
  }

  private ping = () => {
    // FIXME: do we need a unique message here? Please fix it
    this.sendCommand("PING :msg")
    this.pingSendTime = Date.now()
    setTimeout(this.ping, this.config.pingInterval)
  }

  /**
   * stands in as an example of how we'll propagate information out of the irc library.
   */
  private pong = () => {
    console.debug("connection kept");
    const pingMilliseconds = Date.now() - (this.pingSendTime ?? Date.now()) // catch for first ping value...
    this.emit('ping', pingMilliseconds)
  }

  private parseServerMessage = () => {
    let serverMessage = this.serverMessage;
    this.serverMessage = "";
    // console.debug("Server: ", serverMessage);

    // parsing
    // TODO: properly tokenize the message instead of naive split
    // For above use this: https://modern.ircdocs.horse/#client-to-server-protocol-structure
    const ircMessage = tokenizeServerMessage(serverMessage)
    // console.log("command: ", ircMessage.command)
    //console.log(messageId);
    switch (ircMessage.command) {
      case "PONG":
        this.pong();
        break;
      case "NOTICE":
        break;
      case IRCReplies.welcome.id:
        console.debug("~~~DEBUG~~~: processing Welcome");
        break;
      case IRCReplies.yourHost.id:
        console.debug("~~~DEBUG~~~: processing YourHost");
        break;
      case IRCReplies.created.id:
        console.debug("~~~DEBUG~~~: processing created");
        break;
      case IRCReplies.myInfo.id:
        console.debug("~~~DEBUG~~~: processing myInfo");
        this.authenticated = true
        break;
      case IRCReplies.iSupport.id:
        console.debug("~~~DEBUG~~~: processing iSupport");
        // const result = IRCReplies.iSupport.parseFunction(serverMessage);
        // do something with the result...
        break;
      case IRCReplies.bounce.id:
        //console.debug(Something here maybe?);
        break;
      case IRCReplies.uModeIs.id:
        //console.debug(Something here maybe?);
        break;
      case IRCReplies.lUserClient.id:
        //console.debug(Something here maybe?);
        break;
      case IRCReplies.lUserUnknown.id:
        //console.debug(Something here maybe?);
        break;
      case IRCReplies.lUserChannels.id:
        //console.debug(Something here maybe?);
        break;
      case IRCReplies.lUserMe.id:
        //console.debug(Something here maybe?);
        break;
      case IRCReplies.localUsers.id:
        //console.debug(Something here maybe?);
        break;
      case IRCReplies.globalUsers.id:
        //console.debug(Something here maybe?);
        break;
      case IRCReplies.motd.id:
        // console.log(ircMessage)
        this.emit("serverMessage", ircMessage.parameters[0], ircMessage.parameters.slice(1).join(" "))
        //console.debug(Something here maybe?);
        break;
      case IRCReplies.motdStart.id:
        //console.debug(Something here maybe?);
        break;
      case IRCReplies.endOfMotd.id:
        //console.debug(Something here maybe?);
        break;
      case IRCReplies.notRegistered.id:
        //console.debug(Something here maybe?);
        break;
      default:
        console.warn("Unsupported message type: ", ircMessage.command);
        break;
    }
  }


  private sendCommand = (command: string) => {
    console.debug("Client: ", command);
    this.ircSocket?.write(command + "\n");
  }
}
