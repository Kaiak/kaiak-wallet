<script lang="ts">
    import {selectedAccountStore, viewStore, selectedActionStore} from "../stores/stores";
    import {WALLET_VIEW, ABOUT_VIEW, SETUP_VIEW} from "../constants/views";
    import List from "../components/List.svelte";
    import Primary from "../components/list/Primary.svelte";
    import Content from "../components/Content.svelte";
    import type {NanoAccount} from "../machinery/models";
    import WithSecondary from "../components/list/WithSecondary.svelte";
    import type {AccountAction} from "../constants/account-actions";

    let selectedAccount: NanoAccount | undefined = undefined
    selectedAccountStore.subscribe((account) => {
        selectedAccount = account;
    })
    const setWalletView = (action: AccountAction) => {
        viewStore.set(WALLET_VIEW)
        selectedActionStore.set(action)
    }


</script>

<Content titleKey="menu">
    <List>
        <Primary primaryLanguageId="wallet" primaryText="wallet" on:click={() => {
            selectedAccountStore.set(undefined)
            selectedActionStore.set(undefined)
            viewStore.set(WALLET_VIEW)
        }}/>
        {#if selectedAccount}
            <WithSecondary primaryLanguageId="send" secondaryText={selectedAccount.alias} on:click={() => setWalletView('send')}/>
            <WithSecondary primaryLanguageId="transactions" secondaryText={selectedAccount.alias} on:click={() => setWalletView('transactions')}/>
            <WithSecondary primaryLanguageId="receive" secondaryText={selectedAccount.alias} on:click={() => setWalletView('receive')}/>
        {/if}
        <Primary primaryLanguageId="about" primaryText="about" on:click={() => viewStore.set(ABOUT_VIEW)}/>
        <Primary primaryLanguageId="setup" primaryText="setup" on:click={() => viewStore.set(SETUP_VIEW)}/>
    </List>
</Content>
