<script>
	import Receive from "./svelte/view/Receive.svelte";
	import {viewStore} from "./svelte/stores/stores";

	let header = "Receive"
	let view = "receive"

	const unsubscribe = viewStore.subscribe(value => {
		const {viewKey, title} = value;
		if(viewKey) {
			header = title;
			view = viewKey;
		}
	});

</script>


<main>
<div id="kui-app">
	<div class="kui-header">
		<h1 class="kui-h1" id="kui-header">{header}</h1>
	</div>
	<div class="kui-content-area" id="content-area">
		{#if view === "receive"}
			<Receive />
		{/if}
		<div id="kui-options" class="kui-option-menu"></div>
	</div>
</div>
<div class="kui-software-key">
	<h5 role="button" class="kui-h5 kui-text-left" id="kui-left-soft-key"></h5>
	<h5 role="button" class="kui-h5 kui-text-center kui-text-upcase" id="kui-middle-soft-key"></h5>
	<h5 role="button" class="kui-h5 kui-text-right">Menu</h5>
</div>
</main>
