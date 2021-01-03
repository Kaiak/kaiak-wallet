<script lang="ts">
    import {afterUpdate} from "svelte";
    import {navigationReload, pushOnboardState, pushToast} from "../../machinery/eventListener";
    import {BACK_BUTTON} from "../../machinery/SoftwareKeysState";
    import {load} from "../../machinery/loader-store";
    import {importWalletFromSeed} from "../../machinery/wallet";
    import type {WalletResult} from "../../machinery/wallet";
    import TextInput from "../../components/input/TextInput.svelte";

    let seedInputValue = undefined;

    const isValidInput = () => {
        return seedInputValue.length === 64
    }

    afterUpdate(() => navigationReload({
        middleKey: {
            languageId: 'import-wallet',
            onClick: async () => {
                if (!isValidInput()) {
                    pushToast({languageId: 'invalid-seed-length', type: 'info'})
                    return;
                }
                await load({
                    languageId: 'creating-wallet',
                    load: async () => {
                        const walletResult: WalletResult = await importWalletFromSeed(seedInputValue)
                        pushToast({languageId: 'import-success', type: 'success'})
                        pushOnboardState({view: 'account', walletResult: walletResult, alias: undefined})
                    },
                    onError: () => pushToast({languageId: 'invalid-seed', type: 'warn'})
                })
            }
        },
        leftKey: BACK_BUTTON,
    }))

    const onInput = (event) => {
        seedInputValue = event.target.value;
    }
</script>

<TextInput languageId="import-from-seed" on:input={onInput}/>
