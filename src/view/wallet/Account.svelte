<script lang="ts">
    import type {NanoAccount, NanoWallet} from "../../machinery/models";
    import Seperator from "../../components/Seperator.svelte";
    import List from "../../components/List.svelte";
    import Primary from "../../components/list/Primary.svelte";
    import Transactions from "./Transactions.svelte";
    import Receive from "./Receive.svelte";
    import type {AccountAction} from "../../machinery/NavigationState";
    import {navigationReload, pushAccountAction} from "../../machinery/eventListener";
    import {loadWalletData} from "../../machinery/nano-ops";
    import {rawToNano} from "../../machinery/nanocurrency-web-wrapper";
    import LabelledLoader from "../../components/LabelledLoader.svelte";
    import Settings from "./Settings.svelte";
    import SendByAddress from "./Send.svelte";
    import {afterUpdate, onMount} from "svelte";
    import {setSoftwareKeys, SOFT_KEY_MENU} from "../../machinery/SoftwareKeysState";
    import {walletStore} from "../../stores/stores";

    export let wallet: NanoWallet
    export let selectedAccount: NanoAccount
    export let action: AccountAction;

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

    const triggerRefresh = async () => {
        loading = true;
        try {
            const updatedAccount = await loadWalletData(selectedAccount)
            wallet.accounts = wallet.accounts.map(account => {
                return account.address === updatedAccount.address ? updatedAccount : account
            })
            walletStore.set({
                wallet: wallet,
                selectedAccount: updatedAccount.address
            })
        } catch (e) {
            console.log(e)
        }
        loading = false
    }

    onMount(() => setSoftwareKeys({
        leftKey: {
            languageId: 'update-button',
            onClick: triggerRefresh
        },
        middleKey: undefined,
        rightKey: SOFT_KEY_MENU,
    }));

    afterUpdate(navigationReload)

</script>

{#if loading}
    <LabelledLoader languageId="loading-refresh"/>
{:else}
    {#if action === 'overview'}
        <Seperator primaryText={accountTitle(selectedAccount)}/>
        <List>
            <Primary primaryLanguageId="transactions" on:click={() => pushAccountAction('transactions') }/>
            <Primary primaryLanguageId="send" on:click={() => pushAccountAction('send') }/>
            <Primary primaryLanguageId="receive" on:click={() => pushAccountAction('receive') }/>
            <Primary primaryLanguageId="settings" on:click={() => pushAccountAction('settings') }/>
        </List>
    {:else if action === 'transactions'}
        <Seperator languageId="transactions" primaryText={selectedAccount.alias}/>
        <Transactions address={selectedAccount.address}/>
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
{/if}

