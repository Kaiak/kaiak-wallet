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
	import {onMount} from "svelte";
	import {unlockWallet} from "./machinery/secure-storage";
	import type {WalletError} from "./machinery/secure-storage";
	import type {NanoWallet} from "./machinery/models";
	import {pushMenu} from "./machinery/eventListener";
	import LabelledLoader from "./components/LabelledLoader.svelte";

	let loadedState: boolean = false;
	let header: string | undefined = undefined
	let view: string | undefined = undefined

	let state: NavigationState

	const unsubscribe = navigationStore.subscribe<NavigationState>(value => {
		state = value
	});

	onMount(async () => {
		let w: NanoWallet | WalletError = await unlockWallet('*')
		console.log(w)
		if (w === 'wrong_pass') {
			pushMenu('unlock')
		} else {
			console.log(w)
		}
		loadedState = true;
	})
</script>

<main>
	<Toast/>
		<div id="kui-app">
			{#if loadedState}
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
			{:else}
				<LabelledLoader/>
			{/if}
		</div>
	<SoftwareKeys/>
</main>
