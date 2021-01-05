<script lang="ts">
    import Seperator from "../../components/Seperator.svelte";
    import Text from "../../components/Text.svelte";
    import {navigationReload, pushOnboardState, pushToast} from "../../machinery/eventListener";
    import {afterUpdate} from "svelte";
    import type {WalletResult} from "../../machinery/wallet";
    import TextInput from "../../components/input/TextInput.svelte";
    import {setSoftwareKeys} from "../../machinery/SoftwareKeysState";

    export let walletResult: WalletResult

    let accountAlias: string

    const changeAlias = (event) => {
        accountAlias = event.target.value
        if(accountAlias && accountAlias.length >= 3) {
            setSoftwareKeys(createAliasKey(false))
        }
    }

    const setAlias = async () => {
        pushOnboardState({view: 'pin', walletResult: walletResult, alias: accountAlias})
    }

    const createAliasKey = (disabled) => {
        return {
            middleKey: {
                disabled: disabled,
                languageId: 'onboard-set-alias-button',
                onClick: setAlias
            },
        }
    };
    afterUpdate(() => navigationReload(createAliasKey(true)))
</script>
<Seperator languageId="onboard-set-alias"/>
<Text languageId="onboard-set-alias-text"/>
<TextInput languageId="account-alias" on:input={changeAlias}/>
