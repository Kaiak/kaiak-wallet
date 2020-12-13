<script lang="ts">
    import type {NanoAccount, NanoWallet, RAW} from "../machinery/models";
    import List from "../components/List.svelte";
    import Account from "./wallet/Account.svelte";
    import {navigationStore, softwareKeysStore} from "../stores/stores";
    import WithSecondary from "../components/list/WithSecondary.svelte";
    import Content from "../components/Content.svelte";
    import type {NavigationState} from "../machinery/NavigationState";
    import {patchState, pushMenu, pushState} from "../machinery/eventListener";
    import {addNanoAccount} from "../machinery/wallet";
    import LabelledLoader from "../components/LabelledLoader.svelte";
    import {afterUpdate, beforeUpdate, onMount} from "svelte";
    import {updateWalletAccounts} from "../machinery/nano-ops";
    import {setSoftwareKeys} from "../machinery/SoftwareKeysState";

    let navigationState: NavigationState
    let wallet: NanoWallet | undefined
    let selectedAccount: NanoAccount | undefined

    const unsubscribe = navigationStore.subscribe<NavigationState>(value => {
        navigationState = value
        wallet = value.wallet
        selectedAccount = navigationState.account?.selectedAccount
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
        loaderText = undefined;
    }

    onMount(async () => {
        loaderText = "loading-accounts";
        const updatedNanoWallet: NanoWallet | undefined = await updateWalletAccounts(wallet)
        if(updatedNanoWallet) {
            patchState({...navigationState, wallet: updatedNanoWallet})
        }
        loaderText = undefined
    })
    beforeUpdate(() => {
        if(selectedAccount === undefined) {
            setSoftwareKeys({
                middleKey: undefined,
                leftKey: {
                    languageId: 'add-account',
                    onClick: addAccount
                },
                rightKey: {
                    languageId: 'rightNavButton',
                    onClick: () => pushMenu('menu')
                }
            })
        }
    })

</script>

{#if wallet}
    <Content titleKey="wallet">
        {#if selectedAccount}
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
            {/if}
        {/if}
    </Content>
{/if}

