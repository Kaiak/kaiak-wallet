<script lang="ts">
    import {onMount} from "svelte";
    import {resolveHistory} from "../machinery/nano-rpc";
    import type {NanoTransaction} from "../machinery/nano-rpc";
    import type {AccountHistoryResponse} from "nano-rpc-fetch";
    import Transaction from "./transactions/Transaction.svelte";

    const arbitraryAccount = "nano_1ninja7rh37ehfp9utkor5ixmxyg8kme8fnzc4zty145ibch8kf5jwpnzr3r"
    let history: NanoTransaction[] = []
    let errorLoading: boolean = false

    onMount(async () => {
        try {
            history = await resolveHistory(arbitraryAccount)
            console.log(history)
        } catch (error) {
            errorLoading = true
        }
    })
</script>

<div>
    {#if history.length > 0}
        {#each history as transaction}
            <Transaction transaction={transaction} />
        {/each}
    {:else if errorLoading}
        unable to load transactions
    {:else}
        loading history
    {/if}
</div>
