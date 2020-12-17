<script lang="ts">
    import {navigationStore, walletStore} from "../stores/stores";
    import List from "../components/List.svelte";
    import Primary from "../components/list/Primary.svelte";
    import Content from "../components/Content.svelte";
    import WithSecondary from "../components/list/WithSecondary.svelte";
    import type {NavigationState, AccountAction, MenuSelector} from "../machinery/NavigationState";
    import type {NanoAccount} from "../machinery/models";
    import {pushState} from "../machinery/eventListener";

    let state: NavigationState
    let selectedAccount: NanoAccount | undefined

    navigationStore.subscribe(value => {
        state = value
    })
    walletStore.subscribe(value => {
        selectedAccount = value.wallet && value.selectedAccount ? value.wallet.accounts.filter(a => a.address === value.selectedAccount)[0] : undefined
    })

    const setAppView = (menu: MenuSelector) => {
        pushState({...state, menu: menu, accountAction: undefined })
    }
    const setWalletView = (a: AccountAction) => {
        pushState({...state, menu: 'wallet', accountAction: a})
    }
</script>

<Content titleKey="menu">
    <List>
        <Primary primaryLanguageId="wallet" primaryText="wallet" on:click={() => setAppView('wallet')}/>
        {#if selectedAccount && state.accountAction}
            <WithSecondary primaryLanguageId="send" secondaryText={selectedAccount.alias} on:click={() => setWalletView('send')}/>
            <WithSecondary primaryLanguageId="transactions" secondaryText={selectedAccount.alias} on:click={() =>  setWalletView('transactions')}/>
            <WithSecondary primaryLanguageId="receive" secondaryText={selectedAccount.alias} on:click={() =>  setWalletView('receive')}/>
        {/if}
        <Primary primaryLanguageId="about" primaryText="about" on:click={() => setAppView('about')}/>
        <Primary primaryLanguageId="setup" primaryText="setup" on:click={() => setAppView('setup')}/>
    </List>
</Content>
