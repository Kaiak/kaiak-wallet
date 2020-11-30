import { Writable, writable } from 'svelte/store';
import {WALLET_VIEW} from '../constants/views';
import type { View } from '../constants/views';
import type { LoadedElements } from '../machinery/eventListener';
import type {NanoAccount} from "../machinery/models";
import type {AccountAction} from "../constants/account-actions";

export const viewStore: Writable<View> = writable<View>(WALLET_VIEW);
export const loadedComponentStore: Writable<LoadedElements> = writable<LoadedElements>(
  {
    elements: [],
  }
);
export const backPressesStore: Writable<() => any> = writable<() => any>(
  () => {}
);

export const selectedAccountStore: Writable<NanoAccount | undefined> = writable(undefined)
export const selectedActionStore: Writable<AccountAction | undefined> = writable(undefined)
