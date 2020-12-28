<script lang="ts">
    import List from "../components/List.svelte";
    import Content from "../components/Content.svelte";
    import type {NanoAccount, NanoWallet} from "../machinery/models";
    import WithSecondary from "../components/list/WithSecondary.svelte";
    import {setWalletState} from "../machinery/WalletState";
    import {navigationReload, pushMenu, pushToast} from "../machinery/eventListener";
    import {afterUpdate} from "svelte";
    import {load} from "../machinery/loader-store";
    import {addNanoAccount} from "../machinery/wallet";

    export let wallet: NanoWallet
    const selectAccount = (account: NanoAccount) => {
        setWalletState({
            wallet: wallet,
            selectedAccount: account.address
        })
        pushMenu('account')
    }

    const addAccount = async () => {
        await load(
            {
                languageId: 'adding-account',
                load: async () => {
                    const updatedNanoWallet: NanoWallet | undefined = await addNanoAccount(wallet)
                    if (updatedNanoWallet) {
                        setWalletState({ wallet: updatedNanoWallet })
                    } else {
                        pushToast({languageId: 'unable-to-store'})
                    }
                },
            }
        )
    }

    afterUpdate(() => {
        navigationReload(
            {
                middleKey: undefined,
                leftKey: {
                    languageId: 'add-account',
                    onClick: async () => addAccount()
                },
                rightKey: {
                    languageId: 'rightNavButton',
                    onClick: async () => pushMenu('menu')
                }
            }
        )
    })

</script>

<Content titleKey="wallet">
    <List>
        {#each wallet.accounts as account}
            <WithSecondary primaryText={account.alias} primaryLanguageId={account.alias || 'unnamed-account'} on:click={() => selectAccount(account)} secondaryText={account.address} />
        {/each}
    </List>
</Content>