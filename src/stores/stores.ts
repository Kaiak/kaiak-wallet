import type { NavigationState } from '../machinery/NavigationState';
import type { SoftwareKeysState } from '../machinery/SoftwareKeysState';
import type { ToastState } from '../machinery/ToastState';
import type { WalletState } from '../machinery/WalletState';
import { Writable, writable } from 'svelte/store';
import { START_STATE } from '../machinery/NavigationState';

/** Handles navigation */
export const navigationStore: Writable<NavigationState> = writable(START_STATE);

/** Sets software / menu keys */
export const softwareKeysStore: Writable<SoftwareKeysState> = writable({
  leftKey: undefined,
  middleKey: undefined,
  rightKey: undefined,
});

/** Controls global toast */
export const toastStore: Writable<ToastState> = writable({
  languageId: null,
});

/** Handles updates of wallet */
export const walletStore: Writable<WalletState> = writable({
  wallet: undefined,
  selectedAccount: undefined,
});
