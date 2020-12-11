import { Writable, writable } from 'svelte/store';
import type { LoadedElements } from '../machinery/eventListener';
import type { NavigationState } from '../machinery/NavigationState';
import type { SoftwareKeysState } from '../machinery/SoftwareKeysState';
<<<<<<< HEAD
import type { ToastState } from '../machinery/ToastState';
=======
import { START_STATE } from '../machinery/NavigationState';
>>>>>>> org/master

export const loadedComponentStore: Writable<LoadedElements> = writable<LoadedElements>(
  {
    elements: [],
  }
);

export const navigationStore: Writable<NavigationState> = writable(START_STATE);

export const softwareKeysStore: Writable<SoftwareKeysState> = writable({
  middleKey: undefined,
});

export const toastStore: Writable<ToastState> = writable({
  body: null,
});
