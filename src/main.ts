import App from './App.svelte';
import { loadedComponentStore } from './stores/stores';

const app = new App({
  target: document.body,
  props: {},
});

export default app;
