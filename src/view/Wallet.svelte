<script lang="ts">
    import type {NanoAccount, NanoWallet, RAW} from "../machinery/models";
    import Button from "../components/Button.svelte";
    import List from "../components/List.svelte";
    import Account from "./wallet/Account.svelte";
    import {navigationStore, softwareKeysStore} from "../stores/stores";
    import WithSecondary from "../components/list/WithSecondary.svelte";
    import Content from "../components/Content.svelte";
    import type {NavigationState} from "../machinery/NavigationState";
    import {patchState, pushMenu, pushState} from "../machinery/eventListener";
    import {addNanoAccount} from "../machinery/wallet";
    import LabelledLoader from "../components/LabelledLoader.svelte";
    import {onMount} from "svelte";
    import {resolveBalances} from "../machinery/nano-rpc-fetch-wrapper";
    import {updateWalletAccounts} from "../machinery/nano-ops";

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
    let loaderText: string | undefined = undefined
    let addingAccount: boolean = false;
    const addAccount = async () => {
        loaderText = "adding-account";
        const updatedNanoWallet: NanoWallet | undefined = await addNanoAccount(wallet)
        if (updatedNanoWallet) {
            patchState({...navigationState, wallet: updatedNanoWallet})
        } // TODO: Display error
        addingAccount = undefined;
    }

    onMount(async () => {
        loaderText = "loading-accounts";
        const updatedNanoWallet: NanoWallet | undefined = await updateWalletAccounts(wallet)
        if(updatedNanoWallet) {
            patchState({...navigationState, wallet: updatedNanoWallet})
        }
        softwareKeysStore.set({
            leftKey: undefined,
            middleKey: undefined,
            rightKey: {
                onClick: () => pushMenu('menu'),
                languageId: 'rightNavButton'
            }
        })
        loaderText = undefined
    })

</script>

{#if wallet}
    <Content titleKey="wallet">
        {#if navigationState.account?.selectedAccount}
            <Account/>
        {:else}
            {#if loaderText}
                <LabelledLoader languageId={loaderText} />
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

