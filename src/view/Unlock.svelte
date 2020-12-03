<script lang="ts">
    import Content from "../components/Content.svelte";
    import LabelledInput from "../components/LabelledInput.svelte";
    import Button from "../components/Button.svelte";
    import {unlockWallet} from "../machinery/wallet";
    import type { WalletData } from "../machinery/wallet";

    let inputPhrase: string | undefined;

    const onInputPassword = (event) => {
        inputPhrase = event.target.value;
    }

    const unlock = () => {
        const data: WalletData | undefined = unlockWallet(inputPhrase)
        console.log(data)
    }
</script>

<Content titleKey="unlock-wallet">
    <LabelledInput languageId="unlock-label" placeholderLanguage="unlock-label" on:change={onInputPassword}/>
    <Button languageId="unlock-wallet" on:click={unlock}/>
</Content>
