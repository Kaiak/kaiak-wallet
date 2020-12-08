<script lang="ts">
    import type {NanoAccount, NanoWallet} from "../machinery/models";
    import Button from "../components/Button.svelte";
    import List from "../components/List.svelte";
    import Account from "./wallet/Account.svelte";
    import {navigationStore,} from "../stores/stores";
    import WithSecondary from "../components/list/WithSecondary.svelte";
    import Content from "../components/Content.svelte";
    import type {NavigationState} from "../machinery/NavigationState";
    import {patchState, pushState} from "../machinery/eventListener";
    import {addNanoAccount} from "../machinery/wallet";
    import LabelledLoader from "../components/LabelledLoader.svelte";

    let navigationState: NavigationState
    let wallet: NanoWallet | undefined

    const unsubscribe = navigationStore.subscribe<NavigationState>(value => {
        navigationState = value
        wallet = value.wallet
    });
    const selectAccount = (account: NanoAccount) => {
        pushState({
            ...navigationState,
            account: {selectedAccount: account, view: undefined, selectedTransaction: undefined}
        })
    }

    let addingAccount: boolean = false;
    const addAccount = async () => {
        addingAccount = true;
        const updatedNanoWallet: NanoWallet | undefined = await addNanoAccount(wallet)
        if (updatedNanoWallet) {
            patchState({...navigationState, wallet: updatedNanoWallet})
        } // TODO: Display error
        addingAccount = false;
    }

</script>

{#if wallet}
    <Content titleKey="wallet">
        {#if navigationState.account}
            <Account account={navigationState.account} />
        {:else}
            {#if addingAccount}
                <LabelledLoader languageId="adding-account" />
            {:else}
                <List>
                    {#each wallet.accounts as account}
                        <WithSecondary primaryText={account.alias} on:click={() => selectAccount(account)} secondaryText={account.address} />
                    {/each}
                </List>
                <Button languageId="add-account" on:click={addAccount}/>
            {/if}
        {/if}
    </Content>
{/if}

