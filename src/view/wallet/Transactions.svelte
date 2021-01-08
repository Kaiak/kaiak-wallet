<script lang="ts">
    import List from "../../components/List.svelte";
    import type {NanoTransaction, NanoWallet} from "../../machinery/models";
    import {afterUpdate, onDestroy} from "svelte";
    import {navigationReload, pushAccountAction} from "../../machinery/eventListener";
    import {getLanguage} from "../../machinery/language";
    import Primary from "../../components/list/Primary.svelte";
    import {rawToNano, truncateNanoAddress} from "../../machinery/nanocurrency-web-wrapper";
    import Text from "../../components/Text.svelte";
    import {setWalletState, walletStore} from "../../machinery/WalletState";
    import type {WalletState} from "../../machinery/WalletState";

    export let transactions: NanoTransaction[]
    let wallet: WalletState | undefined = undefined;

    const unsubscribe = walletStore.subscribe(value => wallet = value)

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

    const setSelected = (transaction: NanoTransaction) => {
        setWalletState({...wallet, transaction: transaction})
        pushAccountAction('transaction')
    }

    afterUpdate(() => navigationReload())
    onDestroy(() => unsubscribe())
</script>

{#if transactions.length > 0}
    <List>
        {#each transactions as transaction}
            <Primary primaryText={transactionText(transaction)} on:click={() => setSelected(transaction) } />
        {/each}
    </List>
{:else}
    <Text languageId="no-transactions" />
{/if}
