<script lang="ts">
    import {selectedAccountStore, viewStore, selectedActionStore, navigationStore} from "../stores/stores";
    import {WALLET_VIEW, ABOUT_VIEW, SETUP_VIEW} from "../constants/views";
    import List from "../components/List.svelte";
    import Primary from "../components/list/Primary.svelte";
    import Content from "../components/Content.svelte";
    import type {NanoAccount} from "../machinery/models";
    import WithSecondary from "../components/list/WithSecondary.svelte";
    import type {AccountAction} from "../constants/account-actions";
    import type {NavigationState} from "../machinery/NavigationState";
    import {pushState} from "../machinery/eventListener";

    let selectedAccount: NanoAccount | undefined = undefined
    selectedAccountStore.subscribe((account) => {
        selectedAccount = account;
    })
    const setWalletView = (action: AccountAction) => {
        viewStore.set(WALLET_VIEW)
        selectedActionStore.set(action)
    }

    let state: NavigationState

    navigationStore.subscribe(value => {
        state = value
    })


</script>

<Content titleKey="menu">
    <List>
        <Primary primaryLanguageId="wallet" primaryText="wallet" on:click={() => pushState({...state, menu: 'wallet'})}/>
        {#if selectedAccount}
            <WithSecondary primaryLanguageId="send" secondaryText={selectedAccount.alias} on:click={() => setWalletView('send')}/>
            <WithSecondary primaryLanguageId="transactions" secondaryText={selectedAccount.alias} on:click={() => setWalletView('transactions')}/>
            <WithSecondary primaryLanguageId="receive" secondaryText={selectedAccount.alias} on:click={() => setWalletView('receive')}/>
        {/if}
        <Primary primaryLanguageId="about" primaryText="about" on:click={() => pushState({...state, menu: 'about'})}/>
        <Primary primaryLanguageId="setup" primaryText="setup" on:click={() => pushState({...state, menu: 'setup'})}/>
    </List>
</Content>
