<script lang="ts">
	import {navigationStore} from "./stores/stores";
	import type {NavigationState} from "./machinery/NavigationState";
	import Menu from "./view/Menu.svelte";
	import Setup from "./view/Setup.svelte";
	import About from "./view/About.svelte";
	import Wallet from "./view/Wallet.svelte";
	import UnlockWallet from "./view/UnlockWallet.svelte";
	import SoftwareKeys from "./view/SoftwareKeys.svelte";
	import Toast from "./components/Toast.svelte";
	import Onboard from "./view/Onboard.svelte";
	import {afterUpdate, onMount} from "svelte";
	import {walletExists} from "./machinery/secure-storage";
	import {pushMenu} from "./machinery/eventListener";

	let header: string | undefined = undefined
	let view: string | undefined = undefined

	let state: NavigationState

	const unsubscribe = navigationStore.subscribe<NavigationState>(value => {
		state = value
	});

	onMount(async () => {
		const exists = await walletExists()
		if(exists) {
			pushMenu('unlock')
		} else {
			pushMenu('onboard')
		}
	})
</script>

<main>
	<Toast/>
		<div id="kui-app">
		{#if state.menu === 'wallet'}
			<Wallet />
		{:else if state.menu === 'onboard'}
			<Onboard />
		{:else if state.menu === 'setup'}
			<Setup />
		{:else if state.menu === 'menu'}
			<Menu />
		{:else if state.menu === 'about'}
			<About />
		{:else if state.menu === 'unlock'}
			<UnlockWallet />
		{/if}
		</div>
	<SoftwareKeys/>
</main>
