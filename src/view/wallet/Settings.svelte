<script lang="ts">
    import type {NanoAccount, NanoWallet} from "../../machinery/models";
    import Seperator from "../../components/Seperator.svelte";
    import {setWallet} from "../../machinery/secure-storage";
    import {setWalletState} from "../../machinery/WalletState";
    import {back, navigationReload} from "../../machinery/eventListener";
    import {afterUpdate} from "svelte";
    import TextInput from "../../components/input/TextInput.svelte";
    import Text from "../../components/Text.svelte";
    import Button from "../../components/Button.svelte";

    export let wallet: NanoWallet;
    export let selectedAccount: NanoAccount;

    let aliasValue: string = selectedAccount?.alias
    let setRepText: string = selectedAccount.representative ? 'change' : 'set'

    const setAlias = (event) => {
        aliasValue = event.target.value;
    }

    const save = async () => {
        selectedAccount.alias = aliasValue
        const updated: NanoWallet | undefined = await setWallet(wallet)
        if (updated) {
            setWalletState({wallet: updated, selectedAccount: selectedAccount?.address})
            back()
        } // TODO: Toast
    }

    const changeRep = () => {
        console.log('change reps')
    }

    afterUpdate(() => navigationReload({
        middleKey: {
            languageId: 'button-save',
            onClick: save
        }
    }));

</script>

<Seperator languageId="account-settings" />
<TextInput languageId="account-alias" on:input={setAlias} bind:value={aliasValue}/>
<Seperator languageId="set-representative" />
{#if selectedAccount.representative}
    <Text breakAll="true">{selectedAccount.representative}</Text>
{:else}
    <Text languageId="no-representative-set"/>
{/if}
<Button languageId={setRepText} on:click={changeRep} />
