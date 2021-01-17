import App from './App.svelte';
import 'kaios-gaia-l10n';
import {
  ignoreOnCameraBlur,
  loadStartScreen,
  reset,
} from './machinery/eventListener';
import { languageStore } from './machinery/language';

const appNode: HTMLElement = document.getElementById('app');
const addKaiosEvents: boolean = appNode.getAttribute('kaios') === 'true';

if (addKaiosEvents) {
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
} else {
  window.addEventListener('load', () => {
    setTimeout(async () => {
      await loadStartScreen();
    }, 300);
  });
}

// @ts-ignore
navigator.mozL10n.ready(() => {
  // @ts-ignore
  languageStore.set(navigator.mozL10n.get);
});

const app = new App({
  target: appNode,
  props: {
    version: () => '[VI]{version}[/VI]',
  },
});

export default app;
