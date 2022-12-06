import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { history } from './history';
import { App } from './App';
import { createNotificationState, createStore, getStore } from "./state"
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { Message, ServerMetadata, Server } from 'data-models';
import { autorun } from 'mobx';

const store = createStore();
createNotificationState();
const rootElement = document.getElementById('root');
const root = ReactDOMClient.createRoot(rootElement!);

root.render(
  <StrictMode>
    {/* I have no idea how important that error is Just pray we don't need to worry about it*/}
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </StrictMode>
);

window.electron.ipcRenderer.on('authSuccess', (args) => {
  const state = getStore();
  const [username, name]: [string, string] = args;
  state.currentUser = { name: name, username: username };
  history.push("/Chat")
  console.log(state.currentUser);

  // loadInitalData()
});

window.electron.ipcRenderer.on('sendServerData', (args) => {
  const state = getStore();
  const [serverData]: [Array<Pick<Server, "name">>] = args;
  console.debug("Updaing serverData")
  state.setServers(serverData)
});

window.electron.ipcRenderer.on('sendMessageData', (args) => {
  const state = getStore();
  const [serverName, destination, messages]: [string, string, Array<Message>] = args;

  console.debug("MessageData: ", serverName)
  console.debug("MessageData: ", destination)
  console.debug("MessageData: ", messages)

  console.debug("SelectedChannel: ", state.selectedChannel)

  if (serverName === state.selectedServer && destination === state.selectedChannel) {
    console.debug("Updaing MessageData")
    state.setMessages(messages);
  }
});

window.electron.ipcRenderer.on('sendChannels', (args) => {
  //sends just the list of channels
  const state = getStore();
  const [serverName, channels]: [string, {name: string, connected: boolean}[]] = args;

  console.debug("ChannelList: ", serverName)
  console.debug("ChannelList: ", channels)
  console.debug("ChannelList: ", state.currentUser?.username)

  if (serverName !== state.selectedServer) {
    return
  }
  state.setChannels(channels);
});

window.electron.ipcRenderer.on('sendGlobalUserList', (args) => {
  //sends the list of global users
  //TODO
  const state = getStore();

  const [client, messages]: [string, Array<string>] = args;
});

window.electron.ipcRenderer.on('sendChannelUserList', (args) => {
  //sends the list of channel users
  //TODO
  const state = getStore();
  const [destination, users]: [string, Array<string>] = args;

  console.debug(destination)
  console.debug(users)

  if (destination === state.selectedChannel) {
    console.debug("Updaing ChannelUserList")
    state.setChannelUsers(users ?? []);
  }
});

window.electron.ipcRenderer.on('serverMetadata', (args) => {
  const state = getStore();
  const [server, metadata]: [string, ServerMetadata] = args;

  // conditionally update the metadata
  if (server === state.selectedServer) {
    console.debug("Updaing serverMetadata")
    state.setMetadata(metadata);
  }
})


// checks if we need to request new data.
autorun(() => {
  if (store.selectedServer.length === 0) {
    return;
  }
  requestServerData(store.selectedServer, store.selectedChannel)
});

const requestServerData = (serverName: string, channelName: string) => {
  window.electron.ipcRenderer.sendMessage('requestServerData', [serverName, channelName]);
}
