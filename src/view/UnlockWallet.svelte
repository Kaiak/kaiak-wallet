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

    let inputPhrase: string | undefined;
    let showLoader: boolean = false;

    const onInputPassword = (event) => {
        inputPhrase = event.target.value;
    }

    const unlock = async () => {
        await load({
            languageId: 'unlocking-wallet',
            load: async () => {
                const data: NanoWallet | undefined = await unlockWallet(inputPhrase)
                if(data) {
                    clearSoftwareKeys()
                    pushState({menu: 'wallet', accountAction: undefined, onboardState: undefined})
                    setWalletState({ wallet: data, selectedAccount: undefined })
                } else {
                    pushToast({ languageId: 'wrong-pass' })
                    // setSoftwareKeys(softwareKeys)
                }
            }
        })
    }

    const softwareKeys: SoftwareKeysState = {
        leftKey: {
            onClick: () => pushMenu('onboard'),
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
