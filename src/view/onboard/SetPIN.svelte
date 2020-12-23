<script lang="ts">
    import Seperator from "../../components/Seperator.svelte";
    import LabelledInput from "../../components/LabelledInput.svelte";
    import type {NanoWallet} from "../../machinery/models";
    import type {WalletResult} from "../../machinery/wallet";
    import {createWallet } from "../../machinery/wallet";
    import {clearState, popState, pushMenu, pushToast} from "../../machinery/eventListener";
    import {onMount} from "svelte";
    import {setSoftwareKeys} from "../../machinery/SoftwareKeysState";
    import {load} from "../../machinery/loader-store";

    export let walletResult: WalletResult
    export let alias: string
    let inputPhrase: string | undefined;

    const inputPassword = (event) => {
        inputPhrase = event.target.value;
    }

    const tryToStore = async () => {
        await load({
            languageId: 'storing-wallet',
            load: async () => {
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
            }
        })
    }

    onMount(() => {
        setSoftwareKeys({
            middleKey: {
                languageId: 'onboard-finish-button',
                onClick: tryToStore
            },
            leftKey: {
                languageId: 'onboard-button-back',
                onClick: async () => { popState() }
            },
            rightKey: undefined
        })
    })

</script>

<Seperator languageId="wallet-password" />
<LabelledInput type="number" on:input={inputPassword} languageId="onboard-wallet-pin"/>
