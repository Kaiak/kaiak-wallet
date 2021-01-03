<script lang="ts">
    import Text from "../../components/Text.svelte";
    import {afterUpdate} from "svelte";
    import type {WalletResult} from "../../machinery/wallet";
    import Seperator from "../../components/Seperator.svelte";
    import {navigationReload, pushOnboardState} from "../../machinery/eventListener";
    import {setSoftwareKeys} from "../../machinery/SoftwareKeysState";

    export let walletResult: WalletResult;

    const seedStringGotFocus = () => {
        setSoftwareKeys({
            middleKey: {
                languageId: 'onboard-seed-stored',
                onClick: async () => {
                    pushOnboardState( {view: 'account', walletResult: walletResult, alias: undefined })
                }
            }
        })
    }

    afterUpdate(() => navigationReload())
</script>

<Seperator languageId="wallet-mnemonic"/>
<Text>{walletResult.mnemonic}</Text>
<Seperator languageId="wallet-seed" />
<Text breakAll={true} on:focus={seedStringGotFocus}>{walletResult.seed}</Text>
