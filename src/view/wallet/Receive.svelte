<script lang="ts">
    import type {NanoAccount} from "../../machinery/models";
    import {onMount} from "svelte";
    import {generate} from "../../machinery/qr-code-generator";

    export let account: NanoAccount;
    let dataUrl: string | undefined = undefined

    onMount(async () => {
        dataUrl = await generate(account.address)
    })
</script>

<div id="receive__view">

    {#if dataUrl}
        <img src={dataUrl} alt={account.address} />
    {:else}
        <span data-l10n-id="receive-loading-qr"></span>
    {/if}


    <span>{account.alias}</span>
    <span>{account.address}</span>
</div>

