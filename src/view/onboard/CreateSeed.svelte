<script lang="ts">
    import Text from "../../components/Text.svelte";
    import {afterUpdate} from "svelte";
    import type {WalletResult} from "../../machinery/wallet";
    import Seperator from "../../components/Seperator.svelte";
    import {navigationReload, pushOnboardState} from "../../machinery/eventListener";
    import {setSoftwareKeys} from "../../machinery/SoftwareKeysState";
    import Checkbox from "../../components/input/Checkbox.svelte";

    export let walletResult: WalletResult;

    const accept = (event) => {
        if(event.target.checked) {
            setSoftwareKeys({
                middleKey: {
                    languageId: 'continue',
                    onClick: async () => {
                        pushOnboardState({view: 'account', walletResult: walletResult, alias: undefined})
                    }
                }
            })
        } else {
            setSoftwareKeys({})
        }
    }

    afterUpdate(() => navigationReload())
</script>

<Seperator languageId="wallet-mnemonic"/>
<Text>{walletResult.mnemonic}</Text>
<Seperator languageId="wallet-seed" />
<Text breakAll={true}>{walletResult.seed}</Text>
<Seperator languageId="wallet-accept"/>
<Checkbox languageId="wallet-accept-text" on:change={accept}/>
