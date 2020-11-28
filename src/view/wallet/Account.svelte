<script lang="ts">
    import type {NanoAccount} from "../../machinery/models";
    import Seperator from "../../components/Seperator.svelte";
    import List from "../../components/List.svelte";
    import Primary from "../../components/list/Primary.svelte";
    import Transactions from "../Transactions.svelte";
    import Send from "./Send.svelte";
    import Receive from "./Receive.svelte";

    export let account: NanoAccount

    type AccountAction = 'menu' | 'transactions' | 'send' | 'receive'
    let action: AccountAction | undefined = 'menu'

</script>

{#if action === 'menu'}
    <Seperator languageId="actions" primaryText={account.alias}/>
    <List>
        <Primary primaryLanguageId="transactions" on:click={() => action = 'transactions' }/>
        <Primary primaryLanguageId="send" on:click={() => action = 'send' }/>
        <Primary primaryLanguageId="receive" on:click={() => action = 'receive' }/>
    </List>
{:else if action === 'transactions'}
    <Seperator languageId="transactions" primaryText={account.alias}/>
    <Transactions address={account.address}/>
{:else if action === 'send'}
    <Send />
{:else if action === 'receive'}
    <Receive account={account} />
{/if}

