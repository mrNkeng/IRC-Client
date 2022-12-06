import { Server, Toast, User, Message, ServerMetadata, Channel } from "data-models";
import { ClientSettings, defaultClientSettings } from "data-models/ClientSettings";

import { makeAutoObservable, toJS } from "mobx";

export class ApplicationState {

  // singletons make me sad
  public static INSTANCE: ApplicationState;

  currentUser: User | undefined

  settings: ClientSettings = defaultClientSettings;

  selectedServer: string = "";
  selectedChannel: string = "";
  metadata: ServerMetadata | undefined = undefined;
  servers: Array<Pick<Server, "name">> = [];
  globalUsers: Array<string> = [];
  channelUsers: Array<string> = [];
  channels: {name: string, connected: boolean}[] = [];
  messages: Array<Message> = [];


  constructor() {
    if (ApplicationState.INSTANCE) {
      throw new Error('Store is a singleton');
    }
    ApplicationState.INSTANCE = this;

    makeAutoObservable(this);
  }

  setMetadata = (metadata: ServerMetadata) => {
    this.metadata = metadata
  }

  setSelectedServer = (serverName: string) => {
    this.selectedServer = serverName;
  }

  setSelectedChannel = (channelName: string) => {
    this.selectedChannel = channelName;
  }

  setServers = (serverData: Array<Pick<Server, "name">>) => {
    this.servers = serverData;
  }

  setChannels = (channels: {name: string, connected: boolean}[]) => {
    this.channels = channels;
  }

  setMessages = (messages: Array<Message>) => {
    this.messages = messages;
  }

  setVolume = (volume: number) => {
    this.settings.notificationVolume = volume
  }

  setGlobalUsers = (users: string[]) => {
    this.globalUsers = users;
  }

  setChannelUsers = (users: string[]) => {
    this.channelUsers = users;
  }

  changeChannel = (channel: string) => {
    this.setSelectedChannel(channel);
    window.electron.ipcRenderer.sendMessage('requestServerData', [this.selectedServer, channel]);
  }

  sendMessage = (message: string) => {
    window.electron.ipcRenderer.sendMessage('sendMessageToChannel', [this.selectedServer, this.selectedChannel, message]);
  }

  reset = () => {
    this.currentUser = undefined

    this.settings = defaultClientSettings;

    this.selectedServer = "";
    this.selectedChannel = "";
    this.metadata = undefined;
    this.servers = [];
    this.globalUsers = [];
    this.channelUsers = [];
    this.channels = [];
    this.messages = [];
  }

  logout = () => {
    this.reset()
  }
}

export class NotificationState {
  public static INSTANCE: NotificationState;

  toast: Toast;

  constructor() {
    if (NotificationState.INSTANCE) {
      throw new Error('Store is a singleton');
    }
    this.toast = {type: "success", message: "Welcome!", display: true};
    NotificationState.INSTANCE = this;
    makeAutoObservable(this);
  }

  hideToast = () => {
    this.toast.display = false;
  }
}

export function createStore(): ApplicationState {
  return new ApplicationState();
}

export function getStore(): ApplicationState {
  return ApplicationState.INSTANCE;
}

export function createNotificationState(): NotificationState {
  return new NotificationState();
}

export function getNotificationState(): NotificationState {
  return NotificationState.INSTANCE;
}
