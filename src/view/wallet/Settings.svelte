<script lang="ts">
    import type {NanoAccount, NanoWallet} from "../../machinery/models";
    import Seperator from "../../components/Seperator.svelte";
    import LabelledInput from "../../components/LabelledInput.svelte";
    import {setWallet} from "../../machinery/secure-storage";
    import {setWalletState} from "../../machinery/WalletState";
    import {back, navigationReload} from "../../machinery/eventListener";
    import {afterUpdate} from "svelte";
    import {BACK_BUTTON} from "../../machinery/SoftwareKeysState";

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
            back()
        } // TODO: Toast
    }

    afterUpdate(() => navigationReload({
        middleKey: {
            languageId: 'button-save',
            onClick: save
        }
    }));

</script>

<Seperator languageId="account-settings" />
<LabelledInput languageId="account-alias" on:input={setAlias} bind:value={aliasValue}/>
