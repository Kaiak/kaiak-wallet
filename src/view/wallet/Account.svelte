<script lang="ts">
    import type {NANO} from "../../machinery/models";
    import Seperator from "../../components/Seperator.svelte";
    import List from "../../components/List.svelte";
    import Primary from "../../components/list/Primary.svelte";
    import Transactions from "./Transactions.svelte";
    import Send from "./Send.svelte";
    import Receive from "./Receive.svelte";
    import {navigationStore} from "../../stores/stores";
    import {onMount} from "svelte";
    import Button from "../../components/Button.svelte";
    import type {AccountAction, NavigationState, SelectedAccountState} from "../../machinery/NavigationState";
    import {pushState} from "../../machinery/eventListener";
    import {resolveBalance} from "../../machinery/nano-rpc-fetch-wrapper";
    import {loadWalletData} from "../../machinery/nano-ops";

    let state: NavigationState
    let selectedAccount: SelectedAccountState | undefined = undefined
    let separatorText: string | undefined = undefined

    navigationStore.subscribe(value => {
        state = value
        selectedAccount = state?.account
        separatorText = selectedAccount?.selectedAccount.alias
    })

    onMount(async () => {
        try {
            const balance: NANO = await resolveBalance(selectedAccount.selectedAccount?.address)
            separatorText = `${selectedAccount.selectedAccount?.alias} ${balance.amount} Nano`
        } catch (error) {
            console.log('error loading balance')
        }
    })

    const setAccountAction = (a: AccountAction) => {
        pushState({...state, account: {...selectedAccount, view: a}})
    }

    const triggerRefresh = async () => {
        const log = await loadWalletData(selectedAccount.selectedAccount)
    }

</script>

{#if selectedAccount?.view === undefined}
    <Seperator languageId="actions" primaryText={separatorText}/>
    <List>
        <Primary primaryLanguageId="transactions" on:click={() => setAccountAction('transactions') }/>
        <Primary primaryLanguageId="send" on:click={() => setAccountAction('send') }/>
        <Primary primaryLanguageId="receive" on:click={() => setAccountAction('receive') }/>
        <Button languageId="update-button" on:click={triggerRefresh}/>
    </List>
{:else if selectedAccount.view === 'transactions'}
    <Seperator languageId="transactions" primaryText={selectedAccount?.selectedAccount.alias}/>
    <Transactions address={selectedAccount?.selectedAccount.address}/>
{:else if selectedAccount?.view === 'send'}
    <Send />
{:else if selectedAccount?.view === 'receive'}
    <Receive account={selectedAccount?.selectedAccount} />
{/if}

