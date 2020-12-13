<script lang="ts">
    import type {NanoAccount, NanoWallet} from "../../machinery/models";
    import Seperator from "../../components/Seperator.svelte";
    import List from "../../components/List.svelte";
    import Primary from "../../components/list/Primary.svelte";
    import Transactions from "./Transactions.svelte";
    import Receive from "./Receive.svelte";
    import {navigationStore} from "../../stores/stores";
    import Button from "../../components/Button.svelte";
    import type {AccountAction, NavigationState, SelectedAccountState} from "../../machinery/NavigationState";
    import {pushState} from "../../machinery/eventListener";
    import {loadWalletData} from "../../machinery/nano-ops";
    import {rawToNano} from "../../machinery/nanocurrency-web-wrapper";
    import LabelledLoader from "../../components/LabelledLoader.svelte";
    import Settings from "./Settings.svelte";
    import {setWallet} from "../../machinery/secure-storage";
    import SendByAddress from "../send/SendByAddress.svelte";

    let state: NavigationState
    let selectedAccount: SelectedAccountState | undefined = undefined
    let account: NanoAccount | undefined = undefined;
    let separatorText: string | undefined = undefined

    let loading: boolean = false;

    const accountTitle = (account: NanoAccount) => {
        if (account === undefined) {
            return ''
        } else if (account && account.balance) {
            return `${account.alias} ${rawToNano(account.balance, 5).amount} Nano`
        } else {
            return `${account.alias}`
        }
    }

    navigationStore.subscribe(value => {
        state = value
        selectedAccount = state?.account
        account = selectedAccount?.selectedAccount;
        separatorText = accountTitle(account)
    })

    const setAccountAction = (a: AccountAction) => {
        pushState({...state, account: {...selectedAccount, view: a}})
    }

    const triggerRefresh = async () => {
        loading = true;
        try {
            await loadWalletData(selectedAccount.selectedAccount)
        } catch (e) {
            console.log(e)
        }
        loading = false
    }

    const updateAccount = async () => {
        if (state?.wallet) {
            const updated: NanoWallet | undefined = await setWallet(state.wallet)
            if (updated) {
                setAccountAction(undefined)
            } // TODO: Toast
        }
    }

</script>

{#if loading}
    <LabelledLoader languageId="loading-refresh"/>
{:else}
    {#if selectedAccount?.view === undefined}
        <Seperator languageId="actions" primaryText={separatorText}/>
        <List>
            <Primary primaryLanguageId="transactions" on:click={() => setAccountAction('transactions') }/>
            <Primary primaryLanguageId="send" on:click={() => setAccountAction('send') }/>
            <Primary primaryLanguageId="receive" on:click={() => setAccountAction('receive') }/>
            <Primary primaryLanguageId="settings" on:click={() => setAccountAction('settings') }/>
            <Button languageId="update-button" on:click={triggerRefresh}/>
        </List>
    {:else if selectedAccount.view === 'transactions'}
        <Seperator languageId="transactions" primaryText={selectedAccount?.selectedAccount.alias}/>
        <Transactions address={selectedAccount?.selectedAccount.address}/>
    {:else if selectedAccount?.view.startsWith('send') }
        {#if selectedAccount.view === 'send_qr' || selectedAccount.view === 'send_address'}
            <SendByAddress account={account} balance={account.balance} sendType={selectedAccount.view}/>
        {:else}
            <List>
                <Primary primaryText="Send by QR code" on:click={() => setAccountAction('send_qr')}/>
                <Primary primaryText="Send by address" on:click={() => setAccountAction('send_address')}/>
            </List>
        {/if}
    {:else if selectedAccount?.view === 'receive'}
        <Receive account={selectedAccount?.selectedAccount} />
    {:else if selectedAccount?.view === 'settings'}
        <Settings bind:account storeFunction={updateAccount}/>
    {/if}
{/if}

