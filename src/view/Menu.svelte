<script lang="ts">
    import { navigationStore } from "../stores/stores";
    import List from "../components/List.svelte";
    import Primary from "../components/list/Primary.svelte";
    import Content from "../components/Content.svelte";
    import WithSecondary from "../components/list/WithSecondary.svelte";
    import type {NavigationState, AccountAction} from "../machinery/NavigationState";
    import {pushState} from "../machinery/eventListener";

    let state: NavigationState | undefined = undefined

    navigationStore.subscribe(value => {
        state = value
    })

    const setWalletView = (a: AccountAction) => {
        pushState({...state, menu: 'wallet', account: {...state.account, view: a}})
    }
</script>

<Content titleKey="menu">
    <List>
        <Primary primaryLanguageId="wallet" primaryText="wallet" on:click={() => pushState({...state, menu: 'wallet'})}/>
        {#if state.account?.selectedAccount}
            <WithSecondary primaryLanguageId="send" secondaryText={state.account?.selectedAccount.alias} on:click={() => setWalletView('send')}/>
            <WithSecondary primaryLanguageId="transactions" secondaryText={state.account?.selectedAccount.alias} on:click={() =>  setWalletView('transactions')}/>
            <WithSecondary primaryLanguageId="receive" secondaryText={state.account?.selectedAccount.alias} on:click={() =>  setWalletView('receive')}/>
        {/if}
        <Primary primaryLanguageId="about" primaryText="about" on:click={() => pushState({...state, menu: 'about'})}/>
        <Primary primaryLanguageId="setup" primaryText="setup" on:click={() => pushState({...state, menu: 'setup'})}/>
    </List>
</Content>
