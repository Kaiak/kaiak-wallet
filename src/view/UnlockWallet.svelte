<script lang="ts">
    import Content from "../components/Content.svelte";
    import LabelledInput from "../components/LabelledInput.svelte";
    import Button from "../components/Button.svelte";
    import {clearState, pushMenu, pushState} from "../machinery/eventListener";
    import type {NanoWallet} from "../machinery/models";
    import {unlockWallet} from "../machinery/secure-storage";
    import LabelledLoader from "../components/LabelledLoader.svelte";

    let inputPhrase: string | undefined;
    let showLoader: boolean = false;

    const onInputPassword = (event) => {
        inputPhrase = event.target.value;
    }

    const unlock = async () => {
        showLoader = true;
        const data: NanoWallet | undefined = await unlockWallet(inputPhrase)
        if (data) {
            clearState()
            pushState({menu: 'wallet', wallet: data, account: undefined})
        }
        showLoader = false;
    }

    const createNew = () => pushMenu('create')

</script>

<Content titleKey="unlock-wallet">
    {#if !showLoader}
        <LabelledInput type="number" languageId="unlock-label" placeholderLanguage="unlock-label" on:change={onInputPassword}/>
        <Button languageId="unlock-wallet" on:click={unlock}/>
        <Button languageId="create-new-wallet" on:click={createNew} />
    {:else}
        <LabelledLoader languageId="unlocking-wallet"/>
    {/if}
</Content>
