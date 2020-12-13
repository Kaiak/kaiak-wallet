import { softwareKeysStore } from '../stores/stores';

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
