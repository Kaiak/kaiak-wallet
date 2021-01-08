<script lang="ts">
    import Content from "../components/Content.svelte";
    import {
        navigationReload,
        pushOnboardState,
        pushState,
        pushToast
    } from "../machinery/eventListener";
    import type {NanoWallet} from "../machinery/models";
    import {unlockWallet} from "../machinery/secure-storage";
    import {afterUpdate} from "svelte";
    import {setWalletState} from "../machinery/WalletState";
    import {load} from "../machinery/loader-store";
    import NumberInput from "../components/input/NumberInput.svelte";
    import {setSoftwareKeys} from "../machinery/SoftwareKeysState";

    let inputPhrase: string | undefined;

    const onInputPassword = (event) => {
        inputPhrase = event.target.value;
        const valid = inputPhrase && inputPhrase.length >= 4
        setSoftwareKeys(softwareKeys(!valid))
    }

    const unlock = async () => {
        await load({
            languageId: 'unlocking-wallet',
            load: async () => {
                const data: NanoWallet | undefined = await unlockWallet(inputPhrase)
                if (data) {
                    pushState({menu: 'accounts', accountAction: undefined, onboardState: undefined})
                    setWalletState({wallet: data, account: undefined})
                } else {
                    pushToast({languageId: 'wrong-pass'})
                }
            }
        })
    }

    const softwareKeys = (disabledUnlock) => {
        return {
            middleKey: {
                disabled: disabledUnlock,
                onClick: unlock,
                languageId: 'unlock-wallet'
            },
            rightKey: {
                onClick: async () => pushOnboardState({ view: undefined }),
                languageId: 'create-new-wallet'
            },
        }
    }

    afterUpdate(() => navigationReload(softwareKeys(true)))
</script>

<Content titleKey="unlock-wallet">
    <NumberInput languageId="unlock-label" placeholderLanguage="unlock-label" on:input={onInputPassword}/>
</Content>
