<script lang="ts">
    import type {NanoAccount} from "../../machinery/models";
    import Seperator from "../../components/Seperator.svelte";
    import LabelledInput from "../../components/LabelledInput.svelte";
    import Button from "../../components/Button.svelte";

    export let account: NanoAccount;
    export let storeFunction: () => void

    let aliasValue: string = account?.alias

    const setAlias = (event) => {
        console.log(account)
        aliasValue = event.target.value;
    }

    const save = async () => {
        account.alias = aliasValue
        storeFunction()
    }

</script>

<Seperator languageId="account-settings" />
<LabelledInput languageId="account-alias" on:change={setAlias} bind:value={aliasValue}></LabelledInput>
<Button languageId="save-button" on:click={save}></Button>
