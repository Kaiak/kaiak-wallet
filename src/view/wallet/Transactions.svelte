<script lang="ts">
    import List from "../../components/List.svelte";
    import type {NanoTransaction} from "../../machinery/models";
    import {onDestroy, onMount} from "svelte";
    import {navigationReload, pushAccountAction} from "../../machinery/eventListener";
    import Primary from "../../components/list/Primary.svelte";
    import Text from "../../components/Text.svelte";
    import {setWalletState, walletStore} from "../../machinery/WalletState";
    import type {WalletState} from "../../machinery/WalletState";
    import {transactionText} from "../../machinery/text-utils";
    import {SOFT_KEY_SELECT} from "../../machinery/SoftwareKeysState";

    export let transactions: NanoTransaction[]
    let wallet: WalletState | undefined = undefined;

    const unsubscribe = walletStore.subscribe(value => wallet = value)

    const setSelected = (transaction: NanoTransaction) => {
        setWalletState({...wallet, transaction: transaction})
        pushAccountAction('transaction')
    }

    onMount(() => navigationReload(transactions.length > 0 ? {
        middleKey: SOFT_KEY_SELECT
    } : undefined))
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
