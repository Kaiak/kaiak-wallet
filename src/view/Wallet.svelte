<script lang="ts">
    import type {NanoAccount, NanoWallet} from "../machinery/models";
    import List from "../components/List.svelte";
    import Account from "./wallet/Account.svelte";
    import {navigationStore, walletStore} from "../stores/stores";
    import WithSecondary from "../components/list/WithSecondary.svelte";
    import Content from "../components/Content.svelte";
    import type {AccountAction, NavigationState} from "../machinery/NavigationState";
    import {navigationReload, pushAccountAction, pushMenu, pushToast} from "../machinery/eventListener";
    import {addNanoAccount} from "../machinery/wallet";
    import LabelledLoader from "../components/LabelledLoader.svelte";
    import {afterUpdate, onMount} from "svelte";
    import {updateWalletAccounts} from "../machinery/nano-ops";
    import {setSoftwareKeys} from "../machinery/SoftwareKeysState";
    import {setWalletState} from "../machinery/WalletState";
    import type {WalletState} from "../machinery/WalletState";

    let navigationState: NavigationState
    let selectedAccount: NanoAccount | undefined
    let accountAction: AccountAction | undefined

    let wallet: NanoWallet | undefined = undefined;

    let loaderText: string | undefined = undefined

    walletStore.subscribe<WalletState>(value => {
        wallet = value.wallet;
        selectedAccount = wallet && value.selectedAccount ? wallet.accounts.filter(a => a.address === value.selectedAccount)[0] : undefined
    })

    navigationStore.subscribe<NavigationState>(value => {
        navigationState = value
        accountAction = value.accountAction
        if(accountAction === undefined) {
            setSoftwareKeys({
                middleKey: undefined,
                leftKey: {
                    languageId: 'add-account',
                    onClick: () => addAccount()
                },
                rightKey: {
                    languageId: 'rightNavButton',
                    onClick: () => pushMenu('menu')
                }
            })
        }
    });
    const selectAccount = (account: NanoAccount) => {
        setWalletState({
            wallet: wallet,
            selectedAccount: account.address
        })
        pushAccountAction('overview')
    }

    const addAccount = async () => {
        loaderText = "adding-account";
        const updatedNanoWallet: NanoWallet | undefined = await addNanoAccount(wallet)
        if (updatedNanoWallet) {
            setWalletState({wallet: updatedNanoWallet, selectedAccount: selectedAccount?.address})
        } else {
            pushToast({languageId: 'unable-to-store'})
        }
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
    afterUpdate(navigationReload)
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

