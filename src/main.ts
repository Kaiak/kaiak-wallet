import App from './App.svelte';
import { loadStartScreen } from './machinery/eventListener';

window.addEventListener('focus', async () => {
  await loadStartScreen();
});

const app = new App({
  target: document.body,
  props: {},
});

export default app;
