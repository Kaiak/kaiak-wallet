import App from './App.svelte';
import {
  ignoreOnCameraBlur,
  loadStartScreen,
  reset,
} from './machinery/eventListener';

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

const app = new App({
  target: document.body,
  props: {},
});

export default app;
