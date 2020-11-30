<script lang="ts">
    import type {Balance, NanoAccount} from "../../machinery/models";
    import Seperator from "../../components/Seperator.svelte";
    import List from "../../components/List.svelte";
    import Primary from "../../components/list/Primary.svelte";
    import Transactions from "./Transactions.svelte";
    import Send from "./Send.svelte";
    import Receive from "./Receive.svelte";
    import {backPressesStore} from "../../stores/stores";
    import {onMount} from "svelte";
    import {resolveBalance} from "../../machinery/nano-rpc";
    import Button from "../../components/Button.svelte";

    export let account: NanoAccount

    type AccountAction = 'menu' | 'transactions' | 'send' | 'receive' | 'update'
    let action: AccountAction = 'menu'

    const selectAction = (selectedAction: AccountAction) => {
        backPressesStore.set(() => action = 'menu')
        action = selectedAction
    }

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

{#if action === 'menu'}
    <Seperator languageId="actions" primaryText={separatorText}/>
    <List>
        <Primary primaryLanguageId="transactions" on:click={() => selectAction('transactions') }/>
        <Primary primaryLanguageId="send" on:click={() => selectAction('send') }/>
        <Primary primaryLanguageId="receive" on:click={() => selectAction('receive') }/>
        <Button languageId="update-button" on:click={() => selectAction('update') }/>
    </List>
{:else if action === 'transactions'}
    <Seperator languageId="transactions" primaryText={account.alias}/>
    <Transactions address={account.address}/>
{:else if action === 'send'}
    <Send />
{:else if action === 'receive'}
    <Receive account={account} />
{/if}

