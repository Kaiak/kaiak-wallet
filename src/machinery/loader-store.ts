import { writable } from 'svelte/store';

export interface Loader {
  languageId: string;
  load: () => Promise<void>;
}

export const loaderStore = writable<Loader | undefined>(undefined);

export async function load(loader: Loader) {
  try {
    loaderStore.set(loader);
    setTimeout(
      async () => await loader.load().then(() => loaderStore.set(undefined)),
      50 // TODO: HACK to get loading screen to show
    );
  } catch (error) {
    console.log(`error loading: ${error}`);
  }
}
