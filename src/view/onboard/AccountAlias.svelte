<script lang="ts">
    import Seperator from "../../components/Seperator.svelte";
    import Text from "../../components/Text.svelte";
    import {navigationReload, pushOnboardState, pushToast} from "../../machinery/eventListener";
    import {afterUpdate} from "svelte";
    import type {WalletResult} from "../../machinery/wallet";
    import {BACK_BUTTON} from "../../machinery/SoftwareKeysState";
    import TextInput from "../../components/input/TextInput.svelte";

    export let walletResult: WalletResult

    let accountAlias: string

    const changeAlias = (event) => {
        accountAlias = event.target.value
    }

    const setAlias = async () => {
        if (accountAlias === undefined || accountAlias.length < 3) {
            pushToast({languageId: "onboard-validation-short-alias"})
        } else {
            pushOnboardState({view: 'pin', walletResult: walletResult, alias: accountAlias})
        }
    }

    afterUpdate(() => navigationReload({
        middleKey: {
            languageId: 'onboard-set-alias-button',
            onClick: setAlias
        },
        leftKey: BACK_BUTTON,
    }))
</script>
<Seperator languageId="onboard-set-alias"/>
<Text languageId="onboard-set-alias-text"/>
<TextInput languageId="account-alias" on:input={changeAlias}/>
