<script lang="ts">
    import type {NanoAccount} from "../../machinery/models";
    import {onMount, onDestroy} from "svelte";
    import {generate} from "../../machinery/qr-code-generator";
    import {navigationReload} from "../../machinery/eventListener";

    export let account: NanoAccount;
    let dataUrl: string | undefined = undefined

    let lockScreen: any | undefined
    onMount(async () => {
        if(typeof navigator.requestWakeLock === 'function') {
            lockScreen = navigator.requestWakeLock('screen')
        }
        dataUrl = await generate(account.address)
        navigationReload()
    })

    onDestroy(() => {
		lockScreen?.unlock()
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
