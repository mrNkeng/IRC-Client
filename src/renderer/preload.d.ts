import { Channels } from 'main/preload';
import { Root } from '../data-models/interfaces';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        getData(channel: Channels): Promise<Root>;
        sendMessage(channel: Channels, args: unknown[]): void;
        on(
          channel: Channels,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: Channels, func: (...args: unknown[]) => void): void;
      };
    };
  }
}

export {};
