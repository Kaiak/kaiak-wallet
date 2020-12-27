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
	import {onDestroy} from "svelte";
	import {loaderStore} from "./machinery/loader-store";
	import type {Loader} from "./machinery/loader-store";
	import LabelledLoader from "./components/LabelledLoader.svelte";
	import Content from "./components/Content.svelte";

	let header: string | undefined = undefined
	let view: string | undefined = undefined


	let state: NavigationState
	let loader: Loader | undefined

	const usubLoader = loaderStore.subscribe((value) => {
		loader = value
	})

	const usubNavigation = navigationStore.subscribe<NavigationState>(value => {
		state = value
	});

	onDestroy(() => {
		usubLoader()
		usubNavigation()
	})
</script>

<style>
	.kui-app {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}
</style>

<main>
	<Toast/>
	<div class="kui-app">
		{#if loader}
			<Content titleKey="loading">
				<LabelledLoader languageId={loader.languageId}/>
			</Content>
		{:else}
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
			<SoftwareKeys/>
		{/if}
	</div>
</main>
