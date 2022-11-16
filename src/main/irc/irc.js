// import net from "net";
const net = require('net');

class IRCClient {
  constructor(server, client, config) {
    this.server = server
    this.client = client
    this.config = config
  }

  connect = () => {
    this.ircSocket = net.createConnection(this.server.port, this.server.host);

    this.ircSocket.on('data', this.parseData)
    this.ircSocket.on('connect', () => this.authenticateToIRCServer())
  }


  // https://modern.ircdocs.horse/#connection-registration
  authenticateToIRCServer = () => {
    this.sendCommand(`USER ${this.client.username} 0 * :${this.client.realName}`)
    this.sendCommand(`NICK ${this.client.nick}`)

    // we can only run after we've connected and authenticated
    setTimeout(() => this.sendCommand('JOIN #test'), 10000)


    // start ping stuff
    this.ping(this.config.pingInterval)
  }

  ping = () => {
    this.sendCommand("PING :msg")
    setTimeout(this.ping, this.config.pingInterval)
  }


  parseData = (data) => {
    console.log(data.toString());
  }


  sendCommand = (command) => {
    console.debug("DEBUG | (sendCommand): ", command);
    this.ircSocket.write(command + "\n");
  }
}

const server = {
  host: "irc.valanidas.dev",
  port :6667
}

const client = {
  realName: "John Valanidas",
  username: "Test",
  nick: "NodeClient"
}

const config = {
  pingInterval: 20 * 1000 // this is arbitrary (maybe there is a proper number)
}

const ircClient = new IRCClient(server, client, config);
ircClient.connect();
