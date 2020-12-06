<script lang="ts">
    import Content from "../components/Content.svelte";
    import Button from "../components/Button.svelte";
    import Text from "../components/Text.svelte";
    import {onMount} from "svelte";
    import type { WalletResult } from "../machinery/wallet";
    import {createWallet, generateWallet} from "../machinery/wallet";
    import Seperator from "../components/Seperator.svelte";
    import LabelledInput from "../components/LabelledInput.svelte";
    import {pushMenu} from "../machinery/eventListener";

    let generatedWallet: WalletResult | undefined
    let inputPhrase: string | undefined;

    const inputPassword = (event) => {
        inputPhrase = event.target.value;
    }

    const create = async () => {
        if(generatedWallet) {
            await createWallet(generatedWallet, inputPhrase)
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
        <Text>{generatedWallet.mnemonic}</Text>
        <Seperator languageId="wallet-seed" />
        <Text breakAll=true>{generatedWallet.seed}</Text>
        <Seperator languageId="wallet-password" />
        <LabelledInput type="number" on:change={inputPassword} />
        <Button languageId="create" on:click={create} />
    {/if}
</Content>
