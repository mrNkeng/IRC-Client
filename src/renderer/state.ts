import { Root } from "data-models/interfaces";
import { makeAutoObservable } from "mobx";

export class ApplicationState {

  public static INSTANCE: ApplicationState;

  currentUser: User | undefined

  serverData: Root

  constructor() {
    if (ApplicationState.INSTANCE) {
      throw new Error('Store is a singleton');
    }
    ApplicationState.INSTANCE = this;
    this.serverData = {
      ServerList: []
    }
    makeAutoObservable(this);
  }
}

export function createStore(): ApplicationState {
  return new ApplicationState();
}

export function getStore(): ApplicationState {
  return ApplicationState.INSTANCE;
}

// export const AppState = new ApplicationState();
