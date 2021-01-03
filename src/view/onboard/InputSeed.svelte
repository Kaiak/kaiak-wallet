<script lang="ts">
    import {afterUpdate} from "svelte";
    import {navigationReload, pushOnboardState, pushToast} from "../../machinery/eventListener";
    import {load} from "../../machinery/loader-store";
    import {importWalletFromSeed} from "../../machinery/wallet";
    import type {WalletResult} from "../../machinery/wallet";
    import Text from "../../components/Text.svelte";
    import TextArea from "../../components/input/TextArea.svelte";

    export let seedInputValue: string;

    const MAX_SEED_LENGTH = 64;

    const isValidInput = () => {
        return seedInputValue.length === 64
    }
    $: characterCount = `${seedInputValue ? seedInputValue.length : "0"}/${MAX_SEED_LENGTH}`

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
                        pushOnboardState({view: 'account', walletResult: walletResult, alias: undefined })
                    },
                    onError: () => {
                        pushToast({languageId: 'invalid-seed', type: 'warn'})
                        pushOnboardState({ view: 'input-import', attemptedSeedImport: seedInputValue })
                    }
                })
            }
        },
    }))

    const onInput = (event) => {
        const nextValue = event.target.value;
        if(nextValue.length <= MAX_SEED_LENGTH) {
            seedInputValue = nextValue;
        } else {
            pushToast({languageId: 'seed-max-length', type: 'warn'})
        }
    }
</script>

<TextArea languageId="import-from-seed" on:input={onInput} value={seedInputValue}/>
<Text>{characterCount}</Text>
