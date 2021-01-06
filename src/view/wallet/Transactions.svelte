<script lang="ts">
    import Transaction from "../transactions/Transaction.svelte";
    import List from "../../components/List.svelte";
    import ListItem from "../../components/list/ListItem.svelte";
    import type {NanoTransaction} from "../../machinery/models";

    export let transactions: NanoTransaction[]
    let selected: NanoTransaction | undefined = undefined

    const setSelected = (time) => {
        // const selectedTransaction: NanoTransaction | undefined = history.filter(h => h.localTimestamp === time)[0]
        // pushState({...state, account: {...state.account, selectedTransaction: selectedTransaction}})
    }
</script>

{#if selected}
    <div>{selected.localTimestamp}</div>
{:else if transactions.length > 0}
    <List>
        {#each transactions as transaction}
            <ListItem on:click={() => setSelected(transaction.localTimestamp)}><Transaction transaction={transaction}/></ListItem>
        {/each}
    </List>
{:else}
    <div data-l10n-id="no-transactions"></div>
{/if}
