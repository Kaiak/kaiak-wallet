<script lang="ts">
    import {onMount} from "svelte";
    import {resolveHistory} from "../machinery/nano-rpc";
    import type {NanoTransaction} from "../machinery/nano-rpc";
    import type {AccountHistoryResponse} from "nano-rpc-fetch";
    import Transaction from "./transactions/Transaction.svelte";
    import List from "../components/List.svelte";
    import Primary from "../components/list/Primary.svelte";
    import ListItem from "../components/list/ListItem.svelte";

    const arbitraryAccount = "nano_1ninja7rh37ehfp9utkor5ixmxyg8kme8fnzc4zty145ibch8kf5jwpnzr3r"
    let history: NanoTransaction[] = []
    let errorLoading: boolean = false

    onMount(async () => {
        try {
            history = await resolveHistory(arbitraryAccount)
        } catch (error) {
            errorLoading = true
        }
    })
</script>

<div>
    {#if history.length > 0}
        <List>
        {#each history as transaction}
            <ListItem><Transaction transaction={transaction} /></ListItem>
        {/each}
        </List>
    {:else if errorLoading}
        unable to load transactions
    {:else}
        loading history
    {/if}
</div>
