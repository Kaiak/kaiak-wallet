<script lang="ts">
    import {onMount} from "svelte";
    import {resolveHistory} from "../machinery/nano-rpc";
    import Transaction from "./transactions/Transaction.svelte";
    import List from "../components/List.svelte";
    import ListItem from "../components/list/ListItem.svelte";
    import type {NanoAddress, NanoTransaction} from "../machinery/models";

    export let address: NanoAddress = "nano_3rw4un6ys57hrb39sy1qx8qy5wukst1iiponztrz9qiz6qqa55kxzx4491or"

    let history: NanoTransaction[] = []
    let errorLoading: boolean = false

    onMount(async () => {
        try {
            history = await resolveHistory(address)
        } catch (error) {
            errorLoading = true
        }
    })

    let selected: NanoTransaction | undefined = undefined

    const setSelected = (time) => {
        selected = history.filter(h => h.localTimestamp === time)[0]
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
