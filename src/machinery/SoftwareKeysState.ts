export interface SoftKey {
  onClick: () => void;
  languageId: string;
}

export interface SoftwareKeysState {
  middleKey: SoftKey | undefined;
}
