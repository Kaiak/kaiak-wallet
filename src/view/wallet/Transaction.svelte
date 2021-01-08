<script lang="ts">
    import type {NanoTransaction} from "../../machinery/models";
    import Seperator from "../../components/Seperator.svelte";
    import Text from "../../components/Text.svelte";
    import {rawToNano} from "../../machinery/nanocurrency-web-wrapper";
    import {transactionText} from "../../machinery/text-utils";
    import Primary from "../../components/list/Primary.svelte";
    import {transactionTime} from "../../machinery/text-utils";
    import {transactionReceived} from "../../machinery/text-utils";

    export let transaction: NanoTransaction
</script>
<Seperator languageId={transactionReceived(transaction)} />
<Text>{transactionTime(transaction)}</Text>
<Seperator languageId="transaction-details" />
<Text>{transactionText(transaction)}</Text>

