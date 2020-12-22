<script lang="ts">
    import Content from "../components/Content.svelte";
    import LabelledInput from "../components/LabelledInput.svelte";
    import {navigationReload, pushMenu, pushState, pushToast} from "../machinery/eventListener";
    import type {NanoWallet} from "../machinery/models";
    import {unlockWallet} from "../machinery/secure-storage";
    import {afterUpdate} from "svelte";
    import {clearSoftwareKeys, setSoftwareKeys} from "../machinery/SoftwareKeysState";
    import type {SoftwareKeysState} from "../machinery/SoftwareKeysState";
    import {setWalletState} from "../machinery/WalletState";
    import {load} from "../machinery/loader-store";
    import {updateWalletAccounts} from "../machinery/nano-ops";

    let inputPhrase: string | undefined;
    let showLoader: boolean = false;

    const onInputPassword = (event) => {
        inputPhrase = event.target.value;
    }

    const tryGetTransactions = async (data: NanoWallet) => {
        try {
            return await updateWalletAccounts(data)
        } catch (e) {
            return data;
        }
    }

    const unlock = async () => {
        await load({
            languageId: 'unlocking-wallet',
            load: async () => {
                const data: NanoWallet | undefined = await unlockWallet(inputPhrase)
                const updatedNanoWallet: NanoWallet = await tryGetTransactions(data)
                if(updatedNanoWallet) {
                    pushState({menu: 'wallet', accountAction: undefined, onboardState: undefined})
                    setWalletState({ wallet: updatedNanoWallet, selectedAccount: undefined })
                } else {
                    pushToast({ languageId: 'wrong-pass' })
                }
            }
        })
    }

    const softwareKeys: SoftwareKeysState = {
        leftKey: {
            onClick: async () => pushMenu('onboard'),
            languageId: 'create-new-wallet'
        },
        middleKey: {
            onClick: unlock,
            languageId: 'unlock-wallet'
        },
        rightKey: undefined
    }

    afterUpdate(() => {
        setSoftwareKeys(softwareKeys)
        navigationReload();
    })
</script>

<Content titleKey="unlock-wallet">
    <LabelledInput type="number" languageId="unlock-label" placeholderLanguage="unlock-label" on:input={onInputPassword}/>
</Content>
