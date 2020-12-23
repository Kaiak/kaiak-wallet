<script lang="ts">
    import Text from "../../components/Text.svelte";
    import {onMount} from "svelte";
    import {back, pushOnboardState} from "../../machinery/eventListener";
    import Seperator from "../../components/Seperator.svelte";
    import {generateWallet} from "../../machinery/wallet";
    import type {WalletResult} from "../../machinery/wallet";
    import {load} from "../../machinery/loader-store";
    import {setSoftwareKeys} from "../../machinery/SoftwareKeysState";

    onMount(() => {
        setSoftwareKeys({
            middleKey: {
                languageId: 'onboard-disclaimer-ok',
                onClick: async () => {
                    await load({
                       languageId: 'creating-wallet',
                       load: async () => {
                           const walletResult: WalletResult = await generateWallet()
                           pushOnboardState({ view: 'seed', walletResult: walletResult, alias: undefined})
                       }
                    })
                }
            },
            leftKey: {
                languageId: 'onboard-button-back',
                onClick: async () => {
                    back()
                }
            },
            rightKey: undefined
        })
    })
</script>

<Seperator languageId="onboard-seed-title" />
<Text languageId="onboard-disclaimer-text"/>
