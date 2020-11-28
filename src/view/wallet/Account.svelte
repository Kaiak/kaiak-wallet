<script lang="ts">
    import type {NanoAccount} from "../../machinery/models";
    import Seperator from "../../components/Seperator.svelte";
    import List from "../../components/List.svelte";
    import Primary from "../../components/list/Primary.svelte";
    import Transactions from "../Transactions.svelte";
    import Send from "./Send.svelte";
    import Receive from "./Receive.svelte";
    import {backPressesStore} from "../../stores/stores";

    export let account: NanoAccount

    type AccountAction = 'menu' | 'transactions' | 'send' | 'receive'
    let action: AccountAction = 'menu'

    const selectAction = (selectedAction: AccountAction) => {
        backPressesStore.set(() => action = 'menu')
        action = selectedAction
    }

</script>

{#if action === 'menu'}
    <Seperator languageId="actions" primaryText={account.alias}/>
    <List>
        <Primary primaryLanguageId="transactions" on:click={() => selectAction('transactions') }/>
        <Primary primaryLanguageId="send" on:click={() => selectAction('send') }/>
        <Primary primaryLanguageId="receive" on:click={() => selectAction('receive') }/>
    </List>
{:else if action === 'transactions'}
    <Seperator languageId="transactions" primaryText={account.alias}/>
    <Transactions address={account.address}/>
{:else if action === 'send'}
    <Send />
{:else if action === 'receive'}
    <Receive account={account} />
{/if}

