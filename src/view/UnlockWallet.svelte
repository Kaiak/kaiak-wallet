<script lang="ts">
    import Content from "../components/Content.svelte";
    import LabelledInput from "../components/LabelledInput.svelte";
    import Button from "../components/Button.svelte";
    import {pushMenu, pushState} from "../machinery/eventListener";
    import type {NanoWallet} from "../machinery/models";
    import {unlockWallet} from "../machinery/secure-storage";

    let inputPhrase: string | undefined;

    const onInputPassword = (event) => {
        inputPhrase = event.target.value;
    }

    const unlock = () => {
        const data: NanoWallet | undefined = unlockWallet(inputPhrase)
        if(data) {
            pushState({menu: 'wallet', wallet: data, account: undefined})
        }
    }

    const createNew = () => pushMenu('create')

</script>

<Content titleKey="unlock-wallet">
    <LabelledInput type="number" languageId="unlock-label" placeholderLanguage="unlock-label" on:change={onInputPassword}/>
    <Button languageId="unlock-wallet" on:click={unlock}/>
    <Button languageId="create-new-wallet" on:click={createNew} />
</Content>
