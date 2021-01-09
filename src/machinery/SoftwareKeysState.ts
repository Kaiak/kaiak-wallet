import { pushMenu } from './eventListener';
import { writable, Writable } from 'svelte/store';

export interface SoftKey {
  onClick: () => Promise<void>;
  languageId: string;
  disabled?: boolean;
}

export interface SoftwareKeysState {
  leftKey?: SoftKey;
  middleKey?: SoftKey;
  rightKey?: SoftKey;
}

export function clearSoftwareKeys() {
  softwareKeysStore.set({
    leftKey: undefined,
    middleKey: undefined,
    rightKey: undefined,
  });
}

export function setSoftwareKeys(state: SoftwareKeysState) {
  softwareKeysStore.set(state);
}

export const SOFT_KEY_MENU: SoftKey = {
  languageId: 'menu',
  onClick: async () => pushMenu('menu'),
};

/** Sets software / menu keys */
export const softwareKeysStore: Writable<SoftwareKeysState> = writable({});
