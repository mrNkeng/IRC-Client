import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { history } from './history';
import { App } from './App';
import { createNotificationState, createStore, getStore, Server } from "./state"
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

createStore();
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


window.electron.ipcRenderer.on('serverMessage', (args) => {
  const state = getStore();
  const [message, server]: [string, string] = args;
  state.serverList.get(server)?.messages.push({
    content: message,
    id: 0
  })
  console.log("message for: ", server);
});
