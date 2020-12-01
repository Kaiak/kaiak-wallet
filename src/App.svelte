<script lang="ts">
	import {loadedComponentStore, navigationStore} from "./stores/stores";
	import Menu from "./view/Menu.svelte";
	import {onMount} from "svelte";
	import {handleKeydown} from "./machinery/eventListener";
	import Setup from "./view/Setup.svelte";
	import About from "./view/About.svelte";
	import Wallet from "./view/Wallet.svelte";
	import type { NavigationState } from "./machinery/NavigationState";
	import {pushState} from "./machinery/eventListener";

	let header: string | undefined = undefined
	let view: string | undefined = undefined

	let state: NavigationState

	const unsubscribe = navigationStore.subscribe<NavigationState>(value => {
		state = value
	});

	const init = (el) => {
		// el.focus();
	}

	onMount(() => {
		const elements = document.activeElement.getElementsByClassName('navigation')
		console.log(elements)
		loadedComponentStore.set({elements: elements})
	})

</script>

<main>
	<div id="kui-app">
		{#if state.menu === 'wallet'}
			<Wallet />
		{:else if state.menu === 'setup'}
			<Setup />
		{:else if state.menu === 'menu'}
			<Menu />
		{:else if state.menu === 'about'}
			<About />
		{/if}
	</div>

	<div class="kui-software-key">
		<h5 role="button" class="kui-h5 kui-text-left" id="kui-left-soft-key"></h5>
		<h5 role="button" class="kui-h5 kui-text-center kui-text-upcase" id="kui-middle-soft-key"></h5>
		<h5 role="button" class="kui-h5 kui-text-right" on:click={() => pushState({...state, menu: 'menu' })} data-l10n-id="rightNavButton"></h5>
	</div>
</main>
