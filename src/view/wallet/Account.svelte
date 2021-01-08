<script lang="ts">
    import type {NanoAccount, NanoTransaction, NanoWallet} from "../../machinery/models";
    import Seperator from "../../components/Seperator.svelte";
    import List from "../../components/List.svelte";
    import Primary from "../../components/list/Primary.svelte";
    import Transactions from "./Transactions.svelte";
    import Receive from "./Receive.svelte";
    import type {AccountAction} from "../../machinery/NavigationState";
    import {navigationReload, pushAccountAction, pushToast} from "../../machinery/eventListener";
    import {loadAndResolveAccountData, updateAccountInWallet} from "../../machinery/nano-ops";
    import {rawToNano} from "../../machinery/nanocurrency-web-wrapper";
    import Settings from "./Settings.svelte";
    import SendByAddress from "./Send.svelte";
    import {afterUpdate} from "svelte";
    import {SOFT_KEY_MENU} from "../../machinery/SoftwareKeysState";
    import {walletStore} from "../../stores/stores";
    import {load} from "../../machinery/loader-store";
    import {getHistory} from "../../machinery/nano-rpc-fetch-wrapper";
    import {setWalletState} from "../../machinery/WalletState";
    import SendSelector from "./SendSelector.svelte";

    export let wallet: NanoWallet
    export let selectedAccount: NanoAccount
    export let action: AccountAction;
    export let transactions: NanoTransaction[]

    const accountTitle = (account: NanoAccount) => {
        if (account === undefined) {
            return ''
        } else if (account && account.balance) {
            return `${account.alias || ''} ${rawToNano(account.balance, 6).amount} Nano`
        } else {
            return `${account.alias || ''}`
        }
    }

    const showTransactions = async () => {
        await load({
            languageId: 'loading-transactions',
            load: async () => {
                const resolvedTransactions = await getHistory(selectedAccount.address)
                setWalletState({
                    wallet: wallet,
                    account: selectedAccount,
                    transactions: resolvedTransactions
                })
                pushAccountAction('transactions')
            }
        })
    }

    const showSettings = async () => {
        await load({
            languageId: 'loading-settings',
            load: async () => {
                pushAccountAction('settings')
            },
            onError: () => {
              pushToast({ languageId: 'unable-to-load-representative' })
            }
        })
    }

    const triggerRefresh = async () => {
        await load({
            languageId: 'loading-refresh',
            load: async () => {
                const { account: updatedAccount, resolvedCount } = await loadAndResolveAccountData(selectedAccount, 0)
                const resolvedTransactions = await getHistory(selectedAccount.address)
                if (resolvedCount > 0) {
                    pushToast({languageId: 'got-new-transactions', type: "success"})
                }
                walletStore.set({
                    wallet: updateAccountInWallet(updatedAccount, wallet),
                    account: updatedAccount,
                    transactions: resolvedTransactions,
                })
            }
        })
    }
    afterUpdate(() => {
        if (action === 'menu') {
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

{#if action === 'menu'}
    <Seperator primaryText={accountTitle(selectedAccount)}/>
    <List>
        <Primary primaryLanguageId="transactions" on:click={showTransactions}/>
        <Primary primaryLanguageId="send" on:click={() => pushAccountAction('send') }/>
        <Primary primaryLanguageId="receive" on:click={() => pushAccountAction('receive') }/>
        <Primary primaryLanguageId="settings" on:click={() => showSettings() }/>
    </List>
{:else if action === 'transactions'}
    <Seperator languageId="transactions" primaryText={selectedAccount.alias}/>
    <Transactions transactions={transactions}/>
{:else if action === 'send'}
    <SendSelector />
{:else if action === 'send_qr' || action === 'send_address'}
    <SendByAddress wallet={wallet} account={selectedAccount} balance={selectedAccount.balance} sendType={action} setType={(action) => pushAccountAction(action)} />
{:else if action === 'receive'}
    <Receive account={selectedAccount} />
{:else if action === 'settings'}
    <Settings wallet={wallet} selectedAccount={selectedAccount}/>
{/if}
