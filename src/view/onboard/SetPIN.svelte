<script lang="ts">
    import Seperator from "../../components/Seperator.svelte";
    import type {NanoWallet} from "../../machinery/models";
    import type {WalletResult} from "../../machinery/wallet";
    import {createWallet} from "../../machinery/wallet";
    import {navigationReload, pushMenu, pushToast, reset} from "../../machinery/eventListener";
    import {afterUpdate, onMount} from "svelte";
    import {load} from "../../machinery/loader-store";
    import NumberInput from "../../components/input/NumberInput.svelte";
    import Text from "../../components/Text.svelte";
    import {setSoftwareKeys} from "../../machinery/SoftwareKeysState";

    export let walletResult: WalletResult
    export let alias: string
    let inputPhrase: string | undefined;

    const createFinishKey = (disabled) => {
        return {
            middleKey: {
                disabled: disabled,
                languageId: 'onboard-finish-button',
                onClick: tryToStore,
            },
        }
    }
    $: valid = inputPhrase && inputPhrase.length >= 4
    $: {
        setSoftwareKeys(createFinishKey(!valid))
    }

    const tryToStore = async () => {
        await load({
            languageId: 'storing-wallet',
            load: async () => {
                const storedWallet: NanoWallet | undefined = await createWallet(walletResult, inputPhrase, alias)
                if (storedWallet) {
                    reset();
                    pushMenu('unlock')
                } else {
                    pushToast({languageId: 'onboard-store-wallet-failed'})
                }
            }
        })
    }

    onMount(() => navigationReload(createFinishKey(!valid)));
</script>

<Seperator languageId="wallet-password" />
<Text languageId="onboard-set-wallet-pin-text" />
<NumberInput languageId="onboard-wallet-pin" bind:value={inputPhrase}/>
