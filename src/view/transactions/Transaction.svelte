<script lang="ts">
    import type { NanoTransaction } from "../../machinery/nano-rpc";

    export let transaction: NanoTransaction
</script>

{#if transaction.type === 'receive'}
    <span data-l10n-id="transaction-received"></span>
{:else}
    <span data-l10n-id="transaction-sent"></span>
{/if}
{transaction.amount}
<span data-l10n-id="transaction-from"></span>
{transaction.account}
