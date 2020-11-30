import { Writable, writable } from 'svelte/store';
import { RECEIVE_VIEW } from '../constants/views';
import type { View } from '../constants/views';
import type { LoadedElements } from '../machinery/eventListener';

export const viewStore: Writable<View> = writable<View>(RECEIVE_VIEW);
export const loadedComponentStore: Writable<LoadedElements> = writable<LoadedElements>(
  {
    elements: [],
  }
);
export const backPressesStore: Writable<() => any> = writable<() => any>(
  () => {}
);
