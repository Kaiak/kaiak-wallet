<script lang="ts">
    import type {NanoAccount} from "../../machinery/models";
    import {onMount} from "svelte";
    import {generate} from "../../machinery/qr-code-generator";
    import LabelledLoader from "../../components/LabelledLoader.svelte";

    export let account: NanoAccount;
    let dataUrl: string | undefined = undefined

    onMount(async () => {
        dataUrl = await generate(account.address)
    })
</script>

{#if dataUrl}
    <div id="receive__view">
        <img src={dataUrl} alt={account.address} />
    </div>
{:else}
    <LabelledLoader languageId="aasdf" />
{/if}
