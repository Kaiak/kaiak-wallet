<script lang="ts">
    import Content from "../components/Content.svelte";
    import LabelledInput from "../components/LabelledInput.svelte";
    import {clearState, pushMenu, pushState, pushToast} from "../machinery/eventListener";
    import type {NanoWallet} from "../machinery/models";
    import {unlockWallet} from "../machinery/secure-storage";
    import LabelledLoader from "../components/LabelledLoader.svelte";
    import {onMount} from "svelte";
    import {softwareKeysStore} from "../stores/stores";
    import {clearSoftwareKeys, setSoftwareKeys} from "../machinery/SoftwareKeysState";
    import type {SoftwareKeysState} from "../machinery/SoftwareKeysState";

    let inputPhrase: string | undefined;
    let showLoader: boolean = false;

    const onInputPassword = (event) => {
        inputPhrase = event.target.value;
    }

    const unlock = async () => {
        clearSoftwareKeys();
        showLoader = true;
        const data: NanoWallet | undefined = await unlockWallet(inputPhrase)
        if(data) {
            clearState()
            pushState({menu: 'wallet', wallet: data, account: undefined, onboardState: undefined})
        } else {
            pushToast({ languageId: 'wrong-pass' })
            setSoftwareKeys(softwareKeys)
        }
        showLoader = false;
    }

    const softwareKeys: SoftwareKeysState = {
        leftKey: {
            onClick: () => pushMenu('onboard'),
            languageId: 'create-new-wallet'
        },
        middleKey: {
            onClick: unlock,
            languageId: 'unlock-wallet'
        },
        rightKey: undefined
    }

    onMount(() => setSoftwareKeys(softwareKeys))

</script>

<Content titleKey="unlock-wallet">
    {#if !showLoader}
        <LabelledInput type="number" languageId="unlock-label" placeholderLanguage="unlock-label" on:input={onInputPassword}/>
    {:else}
        <LabelledLoader languageId="unlocking-wallet"/>
    {/if}
</Content>
