<script lang="ts">
    import Text from "../../components/Text.svelte";
    import {afterUpdate} from "svelte";
    import type {WalletResult} from "../../machinery/wallet";
    import Seperator from "../../components/Seperator.svelte";
    import {back, navigationReload, pushOnboardState} from "../../machinery/eventListener";
    import {setSoftwareKeys} from "../../machinery/SoftwareKeysState";

    export let walletResult: WalletResult;

    const seedStringGotFocus = () => {
        setSoftwareKeys({
            leftKey: {
                languageId: 'onboard-button-back',
                onClick: async () => {
                    back()
                }
            },
            middleKey: {
                languageId: 'onboard-seed-stored',
                onClick: async () => {
                    pushOnboardState( {view: 'account', walletResult: walletResult, alias: undefined })
                }
            }
        })
    }

    afterUpdate(() => navigationReload({
            leftKey: {
                languageId: 'onboard-button-back',
                onClick: async () => {
                    back()
                }
            },
        })
    )
</script>

<Seperator languageId="wallet-mnemonic"/>
<Text>{walletResult.mnemonic}</Text>
<Seperator languageId="wallet-seed" />
<Text breakAll={true} on:focus={seedStringGotFocus}>{walletResult.seed}</Text>
