// import { IRC_Replies } from "data-models/IRC";
import net from "net";
import { buffer } from "stream/consumers";
import { ClientInformation, IRCClientConfiguration, IRCReplies, ServerInformaiton } from "./protocol";


export class IRCClient {
  // TODO: this could all be logged under a single configuraiton object.
  server: ServerInformaiton;
  client: ClientInformation;
  config: IRCClientConfiguration;

  connected: boolean;
  authenticated: boolean;

  serverMessage: string;

  ircSocket: net.Socket | undefined;

  constructor(server: ServerInformaiton, client: ClientInformation, config: IRCClientConfiguration) {
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
  onData = (data: Buffer) => {
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

  onConnect = () => {
    this.connected = true;
    this.authenticateToIRCServer()
  }

  /**
   * Emitted when the server closes. If connections exist, this event is not emitted until all connections are ended.
   */
  onClose = () => {
    this.connected = false
  }

  onError = () => {
    // TODO: handle errors
  }

  onEnd = () => {
    // TODO: handle end
  }

  onTimeout = () => {
    // TODO: handle timeout
  }

  // https://modern.ircdocs.horse/#connection-registration
  authenticateToIRCServer = () => {
    this.authenticated = false;

    this.sendCommand(`CAP LS 302`);

    this.sendCommand(`NICK ${this.client.nickname}`);
    this.sendCommand(`USER ${this.client.username} 0 * :${this.client.realName}`)

    // we can only run after we've connected and authenticated
    // setTimeout(() => this.sendCommand('JOIN #test'), 10000)

    // start ping stuff
    this.ping()
  }

  ping = () => {
    this.sendCommand("PING :msg")
    setTimeout(this.ping, this.config.pingInterval)
  }

  parseServerMessage = () => {
    let serverMessage = this.serverMessage;
    this.serverMessage = "";
    // console.debug("Server: ", serverMessage);

    // parsing
    const tokens = serverMessage.split(" ")
    const messageId = tokens[1];
    switch (messageId) {
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
        break;
      case IRCReplies.iSupport.id:
        console.debug("~~~DEBUG~~~: processing iSupport");
        break;
      default:
        console.warn("Unsupported message type: ", messageId);
    }
  }


  sendCommand = (command: string) => {
    console.debug("Client: ", command);
    this.ircSocket?.write(command + "\n");
  }
}
