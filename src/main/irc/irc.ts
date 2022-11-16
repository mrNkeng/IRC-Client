// import net from "net";
const net = require('net');

const host = "irc.valanidas.dev";
const port = 6667
const realName = "John Valanidas"
const username = "Test"
const pingInterval = 20 * 1000;

const ircSocket = net.createConnection(port, host);


const parseData = (data) => {
  console.log(data.toString());
}

const sendCommand = (command) => {
  console.debug("DEBUG | (sendCommand): ", command);
  ircSocket.write(command + "\n");
}



// must use this: https://modern.ircdocs.horse/#connection-registration
const connectToIRC = () => {
  sendCommand(`USER ${username} 0 * :${realName}`)
  sendCommand(`NICK nodeClient`)

  // we can only run after we've connected and authenticated
  // sendCommand('JOIN #test')


  // start ping stuff
  ping()
}

const ping = () => {
  sendCommand("PING :msg")
  setTimeout(ping, pingInterval)
}

ircSocket.on('data', parseData)
ircSocket.on('connect', connectToIRC)
