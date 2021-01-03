<script lang="ts">
    import {afterUpdate} from "svelte";
    import {navigationReload, pushImportState, pushOnboardState} from "../../machinery/eventListener";
    import {BACK_BUTTON} from "../../machinery/SoftwareKeysState";
    import LabelledInput from "../../components/LabelledInput.svelte";
    import {load} from "../../machinery/loader-store";
    import {importWalletFromSeed} from "../../machinery/wallet";
    import type {WalletResult} from "../../machinery/wallet";

    let seedInputValue = undefined;

    afterUpdate(() => navigationReload({
        middleKey: {
            languageId: 'import-wallet',
            onClick: async () => {
                pushImportState({view: 'input'})
                await load({
                    languageId: 'creating-wallet',
                    load: async () => {
                        const walletResult: WalletResult = await importWalletFromSeed(seedInputValue)
                        pushOnboardState({ view: 'account', walletResult: walletResult, alias: undefined})
                    }
                })
            }
        },
        leftKey: BACK_BUTTON,
    }))

    const onInput = (event) => {
        seedInputValue = event.target.value;
    }
</script>

<LabelledInput languageId="import-from-seed" on:input={onInput}/>
