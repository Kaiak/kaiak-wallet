import { writable } from 'svelte/store';

export interface Loader {
  languageId: string;
  load: () => Promise<void>;
}

export const loaderStore = writable<Loader | undefined>(undefined);

export async function load(loader: Loader) {
  loaderStore.set(loader);
  await loader.load();
  loaderStore.set(undefined);
}
