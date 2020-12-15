<script lang="ts">
    import Seperator from "../../components/Seperator.svelte";
    import LabelledInput from "../../components/LabelledInput.svelte";
    import type {NanoWallet} from "../../machinery/models";
    import type {WalletResult} from "../../machinery/wallet";
    import {createWallet } from "../../machinery/wallet";
    import {clearState, popState, pushMenu, pushToast} from "../../machinery/eventListener";
    import { softwareKeysStore } from "../../stores/stores";
    import LabelledLoader from "../../components/LabelledLoader.svelte";
    import {beforeUpdate} from "svelte";

    export let walletResult: WalletResult
    export let alias: string

    let storing: boolean = false;
    let inputPhrase: string | undefined;

    const inputPassword = (event) => {
        inputPhrase = event.target.value;
    }

    const tryToStore = async () => {
        storing = true;
        if(inputPhrase === undefined || inputPhrase.length < 4) {
            pushToast({ languageId: 'onboard-validation-short-input'})
        } else {
            const storedWallet: NanoWallet | undefined = await createWallet(walletResult, inputPhrase, alias)
            if (storedWallet) {
                clearState()
                pushMenu('unlock')
            } else {
                pushToast({ languageId: 'onboard-store-wallet-failed' })
            }
        }
        storing = false;
    }

    beforeUpdate(() => {
        softwareKeysStore.set({
            middleKey: {
                languageId: 'onboard-finish-button',
                onClick: tryToStore
            },
            leftKey: {
                languageId: 'onboard-button-back',
                onClick: () => popState()
            },
            rightKey: undefined
        })
    })

</script>

{#if storing}
    <LabelledLoader languageId="storing-wallet" />
{:else}
    <Seperator languageId="wallet-password" />
    <LabelledInput type="number" on:input={inputPassword} languageId="onboard-wallet-pin"/>
{/if}
