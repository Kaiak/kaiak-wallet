<script lang="ts">
	import {navigationStore} from "./stores/stores";
	import type {NavigationState} from "./machinery/NavigationState";
	import Menu from "./view/Menu.svelte";
	import Setup from "./view/setup/Setup.svelte";
	import About from "./view/About.svelte";
	import UnlockWallet from "./view/UnlockWallet.svelte";
	import SoftwareKeys from "./view/SoftwareKeys.svelte";
	import Toast from "./components/Toast.svelte";
	import Onboard from "./view/onboard/Onboard.svelte";
	import {onDestroy} from "svelte";
	import {loaderStore} from "./machinery/loader-store";
	import type {Loader} from "./machinery/loader-store";
	import LabelledLoader from "./components/LabelledLoader.svelte";
	import Content from "./components/Content.svelte";
	import type {WalletState} from "./machinery/WalletState";
	import AccountList from "./view/AccountList.svelte";
	import Account from "./view/wallet/Account.svelte";
	import {setWalletState, walletStore} from "./machinery/WalletState";
	import Splash from "./view/Splash.svelte";

	export let version: () => string
	let header: string | undefined = undefined
	let view: string | undefined = undefined

	let state: NavigationState
	let loader: Loader | undefined
	let walletState: WalletState | undefined

	$: fullscreen = state?.menu === 'account' && state?.accountAction === 'send_qr'
	$: {
		const clearState = state === undefined || state.menu === 'unlock'
		if (clearState) {
			setWalletState({})
		}
	}

	const unsubscribeLoader = loaderStore.subscribe((value) => loader = value)
	const unsubscribeNavigation = navigationStore.subscribe(value => state = value);
	const unsubscribeWalletStore = walletStore.subscribe(value => walletState = value)

	onDestroy(() => {
		unsubscribeLoader()
		unsubscribeNavigation()
		unsubscribeWalletStore()
	})
</script>

<style>
	.kui-app {
		height: 100vh;
		display: flex;
		flex-direction: column;
		-moz-hyphens:    none;
		hyphens:         none;
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
			{#if state === undefined || state.menu === 'splash'}
				<Splash />
			{:else if state.menu === 'unlock'}
				<UnlockWallet />
			{:else if state.menu === 'accounts' && walletState?.wallet}
				<AccountList wallet={walletState.wallet} />
			{:else if state.menu === 'account' && walletState?.wallet && walletState?.account}
				<Account walletState={walletState} action={state.accountAction} fullscreen={fullscreen}/>
			{:else if state.menu === 'onboard'}
				<Onboard />
			{:else if state.menu === 'setup' && state.setupAction}
				<Setup setupAction={state.setupAction} />
			{:else if state.menu === 'menu'}
				<Menu wallet={walletState} />
			{:else if state.menu === 'about'}
				<About walletState={walletState} version={version}/>
			{/if}
			<SoftwareKeys/>
		{/if}
	</div>
</main>
