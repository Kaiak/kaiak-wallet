import { writable } from 'svelte/store';
import {RECEIVE_VIEW} from "../constants/views";

export const viewStore = writable(RECEIVE_VIEW);
export const loadedComponentStore = writable({})

