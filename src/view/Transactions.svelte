<script lang="ts">
    import {onMount} from "svelte";
    import {resolveHistory} from "../machinery/nano-rpc";
    import type {AccountHistoryResponse} from "nano-rpc-fetch";

    const arbitraryAccount = "nano_1ninja7rh37ehfp9utkor5ixmxyg8kme8fnzc4zty145ibch8kf5jwpnzr3r"
    let history: AccountHistoryResponse | undefined = undefined
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
    {#if history}
    {:else if errorLoading}
        unable to load transactions
    {:else}
        loading history
    {/if}
</div>
