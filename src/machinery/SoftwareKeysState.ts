import { softwareKeysStore } from '../stores/stores';
import { pushMenu } from './eventListener';

export interface SoftKey {
  onClick: () => void;
  languageId: string;
}

export interface SoftwareKeysState {
  leftKey: SoftKey | undefined;
  middleKey: SoftKey | undefined;
  rightKey: SoftKey | undefined;
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
export function setSoftwareKeysToMenu() {
  softwareKeysStore.set({
    leftKey: undefined,
    middleKey: undefined,
    rightKey: {
      languageId: 'rightNavButton',
      onClick: () => pushMenu('menu'),
    },
  });
}
