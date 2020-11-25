import App from './App.svelte';
import {handleKeydown} from "./svelte/machinery/eventListener";

const app = new App({
	target: document.body,
	props: {}
});


// document.activeElement.addEventListener('keydown', handleKeydown);

export default app;
