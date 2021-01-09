<script lang="ts">
    import type {NanoAccount} from "../../machinery/models";
    import {onMount, onDestroy} from "svelte";
    import {generate} from "../../machinery/qr-code-generator";

    export let account: NanoAccount;
    let dataUrl: string | undefined = undefined

    let lockScreen: any
    onMount(async () => {
        lockScreen = navigator.requestWakeLock('screen')
        dataUrl = await generate(account.address)
    })

    onDestroy(() => {
		lockScreen.unlock()
	});
</script>

<style>
    img {
        width: 100%;
    }
</style>

{#if dataUrl}
    <img src={dataUrl} alt={account.address} />
{/if}
