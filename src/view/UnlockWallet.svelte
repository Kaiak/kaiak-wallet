<script lang="ts">
    import Content from "../components/Content.svelte";
    import {
        navigationReload, pushMenu,
        pushOnboardState,
        pushState,
        pushToast
    } from "../machinery/eventListener";
    import type {NanoWallet} from "../machinery/models";
    import {unlockWallet} from "../machinery/secure-storage";
    import {afterUpdate, onMount} from "svelte";
    import {setWalletState} from "../machinery/WalletState";
    import {load} from "../machinery/loader-store";
    import NumberInput from "../components/input/NumberInput.svelte";
    import {setSoftwareKeys} from "../machinery/SoftwareKeysState";

    let inputPhrase: string | undefined;

    const unlock = async () => {
        await load({
            languageId: 'unlocking-wallet',
            load: async () => {
                const data: NanoWallet | undefined = await unlockWallet(inputPhrase)
                if (data) {
                    pushState({menu: 'accounts', accountAction: undefined, onboardState: undefined})
                    setWalletState({wallet: data, account: undefined})
                } else {
                    pushToast({languageId: 'wrong-pin'})
                }
            }
        })
    }

    const softwareKeys = (disabledUnlock) => {
        return {
            leftKey: {
                onClick: async () => pushOnboardState({ view: undefined }),
                languageId: 'create-new-wallet'
            },
            middleKey: {
                disabled: disabledUnlock,
                onClick: unlock,
                languageId: 'unlock-wallet'
            },
            rightKey: {
                onClick: async () => pushMenu('about'),
                languageId: 'about'
            },
        }
    }
    $: {
        const valid = inputPhrase && inputPhrase.length >= 4
        setSoftwareKeys(softwareKeys(!valid))
    }

    onMount(() => navigationReload(softwareKeys(true)))
</script>

<Content titleKey="unlock-wallet">
    <NumberInput languageId="unlock-label" placeholderLanguage="unlock-label" bind:value={inputPhrase}/>
</Content>
