import { Writable, writable } from 'svelte/store';
import { WALLET_VIEW } from '../constants/views';
import type { View } from '../constants/views';
import type { LoadedElements } from '../machinery/eventListener';
import type { NanoAccount } from '../machinery/models';
import type { AccountAction } from '../constants/account-actions';
import type {NavigationState} from "../machinery/NavigationState";

export const viewStore: Writable<View> = writable<View>(WALLET_VIEW);
export const loadedComponentStore: Writable<LoadedElements> = writable<LoadedElements>(
  {
    elements: [],
  }
);

export const navigationStore: Writable<NavigationState> = writable({
    menu: 'wallet',
    account: undefined,
})
