import { writable } from 'svelte/store';

type languageFun = (key: string) => string | undefined;
export const languageStore = writable<languageFun>(() => undefined);
export let getLanguage: languageFun;

languageStore.subscribe((value) => {
  getLanguage = value;
});
