<script lang="ts">
    import Content from "../components/Content.svelte";
    import Button from "../components/Button.svelte";
    import {onMount} from "svelte";
    import type {WalletData, WalletResult} from "../machinery/wallet";
    import {generateWallet, storeWallet} from "../machinery/wallet";
    import Seperator from "../components/Seperator.svelte";
    import LabelledInput from "../components/LabelledInput.svelte";
    import {pushMenu} from "../machinery/eventListener";

    let generatedWallet: WalletResult | undefined
    let inputPhrase: string | undefined;

    const inputPassword = (event) => {
        inputPhrase = event.target.value;
    }

    const create = () => {
        if(generatedWallet) {
            storeWallet(generatedWallet.data, inputPhrase)
            pushMenu('unlock')
        }
    }

    onMount(async () => {
        generatedWallet = generateWallet()
    })
</script>
<Content titleKey="create-wallet">

    {#if generatedWallet === undefined}
        loading
    {:else}
        <Seperator languageId="wallet-mnemonic"/>
        {generatedWallet.mnemonic}
        <Seperator languageId="wallet-seed" />
        <div style="overflow-wrap: break-word;">{generatedWallet.data.seed}</div>
        <Seperator languageId="wallet-password" />
        <LabelledInput on:change={inputPassword} />
        <Button languageId="create" on:click={create} />
    {/if}
</Content>
