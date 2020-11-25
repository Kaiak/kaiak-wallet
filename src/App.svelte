<script>
	import Receive from "./svelte/view/Receive.svelte";
	import {viewStore} from "./svelte/stores/stores";
	import {RECEIVE_VIEW, MENU_VIEW} from "./js/constants/views";
	import Menu from "./svelte/view/Menu.svelte";

	let header = "Receive"
	let view = RECEIVE_VIEW

	const unsubscribe = viewStore.subscribe(value => {
		const {viewKey, title} = value;
		if (viewKey) {
			header = title;
			view = viewKey;
		}
	});

	const showMenu = () => {
		viewStore.set({viewKey: MENU_VIEW, title: "Menu"})
	}

</script>


<main>
<div id="kui-app">
	<div class="kui-header">
		<h1 class="kui-h1" id="kui-header">{header}</h1>
	</div>
	<div class="kui-content-area" id="content-area">
		{#if view === RECEIVE_VIEW}
			<Receive />
		{:else if view === MENU_VIEW}
			<Menu />
		{/if}
		<div id="kui-options" class="kui-option-menu"></div>
	</div>
</div>
<div class="kui-software-key">
	<h5 role="button" class="kui-h5 kui-text-left" id="kui-left-soft-key"></h5>
	<h5 role="button" class="kui-h5 kui-text-center kui-text-upcase" id="kui-middle-soft-key"></h5>
	<h5 role="button" class="kui-h5 kui-text-right" on:click={showMenu}>Menu</h5>
</div>
</main>
