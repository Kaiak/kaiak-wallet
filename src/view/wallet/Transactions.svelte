<script lang="ts">
    import List from "../../components/List.svelte";
    import type {NanoTransaction} from "../../machinery/models";
    import {afterUpdate} from "svelte";
    import {navigationReload} from "../../machinery/eventListener";
    import {getLanguage} from "../../machinery/language";
    import Primary from "../../components/list/Primary.svelte";
    import {rawToNano, truncateNanoAddress} from "../../machinery/nanocurrency-web-wrapper";
    import Text from "../../components/Text.svelte";

    export let transactions: NanoTransaction[]

    const transactionType = (transaction: NanoTransaction) => {
        switch (transaction.type) {
            case 'receive':
                return "transaction-received"
            case 'send':
                return "transaction-sent"
            default:
                return "unknown"
        }
    }

    const direction = (transaction: NanoTransaction) => {
        switch (transaction.type) {
            case 'receive':
                return 'transaction-from';
            case 'send':
                return 'transaction-to';
            default:
                return 'unknown'
        }
    }

    const transactionText = (transaction: NanoTransaction) => {
        return `${getLanguage(transactionType(transaction))} ${rawToNano(transaction.amount, 6).amount} ${getLanguage(direction(transaction))} ${truncateNanoAddress(transaction.account)}`
    }

    const setSelected = (time) => {
        // const selectedTransaction: NanoTransaction | undefined = history.filter(h => h.localTimestamp === time)[0]
        // pushState({...state, account: {...state.account, selectedTransaction: selectedTransaction}})
    }

    afterUpdate(() => {
        navigationReload()
    })
</script>

{#if transactions.length > 0}
    <List>
        {#each transactions as transaction}
            <Primary primaryText={transactionText(transaction)} />
        {/each}
    </List>
{:else}
    <Text languageId="no-transactions" />
{/if}
