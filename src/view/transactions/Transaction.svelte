<script lang="ts">
    import type { NanoTransaction } from "../../machinery/models";
    import {rawToNano, truncateNanoAddress} from "../../machinery/nanocurrency-web-wrapper";

    export let transaction: NanoTransaction
</script>
<div>
    <span data-l10n-id={transactionType()}></span>
    {rawToNano(transaction.amount, 6).amount}
    <span data-l10n-id={direction()}></span>
    {truncateNanoAddress(transaction.account)}
</div>
