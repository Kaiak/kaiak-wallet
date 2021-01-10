<script lang="ts">
    import type {NanoAccount, NanoAddress} from "../../machinery/models";
    import Seperator from "../../components/Seperator.svelte";
    import List from "../../components/List.svelte";
    import Primary from "../../components/list/Primary.svelte";
    import Transactions from "./Transactions.svelte";
    import Receive from "./Receive.svelte";
    import type {AccountAction} from "../../machinery/NavigationState";
    import {navigationReload, pushAccountAction, pushToast} from "../../machinery/eventListener";
    import {rawToNano} from "../../machinery/nanocurrency-web-wrapper";
    import Settings from "./Settings.svelte";
    import SendByAddress from "./Send.svelte";
    import {afterUpdate} from "svelte";
    import {load} from "../../machinery/loader-store";
    import {setWalletState, updateWalletState} from "../../machinery/WalletState";
    import type {WalletState} from "../../machinery/WalletState";
    import SendSelector from "./SendSelector.svelte";
    import Content from "../../components/Content.svelte";
    import Transaction from "./Transaction.svelte";
    import CameraCapture from "../../components/CameraCapture.svelte";
    import {pushMenu} from "../../machinery/eventListener";
    import Donate from "./Donate.svelte";
    import {SOFT_KEY_SELECT} from "../../machinery/SoftwareKeysState";

    export let walletState: WalletState
    export let action: AccountAction;
    export let fullscreen: boolean = false;

    $: wallet = walletState.wallet;
    $: selectedAccount = walletState.account;
    $: transactions = walletState.transactions
    $: transaction = walletState.transaction
    $: sendToAddress = walletState.sendToAddress

    const accountTitle = (account: NanoAccount) => {
        if (account === undefined) {
            return ''
        } else if (account && account.balance) {
            return `${account.alias || ''} ${rawToNano(account.balance).amount} Nano`
        } else {
            return `${account.alias || ''}`
        }
    }

    const showTransactions = async () => {
        await load({
            languageId: 'loading-transactions',
            load: async () => {
                await updateWalletState(selectedAccount, wallet)
                pushAccountAction('transactions')
            }
        })
    }

    const triggerRefresh = async () => {
        await load({
            languageId: 'loading-refresh',
            load: async () => updateWalletState(selectedAccount, wallet)
        })
    }

    const showSettings = async () => {
        await load({
            languageId: 'loading-settings',
            load: async () => {
                pushAccountAction('settings')
            },
            onError: () => {
                pushToast({languageId: 'unable-to-load-representative'})
            }
        })
    }
    const sendToAccount = (address: NanoAddress) => {
        setWalletState({
            ...walletState,
            sendToAddress: address
        })
        pushAccountAction('send_address')
    }

    afterUpdate(() => {
        if (action === 'menu') {
            navigationReload({
                leftKey: {
                    languageId: 'update-button',
                    onClick: triggerRefresh
                },
                middleKey: SOFT_KEY_SELECT,
                rightKey: {
                    languageId: 'menu',
                    onClick: async () => pushMenu('menu'),
                },
            })
        }
    })

</script>

<Content titleKey="account" fullscreen={fullscreen}>
    {#if action === 'menu'}
        <Seperator primaryText={accountTitle(selectedAccount)}/>
        <List>
            <Primary primaryLanguageId="transactions" on:click={showTransactions}/>
            <Primary primaryLanguageId="send" on:click={() => pushAccountAction('send') }/>
            <Primary primaryLanguageId="receive" on:click={() => pushAccountAction('receive') }/>
            <Primary primaryLanguageId="settings" on:click={() => showSettings() }/>
            <Primary primaryLanguageId="about-donate-button" on:click={() => pushAccountAction('donate') }/>
        </List>
    {:else if action === 'transactions' && transactions}
        <Seperator languageId="transactions" primaryText={selectedAccount.alias}/>
        <Transactions transactions={transactions}/>
    {:else if action === 'transaction' && transaction}
        <Transaction transaction={transaction} sendFunction={sendToAccount} />
    {:else if action === 'send'}
        <SendSelector />
    {:else if action === 'send_qr'}
        <CameraCapture scannedAddress={sendToAccount}/>
    {:else if action === 'send_address'}
        <SendByAddress wallet={wallet} account={selectedAccount} balance={selectedAccount.balance} sendType={action} toAddress={sendToAddress} sendFunction={sendToAccount} />
    {:else if action === 'receive'}
        <Receive account={selectedAccount} />
    {:else if action === 'settings'}
        <Settings wallet={wallet} selectedAccount={selectedAccount}/>
    {:else if action === 'donate'}
        <Donate walletState={walletState} />
    {/if}
</Content>
