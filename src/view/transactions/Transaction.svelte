<script lang="ts">
    import type { NanoTransaction } from "../../machinery/models";

    export let transaction: NanoTransaction

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
</script>
<div>
    <span data-l10n-id={transactionType()}></span>
    {transaction.amount.amount}
    <span data-l10n-id="transaction-from"></span>
    {transaction.account}
</div>
