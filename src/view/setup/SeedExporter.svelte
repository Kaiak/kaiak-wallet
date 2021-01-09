<script lang="ts">
    import Text from "../../components/Text.svelte";
    import NumberInput from "../../components/input/NumberInput.svelte";
    import {clearSoftwareKeys, setSoftwareKeys} from "../../machinery/SoftwareKeysState";
    import {navigationReload, pushToast} from "../../machinery/eventListener";
    import {onMount} from "svelte";
    import type {NanoWallet} from "../../machinery/models";
    import {unlockWallet} from "../../machinery/secure-storage";
    import Seperator from "../../components/Seperator.svelte";

    let inputPhrase: string | undefined;
    let seed: string | undefined

    const showSeed = async () => {
        try {
            const data: NanoWallet | undefined = await unlockWallet(inputPhrase)
            seed = data.seed;
            clearSoftwareKeys();
        } catch (e) {
            pushToast({languageId: 'wrong-pin', type: "info"})
        }
    }

    const softwareKeys = (disabledUnlock) => {
        return {
            middleKey: {
                disabled: disabledUnlock,
                onClick: showSeed,
                languageId: 'unlock-wallet'
            },
        }
    }
    $: {
        const valid = inputPhrase && inputPhrase.length >= 4
        setSoftwareKeys(softwareKeys(!valid))
    }

    onMount(() => navigationReload(softwareKeys(true)))

</script>

<Text languageId="seed-export-text"/>
{#if seed}
    <Seperator languageId="wallet-seed" />
    <Text breakAll={true}>{seed}</Text>
{:else}
    <NumberInput languageId="unlock-label" placeholderLanguage="unlock-label" bind:value={inputPhrase}/>
{/if}
