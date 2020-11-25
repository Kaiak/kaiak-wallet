import { writable } from 'svelte/store';

export const viewStore = writable({viewKey: undefined, title: "Unknown"});
