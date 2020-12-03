import App from './App.svelte';
import { loadedComponentStore } from './stores/stores';

const app = new App({
  target: document.body,
  props: {},
});

const elements = document.activeElement.getElementsByClassName('navigation');
loadedComponentStore.set({ elements: elements });

export default app;
