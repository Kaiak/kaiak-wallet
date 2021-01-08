<script lang="ts">
    import type {NanoTransaction} from "../../machinery/models";
    import Seperator from "../../components/Seperator.svelte";
    import Text from "../../components/Text.svelte";
    import {transactionText} from "../../machinery/text-utils";
    import {transactionTime} from "../../machinery/text-utils";
    import {transactionReceived} from "../../machinery/text-utils";
    import {afterUpdate} from "svelte";
    import {navigationReload, pushAccountAction} from "../../machinery/eventListener";

    export let transaction: NanoTransaction

    afterUpdate(() => {
        navigationReload({
            leftKey: {
                languageId: 'send-button',
                onClick: async () => {
                    pushAccountAction('send_address')
                }
            }
        })
    })
</script>
<Seperator languageId={transactionReceived(transaction)} />
<Text>{transactionTime(transaction)}</Text>
<Seperator languageId="transaction-details" />
<Text>{transactionText(transaction)}</Text>

