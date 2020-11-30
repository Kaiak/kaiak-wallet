import { Writable, writable } from 'svelte/store';
import {WALLET_VIEW} from '../constants/views';
import type { View } from '../constants/views';
import type { LoadedElements } from '../machinery/eventListener';

export const viewStore: Writable<View> = writable<View>(WALLET_VIEW);
export const loadedComponentStore: Writable<LoadedElements> = writable<LoadedElements>(
  {
    elements: [],
  }
);
export const backPressesStore: Writable<() => any> = writable<() => any>(
  () => {}
);
