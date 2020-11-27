<script lang="ts">
    import type { NanoTransaction } from "../../machinery/nano-rpc";

    export let transaction: NanoTransaction
</script>

<div>
    {transaction.account}
</div>
