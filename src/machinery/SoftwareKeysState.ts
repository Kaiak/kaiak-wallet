export interface SoftKey {
  onClick: () => void;
  languageId: string;
}

export interface SoftwareKeysState {
  leftKey: SoftKey | undefined;
  middleKey: SoftKey | undefined;
  rightKey: SoftKey | undefined;
}
