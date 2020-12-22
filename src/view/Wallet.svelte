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
    import {afterUpdate} from "svelte";
    import {setSoftwareKeys} from "../machinery/SoftwareKeysState";
    import {setWalletState} from "../machinery/WalletState";
    import type {WalletState} from "../machinery/WalletState";
    import {load} from "../machinery/loader-store";

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
                    onClick: async () => addAccount()
                },
                rightKey: {
                    languageId: 'rightNavButton',
                    onClick: async () => pushMenu('menu')
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
        await load({
                languageId: 'adding-account',
                load: async () => {
                    const updatedNanoWallet: NanoWallet | undefined = await addNanoAccount(wallet)
                    if (updatedNanoWallet) {
                        setWalletState({wallet: updatedNanoWallet, selectedAccount: selectedAccount?.address})
                    } else {
                        pushToast({languageId: 'unable-to-store'})
                    }
                }
            }
        )
    }

    afterUpdate(navigationReload)
</script>

{#if wallet}
    <Content titleKey="wallet">
        {#if selectedAccount && accountAction}
            <Account wallet={wallet} selectedAccount={selectedAccount} action={accountAction}/>
        {:else}
            <List>
                {#each wallet.accounts as account}
                    <WithSecondary primaryText={account.alias} on:click={() => selectAccount(account)} secondaryText={account.address} />
                {/each}
            </List>
        {/if}
    </Content>
{/if}

