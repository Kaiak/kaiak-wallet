<script lang="ts">
    import type { NanoTransaction } from "../../machinery/models";
    import {rawToNano, truncateNanoAddress} from "../../machinery/nanocurrency-web-wrapper";

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

    const direction = () => {
        switch (transaction.type) {
            case 'receive':
                return 'transaction-from';
            case 'send':
                return 'transaction-to';
            default:
                return 'unknown'
        }
    }
</script>
<div>
    <span data-l10n-id={transactionType()}></span>
    {rawToNano(transaction.amount, 6).amount}
    <span data-l10n-id={direction()}></span>
    {truncateNanoAddress(transaction.account)}
</div>
