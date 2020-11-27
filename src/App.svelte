<script lang="ts">
	import Receive from "./view/Receive.svelte";
	import {loadedComponentStore, viewStore} from "./stores/stores";
	import {RECEIVE_VIEW, MENU_VIEW, BALANCE_VIEW, SETUP_VIEW, SEND_VIEW, ABOUT_VIEW, BACK} from "./constants/views";
	import Menu from "./view/Menu.svelte";
	import {onMount} from "svelte";
	import {handleKeydown} from "./machinery/eventListener";
	import Balance from "./view/Balance.svelte";
	import Setup from "./view/Setup.svelte";
	import Send from "./view/Send.svelte";
	import About from "./view/About.svelte";

	let header = "Receive"
	let view = RECEIVE_VIEW.viewKey
	let views = []

	const unsubscribe = viewStore.subscribe(value => {
		const {viewKey, title} = value;
		if (viewKey && viewKey === BACK.viewKey) {
			let current = views.pop()
			let next = views.pop()
			viewStore.set(next)
		} else if(viewKey) {
			header = title;
			view = viewKey;
			views.push(value)
		}
	});

	const showMenu = () => {
		if (view === MENU_VIEW.viewKey) {
			let current = views.pop()
			let next = views.pop()
			viewStore.set(next)
		} else {
			console.log('er')
			viewStore.set(MENU_VIEW)
		}
	}

	const init = (el) => {
		el.focus();
	}

	onMount(() => {
		const elements = document.activeElement.getElementsByClassName('navigation')
		console.log(elements)
		loadedComponentStore.set({elements: elements})
	})

</script>


<main>
<div id="kui-app">
	<div class="kui-header">
		<h1 class="kui-h1" id="kui-header">{header}</h1>
	</div>
	<div class="kui-content-area" id="content-area">
		{#if view === RECEIVE_VIEW.viewKey}
			<Receive />
		{:else if view === SEND_VIEW.viewKey}
			<Send />
		{:else if view === BALANCE_VIEW.viewKey}
			<Balance />
		{:else if view === SETUP_VIEW.viewKey}
			<Setup />
		{:else if view === MENU_VIEW.viewKey}
			<Menu />
		{:else if view === ABOUT_VIEW.viewKey}
			<About />
		{/if}
		<div id="kui-options" class="kui-option-menu"></div>
	</div>
</div>
<div class="kui-software-key">
	<h5 role="button" class="kui-h5 kui-text-left" id="kui-left-soft-key"></h5>
	<h5 role="button" class="kui-h5 kui-text-center kui-text-upcase" id="kui-middle-soft-key"></h5>
	<h5 role="button" class="kui-h5 kui-text-right" on:click={showMenu} data-l10n-id="rightNavButton"></h5>
</div>
</main>
