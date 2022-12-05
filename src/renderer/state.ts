import { Server, Toast, User } from "data-models";
import { Channel, Message, ServerMetadata } from "data-models";
import { makeAutoObservable, toJS } from "mobx";

export class ApplicationState {

  // singletons make me sad
  public static INSTANCE: ApplicationState;

  currentUser: User | undefined

  // serverData: Root

  // serverList: Map<string, Server> = new Map()

  selectedServer: string = ""
  selectedChannel: string = ""
  metadata: ServerMetadata | undefined = undefined
  servers: Array<Pick<Server, "name">> = []
  channels: Array<Channel> = []
  messages: Array<Message> = []


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

  setServers = (serverData: Array<Pick<Server, "name">>) => {
    this.servers = serverData;
  }

  setMessages = (messages: Array<Message>) {
    this.messages = messages;
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
