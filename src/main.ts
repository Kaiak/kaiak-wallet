import App from './App.svelte';
import 'kaios-gaia-l10n';
import {
  ignoreOnCameraBlur,
  loadStartScreen,
  reset,
} from './machinery/eventListener';
import { languageStore } from './machinery/language';

window.addEventListener('focus', async () => {
  if (ignoreOnCameraBlur()) {
    return;
  }
  setTimeout(async () => {
    await loadStartScreen();
  }, 300);
});
window.addEventListener('blur', () => {
  if (ignoreOnCameraBlur()) {
    return;
  }
  reset();
});

// @ts-ignore
navigator.mozL10n.ready(() => {
  // @ts-ignore
  languageStore.set(navigator.mozL10n.get);
});

const app = new App({
  target: document.body,
  props: {},
});

export default app;
