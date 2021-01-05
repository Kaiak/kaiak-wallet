<script lang="ts">
    import Text from "../../components/Text.svelte";
    import NumberInput from "../../components/input/NumberInput.svelte";
    import {setSoftwareKeys} from "../../machinery/SoftwareKeysState";
    import {navigationReload, pushToast} from "../../machinery/eventListener";
    import {afterUpdate} from "svelte";
    import type {NanoWallet} from "../../machinery/models";
    import {unlockWallet} from "../../machinery/secure-storage";
    import Seperator from "../../components/Seperator.svelte";

    let inputPhrase: string | undefined;
    let seed: string | undefined

    const showSeed = async () => {
        try {
            const data: NanoWallet | undefined = await unlockWallet(inputPhrase)
            seed = data.seed;
        } catch (e) {
            pushToast({languageId: 'wrong-pass', type: "info"})
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

    const onInputPassword = (event) => {
        inputPhrase = event.target.value;
        const valid = inputPhrase && inputPhrase.length >= 4
        setSoftwareKeys(softwareKeys(!valid))
    }

    afterUpdate(() => navigationReload(softwareKeys(true)))

</script>

<Text languageId="seed-export-text"/>
{#if seed}
    <Seperator languageId="wallet-seed" />
    <Text breakAll={true}>{seed}</Text>
{:else}
    <NumberInput languageId="unlock-label" placeholderLanguage="unlock-label" on:input={onInputPassword}/>
{/if}
