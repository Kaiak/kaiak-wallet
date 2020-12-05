import { Writable, writable } from 'svelte/store';
import type { LoadedElements } from '../machinery/eventListener';
import type { NavigationState } from '../machinery/NavigationState';

export const loadedComponentStore: Writable<LoadedElements> = writable<LoadedElements>(
  {
    elements: [],
  }
);

export const navigationStore: Writable<NavigationState> = writable({
  menu: 'wallet',
  account: undefined,
  wallet: undefined,
});
