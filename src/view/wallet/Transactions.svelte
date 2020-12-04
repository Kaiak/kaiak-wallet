<script lang="ts">
    import {onMount} from "svelte";
    import Transaction from "../transactions/Transaction.svelte";
    import List from "../../components/List.svelte";
    import ListItem from "../../components/list/ListItem.svelte";
    import type {NanoAddress, NanoTransaction} from "../../machinery/models";
    import type {NavigationState} from "../../machinery/NavigationState";
    import {navigationStore} from "../../stores/stores";
    import {pushState} from "../../machinery/eventListener";
    import {resolveHistory} from "../../machinery/nano-rpc-fetch-wrapper";

    export let address: NanoAddress

    let history: NanoTransaction[] = []
    let errorLoading: boolean = false

    let state: NavigationState
    let selected: NanoTransaction | undefined = undefined

    navigationStore.subscribe(value => {
        state = value
        selected = state.account?.selectedTransaction
    })

    onMount(async () => {
        try {
            history = await resolveHistory(address)
        } catch (error) {
            errorLoading = true
        }
    })

    const setSelected = (time) => {
        const selectedTransaction: NanoTransaction | undefined = history.filter(h => h.localTimestamp === time)[0]
        pushState({...state, account: {...state.account, selectedTransaction: selectedTransaction}})
    }
</script>

<div>
    {#if selected}
        <div>{selected.localTimestamp}</div>
    {:else if history.length > 0}
        <List>
            {#each history as transaction}
                <ListItem on:click={() => setSelected(transaction.localTimestamp)}><Transaction transaction={transaction}/></ListItem>
            {/each}
        </List>
    {:else if errorLoading}
        unable to load transactions
    {:else}
        loading history
    {/if}

</div>
