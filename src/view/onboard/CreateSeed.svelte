<script lang="ts">
    import Text from "../../components/Text.svelte";
    import {afterUpdate} from "svelte";
    import type {WalletResult} from "../../machinery/wallet";
    import Seperator from "../../components/Seperator.svelte";
    import {back, navigationReload, pushOnboardState} from "../../machinery/eventListener";

    export let walletResult: WalletResult;

    afterUpdate(() => navigationReload({
            middleKey: {
                languageId: 'onboard-seed-stored',
                onClick: async () => {
                    pushOnboardState( {view: 'account', walletResult: walletResult, alias: undefined })
                }
            },
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
<Text breakAll=true>{walletResult.seed}</Text>
