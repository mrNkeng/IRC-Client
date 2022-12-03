import { Toast, User } from "data-models";
import { Message } from "data-models/IRCData";
import { makeAutoObservable, toJS } from "mobx";

export class ApplicationState {

  // singletons make me sad
  public static INSTANCE: ApplicationState;

  currentUser: User | undefined

  // serverData: Root

  serverList: Map<string, Server> = new Map()

  constructor() {
    if (ApplicationState.INSTANCE) {
      throw new Error('Store is a singleton');
    }
    ApplicationState.INSTANCE = this;

    makeAutoObservable(this);
  }
}

export class NotificationState {
  public static INSTANCE: NotificationState;

  toast: Toast

  constructor() {
    if (NotificationState.INSTANCE) {
      throw new Error('Store is a singleton');
    }
    NotificationState.INSTANCE = this;
    this.toast = {type: "success", message: "Welcome!", display: true} 
    makeAutoObservable(this);
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

export class Server {
  name: string
  messages: Array<Message>
  users: User[]
  channels: Channel[]

  constructor(name: string) {
    this.name = name;
    this.messages = []
    this.users = []
    this.channels = []
    makeAutoObservable(this)
  }
}

class Channel {

  name: string
  messages: Message[]

  constructor(name: string) {
    this.name = name
    this.messages = []
    makeAutoObservable(this);
  }
}

// export const AppState = new ApplicationState();
