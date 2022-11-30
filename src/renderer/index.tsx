import React from 'react';
import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App';
import { Accountsettings } from './components/UserSettings/Accountsettings';
import { Login } from './components/Login/Login';
import { Signup } from './components/SignUp/Signup';
import { AppState } from './state';
import { useNavigate } from "react-router-dom";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement!);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
            <Route path="*" element={<App />} />
            <Route path="/Accountsettings" element={<Accountsettings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);

window.electron.ipcRenderer.on('authSuccess', (...args) => {
  const [username, name]: [string, string] = args;
  AppState.currentUser = {name: name, username: username}
  console.log(AppState.currentUser)
})
