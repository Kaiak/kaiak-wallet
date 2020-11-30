<script lang="ts">
    import type {Balance, NanoAccount} from "../../machinery/models";
    import Seperator from "../../components/Seperator.svelte";
    import List from "../../components/List.svelte";
    import Primary from "../../components/list/Primary.svelte";
    import Transactions from "./Transactions.svelte";
    import Send from "./Send.svelte";
    import Receive from "./Receive.svelte";
    import {backPressesStore, selectedActionStore} from "../../stores/stores";
    import {onMount} from "svelte";
    import {resolveBalance} from "../../machinery/nano-rpc";
    import Button from "../../components/Button.svelte";
    import type {AccountAction} from "../../constants/account-actions";

    export let account: NanoAccount

    let action: AccountAction | undefined = undefined

    selectedActionStore.subscribe((selectedAction) => {
        if(account && selectedAction) {
            backPressesStore.set(() => action = undefined)
        }
        action = selectedAction
    })

    let separatorText: string = account.alias
    onMount(async () => {
        try {
            const balance: Balance = await resolveBalance(account.address)
            separatorText = `${account.alias} ${balance.amount} Nano`
        } catch (error) {
            console.log('error loading balance')
        }
    })

</script>

{#if action === undefined}
    <Seperator languageId="actions" primaryText={separatorText}/>
    <List>
        <Primary primaryLanguageId="transactions" on:click={() => selectedActionStore.set('transactions') }/>
        <Primary primaryLanguageId="send" on:click={() => selectedActionStore.set('send') }/>
        <Primary primaryLanguageId="receive" on:click={() => selectedActionStore.set('receive') }/>
        <Button languageId="update-button" on:click={() => selectedActionStore.set('update') }/>
    </List>
{:else if action === 'transactions'}
    <Seperator languageId="transactions" primaryText={account.alias}/>
    <Transactions address={account.address}/>
{:else if action === 'send'}
    <Send />
{:else if action === 'receive'}
    <Receive account={account} />
{/if}

