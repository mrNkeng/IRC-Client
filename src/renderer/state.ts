import { app } from "electron";
import { makeAutoObservable, makeObservable } from "mobx";

class ApplicationState {

  currentUser: User | undefined

  constructor() {
    makeAutoObservable(this);
  }
}


export const AppState = new ApplicationState();
