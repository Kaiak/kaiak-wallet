<script lang="ts">
    import List from "../components/List.svelte";
    import Primary from "../components/list/Primary.svelte";
    import Content from "../components/Content.svelte";
    import WithSecondary from "../components/list/WithSecondary.svelte";
    import type {NanoAccount} from "../machinery/models";
    import {back, navigationReload} from "../machinery/eventListener";
    import {afterUpdate} from "svelte";
    import {pushMenu, pushAccountAction, pushSetupAction} from "../machinery/eventListener";
    import type {AccountAction} from "../machinery/NavigationState";
    import type {WalletState} from "../machinery/WalletState";

    export let wallet: WalletState | undefined
    export let accountAction: AccountAction | undefined = undefined

    afterUpdate(() => navigationReload(
        {
            rightKey: {
                onClick: async () => { back() },
                languageId: 'close-menu'
            }
        }
    ))
</script>

<Content titleKey="menu">
    <List>
        <Primary primaryLanguageId="wallet" primaryText="wallet" on:click={() => pushMenu('accounts')}/>
        {#if wallet.account && accountAction === 'menu'}
            <WithSecondary primaryLanguageId="send" secondaryText={wallet.account.alias} on:click={() => pushAccountAction('send')}/>
            <WithSecondary primaryLanguageId="transactions" secondaryText={wallet.account.alias} on:click={() =>  pushAccountAction('transactions')}/>
            <WithSecondary primaryLanguageId="receive" secondaryText={wallet.account.alias} on:click={() =>  pushAccountAction('receive')}/>
        {/if}
        <Primary primaryLanguageId="about" primaryText="about" on:click={() => pushMenu('about')}/>
        <Primary primaryLanguageId="setup" primaryText="setup" on:click={() => pushSetupAction('menu')}/>
    </List>
</Content>
