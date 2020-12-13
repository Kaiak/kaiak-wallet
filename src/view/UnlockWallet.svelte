<script lang="ts">
    import Content from "../components/Content.svelte";
    import LabelledInput from "../components/LabelledInput.svelte";
    import {clearState, pushMenu, pushState, pushToast} from "../machinery/eventListener";
    import type {NanoWallet} from "../machinery/models";
    import {unlockWallet} from "../machinery/secure-storage";
    import LabelledLoader from "../components/LabelledLoader.svelte";
    import {onMount} from "svelte";
    import { softwareKeysStore } from "../stores/stores";

    let inputPhrase: string | undefined;
    let showLoader: boolean = false;

    const onInputPassword = (event) => {
        inputPhrase = event.target.value;
    }

    const unlock = async () => {
        showLoader = true;
        const data: NanoWallet | undefined = await unlockWallet(inputPhrase)
        if(data) {
            clearState()
            pushState({menu: 'wallet', wallet: data, account: undefined, onboardState: undefined})
        } else {
            pushToast({ languageId: 'wrong-pass' })
        }
        showLoader = false;
    }

    onMount(() => {
        softwareKeysStore.set({
            leftKey: {
                onClick: () => pushMenu('onboard'),
                languageId: 'create-new-wallet'
            },
            middleKey: {
                onClick: unlock,
                languageId: 'unlock-wallet'
            },
            rightKey: undefined
        })
    })

</script>

<Content titleKey="unlock-wallet">
    {#if !showLoader}
        <LabelledInput type="number" languageId="unlock-label" placeholderLanguage="unlock-label" on:input={onInputPassword}/>
    {:else}
        <LabelledLoader languageId="unlocking-wallet"/>
    {/if}
</Content>
