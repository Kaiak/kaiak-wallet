<script lang="ts">
    import {afterUpdate} from "svelte";
    import {navigationReload, pushOnboardState, pushToast} from "../../machinery/eventListener";
    import {load} from "../../machinery/loader-store";
    import {BIP39_SEED_LENGTH, importWalletFromSeed, NANO_SEED_LENGTH} from "../../machinery/wallet";
    import type {WalletResult} from "../../machinery/wallet";
    import Text from "../../components/Text.svelte";
    import TextArea from "../../components/input/TextArea.svelte";
    import Seperator from "../../components/Seperator.svelte";

    export let seedInputValue: string;

    const isValidInput = () => {
        const seedLength = seedInputValue.length;
        return seedLength === BIP39_SEED_LENGTH || seedLength === NANO_SEED_LENGTH
    }
    // $: characterCount = `${seedInputValue ? seedInputValue.length : "0"}/${MAX_SEED_LENGTH}`

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
                    onError: () => {
                        pushToast({languageId: 'invalid-seed', type: 'warn'})
                        pushOnboardState({view: 'input-import', attemptedSeedImport: seedInputValue})
                    }
                })
            }
        },
    }))

    const onInput = (event) => {
        const nextValue = event.target.value;
        seedInputValue = nextValue;
    }
</script>

<Seperator languageId="onboard-keyboard-seed-title"/>
<Text languageId="import-from-seed-text"/>
<TextArea languageId="import-from-seed" on:input={onInput} value={seedInputValue}/>
