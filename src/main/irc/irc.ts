import net from "net";
import { buffer } from "stream/consumers";


export class IRCClient {
  server: ServerInformaiton;
  client: ClientInformation;
  config: IRCClientConfiguration;

  serverMessage: string;

  ircSocket: net.Socket | undefined;

  constructor(server: ServerInformaiton, client: ClientInformation, config: IRCClientConfiguration) {
    this.server = server
    this.client = client
    this.config = config

    this.serverMessage = '';
  }

  connect = () => {
    this.ircSocket = net.createConnection(this.server.port, this.server.host);

    this.ircSocket.on('data', this.parseData)
    this.ircSocket.on('connect', () => this.authenticateToIRCServer())
  }


  // https://modern.ircdocs.horse/#connection-registration
  authenticateToIRCServer = () => {
    this.sendCommand(`USER ${this.client.username} 0 * :${this.client.realName}`)
    this.sendCommand(`NICK ${this.client.nickname}`)

    // we can only run after we've connected and authenticated
    setTimeout(() => this.sendCommand('JOIN #test'), 10000)


    // start ping stuff
    this.ping()
  }

  ping = () => {
    this.sendCommand("PING :msg")
    setTimeout(this.ping, this.config.pingInterval)
  }


  parseData = (data: Buffer) => {
    for(const c of data) {
      const char = String.fromCharCode(c)
      this.serverMessage += char;
      if(char === "\n") {
        this.parseServerMessage();
      }
    }
  }

  parseServerMessage = () => {
    let serverMessage = this.serverMessage;
    this.serverMessage = "";
    console.log(serverMessage);
  }


  sendCommand = (command: string) => {
    console.debug("DEBUG | (sendCommand): ", command);
    this.ircSocket?.write(command + "\n");
  }
}
