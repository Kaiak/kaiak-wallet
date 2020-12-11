import { Writable, writable } from 'svelte/store';
import type { LoadedElements } from '../machinery/eventListener';
import type { NavigationState } from '../machinery/NavigationState';
import type { SoftwareKeysState } from '../machinery/SoftwareKeysState';
import { START_STATE } from '../machinery/NavigationState';
import type { ToastState } from '../machinery/ToastState';

export const loadedComponentStore: Writable<LoadedElements> = writable<LoadedElements>(
  {
    elements: [],
  }
);

export const navigationStore: Writable<NavigationState> = writable(START_STATE);

export const softwareKeysStore: Writable<SoftwareKeysState> = writable({
  leftKey: undefined,
  middleKey: undefined,
});

export const toastStore: Writable<ToastState> = writable({
  languageId: null,
});
