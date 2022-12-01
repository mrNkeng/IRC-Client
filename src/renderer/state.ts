import { Message, Root } from "data-models/interfaces";
import { makeAutoObservable } from "mobx";


// interface ServerList {
//   [key: string]: Server
// }
export class ApplicationState {

  // singletons make me sad
  public static INSTANCE: ApplicationState;

  currentUser: User | undefined

  // serverData: Root

  serverList: Map<string, Server>

  constructor() {
    if (ApplicationState.INSTANCE) {
      throw new Error('Store is a singleton');
    }
    ApplicationState.INSTANCE = this;
    this.serverList = new Map()

    makeAutoObservable(this);
  }
}

export function createStore(): ApplicationState {
  return new ApplicationState();
}

export function getStore(): ApplicationState {
  return ApplicationState.INSTANCE;
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
