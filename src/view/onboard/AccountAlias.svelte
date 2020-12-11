<script lang="ts">
    import Seperator from "../../components/Seperator.svelte";
    import Text from "../../components/Text.svelte";
    import LabelledInput from "../../components/LabelledInput.svelte";
    import {navigationStore, softwareKeysStore} from "../../stores/stores";
    import {popState, pushOnboardState} from "../../machinery/eventListener";
    import {onMount} from "svelte";
    import type {WalletResult} from "../../machinery/wallet";

    export let walletResult: WalletResult

    let accountAlias: string

    const changeAlias = (event) => {
        accountAlias = event.target.value
    }

    const setAlias = () => {
        if(accountAlias.length > 3) {
            pushOnboardState( {view: 'pin', walletResult: walletResult, alias: accountAlias })
        } else {
            // TODO: Toast
        }
    }

    onMount(() => {
        softwareKeysStore.set({
            middleKey: {
                languageId: 'onboard-set-alias-button',
                onClick: setAlias
            },
            leftKey: {
                languageId: 'onboard-button-back',
                onClick: () => popState()
            }
        })
    })

</script>
<Seperator languageId="onboard-set-alias"/>
<Text languageId="onboard-set-alias-text"></Text>
<LabelledInput languageId="account-alias" on:change={changeAlias}/>
