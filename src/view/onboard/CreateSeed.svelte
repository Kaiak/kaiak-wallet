<script lang="ts">
    import Text from "../../components/Text.svelte";
    import {onMount} from "svelte";
    import type {WalletResult} from "../../machinery/wallet";
    import {generateWallet} from "../../machinery/wallet";
    import Seperator from "../../components/Seperator.svelte";
    import {popState, pushOnboardState} from "../../machinery/eventListener";
    import LabelledLoader from "../../components/LabelledLoader.svelte";
    import {clearSoftwareKeys, setSoftwareKeys} from "../../machinery/SoftwareKeysState";

    let createWallet: boolean = true;
    let walletResult: WalletResult | undefined

    onMount(async () => {
        clearSoftwareKeys()
        walletResult = await generateWallet()
        setSoftwareKeys({
            middleKey: {
                languageId: 'onboard-seed-stored',
                onClick: () => {
                    pushOnboardState( {view: 'account', walletResult: walletResult, alias: undefined })
                }
            },
            leftKey: {
                languageId: 'onboard-button-back',
                onClick: () => popState()
            },
            rightKey: undefined
        })
    })
</script>

{#if walletResult}
    <Seperator languageId="wallet-mnemonic"/>
    <Text>{walletResult.mnemonic}</Text>
    <Seperator languageId="wallet-seed" />
    <Text breakAll=true>{walletResult.seed}</Text>
{:else}
    <LabelledLoader languageId="creating-wallet" />
{/if}

