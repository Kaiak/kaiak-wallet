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

{#if dataUrl}
    <img src={dataUrl} alt={account.address} />
{/if}
