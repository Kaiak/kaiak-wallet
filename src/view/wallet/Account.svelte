<script lang="ts">
    import type {NanoAccount, NanoTransaction, NanoWallet} from "../../machinery/models";
    import Seperator from "../../components/Seperator.svelte";
    import List from "../../components/List.svelte";
    import Primary from "../../components/list/Primary.svelte";
    import Transactions from "./Transactions.svelte";
    import Receive from "./Receive.svelte";
    import type {AccountAction} from "../../machinery/NavigationState";
    import {navigationReload, pushAccountAction} from "../../machinery/eventListener";
    import {loadWalletData} from "../../machinery/nano-ops";
    import {rawToNano} from "../../machinery/nanocurrency-web-wrapper";
    import Settings from "./Settings.svelte";
    import SendByAddress from "./Send.svelte";
    import {afterUpdate, beforeUpdate} from "svelte";
    import {SOFT_KEY_MENU} from "../../machinery/SoftwareKeysState";
    import {walletStore} from "../../stores/stores";
    import {load} from "../../machinery/loader-store";
    import {resolveHistory} from "../../machinery/nano-rpc-fetch-wrapper";
    import {setWalletState} from "../../machinery/WalletState";

    export let wallet: NanoWallet
    export let selectedAccount: NanoAccount
    export let action: AccountAction;
    export let transactions: NanoTransaction[]

    const accountTitle = (account: NanoAccount) => {
        if (account === undefined) {
            return ''
        } else if (account && account.balance) {
            return `${account.alias || ''} ${rawToNano(account.balance, 5).amount} Nano`
        } else {
            return `${account.alias || ''}`
        }
    }

    const showTransactions = async () => {
        await load({
            languageId: 'loading-transactions',
            load: async () => {
                const resolvedTransactions = await resolveHistory(selectedAccount.address)
                setWalletState({wallet: wallet, selectedAccount: selectedAccount.address, transactions: resolvedTransactions})
                pushAccountAction('transactions')
            }
        })
    }

    const triggerRefresh = async () => {
        await load({
            languageId: 'loading-refresh',
            load: async () => {
                // TODO: Refresh transactions as well?
                const updatedAccount = await loadWalletData(selectedAccount)
                wallet.accounts = wallet.accounts.map(account => {
                    return account.address === updatedAccount.address ? updatedAccount : account
                })
                walletStore.set({
                    wallet: wallet,
                    selectedAccount: updatedAccount.address,
                    transactions: transactions,
                })
            }
        })
    }
    afterUpdate(() => {
        if(action === 'overview') {
            navigationReload({
                leftKey: {
                    languageId: 'update-button',
                    onClick: triggerRefresh
                },
                rightKey: SOFT_KEY_MENU,
            })
        }
    })

</script>

{#if action === 'overview'}
    <Seperator primaryText={accountTitle(selectedAccount)}/>
    <List>
        <Primary primaryLanguageId="transactions" on:click={showTransactions}/>
        <Primary primaryLanguageId="send" on:click={() => pushAccountAction('send') }/>
        <Primary primaryLanguageId="receive" on:click={() => pushAccountAction('receive') }/>
        <Primary primaryLanguageId="settings" on:click={() => pushAccountAction('settings') }/>
    </List>
{:else if action === 'transactions'}
    <Seperator languageId="transactions" primaryText={selectedAccount.alias}/>
    <Transactions transactions={transactions}/>
{:else if action.startsWith('send')}
    {#if action === 'send_qr' || action === 'send_address'}
        <SendByAddress wallet={wallet} account={selectedAccount} balance={selectedAccount.balance} sendType={action} setType={(action) => pushAccountAction(action)} />
    {:else}
        <List>
            <Primary primaryText="Send by QR code" on:click={() => pushAccountAction('send_qr')}/>
            <Primary primaryText="Send by address" on:click={() => pushAccountAction('send_address')}/>
        </List>
    {/if}
{:else if action === 'receive'}
    <Receive account={selectedAccount} />
{:else if action === 'settings'}
    <Settings wallet={wallet} selectedAccount={selectedAccount}/>
{/if}
