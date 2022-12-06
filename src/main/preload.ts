import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'requestMessages' | 'sendMessageToChannel' | 'sendChannels' | 'signUp' | 'login' | 'serverMessage' |
  'authSuccess' | 'createIRCConnection' | 'serverMetadata' | 'requestServerData' |  'sendMessageData' | 'sendServerData' |
  'sendGlobalUserList' | 'sendChannelUserList' | 'createIRCChannel' | 'refreshChannelList' | 'disconnectFromChannel' | 'connectToChannel' | 'logout';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
});
