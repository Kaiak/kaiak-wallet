<script lang="ts">
    import type {NanoAccount, NanoWallet} from "../../machinery/models";
    import Seperator from "../../components/Seperator.svelte";
    import {setWallet} from "../../machinery/secure-storage";
    import {setWalletState} from "../../machinery/WalletState";
    import {back, navigationReload, pushToast} from "../../machinery/eventListener";
    import {afterUpdate} from "svelte";
    import TextInput from "../../components/input/TextInput.svelte";
    import Text from "../../components/Text.svelte";
    import TextArea from "../../components/input/TextArea.svelte";
    import {tools} from "nanocurrency-web";
    import {setRepresentative} from "../../machinery/nano-ops";

    export let wallet: NanoWallet;
    export let selectedAccount: NanoAccount;

    let aliasValue: string = selectedAccount?.alias
    let representativeValue: string = selectedAccount.representative

    const setAlias = (event) => {
        aliasValue = event.target.value;
    }

    const save = async () => {
        if(aliasValue < 3) {
            pushToast({languageId: 'onboard-alias-rule'})
            return;
        }
        if(!tools.validateAddress(representativeValue)) {
            pushToast({languageId: 'invalid-address'})
            return;
        }
        selectedAccount.alias = aliasValue
        await setRepresentative(selectedAccount, representativeValue)
        selectedAccount.representative = aliasValue;
        const updated: NanoWallet | undefined = await setWallet(wallet)
        if (updated) {
            setWalletState({wallet: updated, selectedAccount: selectedAccount?.address})
            back()
        } // TODO: Toast
    }

    const changeRep = (event) => {
        representativeValue = event.target.value;
    }

    afterUpdate(() => navigationReload({
        middleKey: {
            languageId: 'button-save',
            onClick: save
        }
    }));

</script>

<Seperator languageId="onboard-set-alias" />
<Text languageId="onboard-set-alias-text"/>
<TextInput languageId="account-alias" on:input={setAlias} bind:value={aliasValue}/>
<Seperator languageId="representative" />
<Text languageId="representative-text"/>
<TextArea languageId="set-representative" value={selectedAccount.representative} on:input={changeRep}/>
