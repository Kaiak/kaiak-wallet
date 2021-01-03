<script lang="ts">
    import Text from "../../components/Text.svelte";
    import {afterUpdate} from "svelte";
    import {navigationReload, pushOnboardState} from "../../machinery/eventListener";
    import Seperator from "../../components/Seperator.svelte";
    import {generateWallet} from "../../machinery/wallet";
    import type {WalletResult} from "../../machinery/wallet";
    import {load} from "../../machinery/loader-store";

    afterUpdate(() => navigationReload({
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
    }))
</script>

<Seperator languageId="onboard-seed-title" />
<Text languageId="onboard-disclaimer-text"/>
