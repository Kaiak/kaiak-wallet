<script lang="ts">
	import {loadedComponentStore, navigationStore} from "./stores/stores";
	import Menu from "./view/Menu.svelte";
	import {onMount} from "svelte";
	import {pushMenu} from "./machinery/eventListener";
	import Setup from "./view/Setup.svelte";
	import About from "./view/About.svelte";
	import Wallet from "./view/Wallet.svelte";
	import type {NavigationState} from "./machinery/NavigationState";
	import UnlockWallet from "./view/UnlockWallet.svelte";
	import CreateWallet from "./view/CreateWallet.svelte";
	import {walletDataExists} from "./machinery/secure-storage";
	import SoftwareKeys from "./view/SoftwareKeys.svelte";

	let header: string | undefined = undefined
	let view: string | undefined = undefined

	let state: NavigationState

	const unsubscribe = navigationStore.subscribe<NavigationState>(value => {
		state = value
	});

	onMount(() => {
		if (walletDataExists()) {
			pushMenu('unlock')
		} else {
			pushMenu('create')
		}
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
		{:else if state.menu === 'unlock'}
			<UnlockWallet />
		{:else if state.menu === 'create'}
			<CreateWallet />
		{/if}
	</div>
	<SoftwareKeys/>
</main>
