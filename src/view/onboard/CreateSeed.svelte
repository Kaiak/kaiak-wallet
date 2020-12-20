<script lang="ts">
    import Text from "../../components/Text.svelte";
    import {onMount} from "svelte";
    import type {WalletResult} from "../../machinery/wallet";
    import Seperator from "../../components/Seperator.svelte";
    import {popState, pushOnboardState} from "../../machinery/eventListener";
    import {clearSoftwareKeys, setSoftwareKeys} from "../../machinery/SoftwareKeysState";

    export let walletResult: WalletResult;

    onMount(() => {
        setSoftwareKeys({
            middleKey: {
                languageId: 'onboard-seed-stored',
                onClick: async () => {
                    pushOnboardState( {view: 'account', walletResult: walletResult, alias: undefined })
                }
            },
            leftKey: {
                languageId: 'onboard-button-back',
                onClick: async () => {
                    popState()
                }
            },
            rightKey: undefined
        })
    })
</script>

<Seperator languageId="wallet-mnemonic"/>
<Text>{walletResult.mnemonic}</Text>
<Seperator languageId="wallet-seed" />
<Text breakAll=true>{walletResult.seed}</Text>
