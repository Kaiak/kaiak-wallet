<script lang="ts">
    import type {NanoAccount, NanoWallet, RAW} from "../machinery/models";
    import List from "../components/List.svelte";
    import Account from "./wallet/Account.svelte";
    import {navigationStore, softwareKeysStore, walletStore} from "../stores/stores";
    import WithSecondary from "../components/list/WithSecondary.svelte";
    import Content from "../components/Content.svelte";
    import type {AccountAction, NavigationState} from "../machinery/NavigationState";
    import {patchState, pushAccountAction, pushMenu, pushState} from "../machinery/eventListener";
    import {addNanoAccount} from "../machinery/wallet";
    import LabelledLoader from "../components/LabelledLoader.svelte";
    import {afterUpdate, beforeUpdate, onMount} from "svelte";
    import {updateWalletAccounts} from "../machinery/nano-ops";
    import {setSoftwareKeys} from "../machinery/SoftwareKeysState";
    import {setWalletState} from "../machinery/WalletState";
    import type {WalletState} from "../machinery/WalletState";

    let navigationState: NavigationState
    let selectedAccount: NanoAccount | undefined
    let accountAction: AccountAction | undefined

    let wallet: NanoWallet | undefined = undefined;

    walletStore.subscribe<WalletState>(value => {
        wallet = value.wallet;
        selectedAccount = wallet && value.selectedAccount ? wallet.accounts.filter(a => a.address === value.selectedAccount)[0] : undefined
        console.log(value)
    })

    navigationStore.subscribe<NavigationState>(value => {
        navigationState = value
        accountAction = value.accountAction
    });
    const selectAccount = (account: NanoAccount) => {
        setWalletState({
            wallet: wallet,
            selectedAccount: account.address
        })
        pushAccountAction('overview')
    }
    let loaderText: string | undefined = undefined
    const addAccount = async () => {
        loaderText = "adding-account";
        const updatedNanoWallet: NanoWallet | undefined = await addNanoAccount(wallet)
        if (updatedNanoWallet) {
            setWalletState({wallet: updatedNanoWallet, selectedAccount: selectedAccount.address})
        } // TODO: Display error
        loaderText = undefined;
    }

    onMount(async () => {
        loaderText = "loading-accounts";
        const updatedNanoWallet: NanoWallet | undefined = await updateWalletAccounts(wallet)
        if(updatedNanoWallet) {
            setWalletState({wallet: updatedNanoWallet, selectedAccount: selectedAccount?.address})
        }
        loaderText = undefined
    })
    beforeUpdate(() => {accountAction
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
        {#if selectedAccount && accountAction}
            <Account wallet={wallet} selectedAccount={selectedAccount} action={accountAction}/>
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

