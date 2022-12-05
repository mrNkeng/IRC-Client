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

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);

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
  state.setServers(serverData)
});

window.electron.ipcRenderer.on('sendMessageData', (args) => {
  const state = getStore();
  const [destination, messages]: [string, Array<Message>] = args;

  if (destination === state.selectedChannel) {
    state.setMessages(messages);
  }
});

window.electron.ipcRenderer.on('serverMetadata', (args) => {
  const state = getStore();
  const [server, metadata]: [string, ServerMetadata] = args;

  // conditionally update the metadata
  if (server === state.selectedServer) {
    state.setMetadata(metadata);
  }
})


// checks if we need to request new data.
autorun(() => {
  if (store.selectedServer.length === 0) {
    return;
  }
  requestServerData(store.selectedServer)
});

const requestServerData = (serverName: string) => {
  window.electron.ipcRenderer.sendMessage('requestServerData', [serverName]);
}
