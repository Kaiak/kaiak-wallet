<script lang="ts">
    import type {NanoAccount, NanoWallet} from "../../machinery/models";
    import Seperator from "../../components/Seperator.svelte";
    import LabelledInput from "../../components/LabelledInput.svelte";
    import Button from "../../components/Button.svelte";
    import {setWallet} from "../../machinery/secure-storage";
    import {setWalletState} from "../../machinery/WalletState";
    import {pushAccountAction} from "../../machinery/eventListener";

    export let wallet: NanoWallet;
    export let selectedAccount: NanoAccount;

    let aliasValue: string = selectedAccount?.alias

    const setAlias = (event) => {
        aliasValue = event.target.value;
    }

    const save = async () => {
        selectedAccount.alias = aliasValue
        const updated: NanoWallet | undefined = await setWallet(wallet)
        if (updated) {
            setWalletState({wallet: updated, selectedAccount: selectedAccount?.address})
            pushAccountAction('overview')
        } // TODO: Toast
    }

</script>

<Seperator languageId="account-settings" />
<LabelledInput languageId="account-alias" on:input={setAlias} bind:value={aliasValue}/>
<Button languageId="save-button" on:click={save}/>
