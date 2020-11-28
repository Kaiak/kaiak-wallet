import {Writable, writable} from 'svelte/store';
import {RECEIVE_VIEW} from "../constants/views";
import type {View} from "../constants/views";

export const viewStore: Writable<View> = writable<View>(RECEIVE_VIEW);
export const loadedComponentStore = writable({})

