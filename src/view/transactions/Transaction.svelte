<script lang="ts">
    import type { NanoTransaction } from "../../machinery/nano-rpc";

    export let transaction: NanoTransaction
    let expand: boolean = false

    const transactionType = () => {
        switch (transaction.type) {
            case 'receive':
                return "transaction-received"
            case 'send':
                return "transaction-sent"
            default:
                return "unknown"
        }
    }

    const onClick = () => {
        expand = !expand
    }
</script>
<div on:click={onClick}>
    <span data-l10n-id={transactionType()}></span>
    {transaction.amount}
    <span data-l10n-id="transaction-from"></span>
    {transaction.account}
    {#if expand}
        <div>
            {transaction.localTimestamp}
        </div>
    {/if}
</div>
