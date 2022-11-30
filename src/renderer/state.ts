import { app } from "electron";
import { makeAutoObservable, makeObservable } from "mobx";

export class ApplicationState {

  public static INSTANCE: ApplicationState;

  currentUser: User | undefined

  constructor() {
    if (ApplicationState.INSTANCE) {
      throw new Error('Store is a singleton');
    }

    ApplicationState.INSTANCE = this;
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
