<script lang="ts">
    import type {NanoAccount, NanoWallet} from "../machinery/models";
    import Button from "../components/Button.svelte";
    import List from "../components/List.svelte";
    import Account from "./wallet/Account.svelte";
    import {navigationStore,} from "../stores/stores";
    import WithSecondary from "../components/list/WithSecondary.svelte";
    import Content from "../components/Content.svelte";
    import type {NavigationState, SelectedAccountState} from "../machinery/NavigationState";
    import {pushState} from "../machinery/eventListener";

    let wallet: NanoWallet = {
        accounts: [
            {
                alias: "Main",
                address: "nano_3niceeeyiaa86k58zhaeygxfkuzgffjtwju9ep33z9c8qekmr3iuc95jbqc8"
            },
            {
                alias: "Savings",
                address: "nano_1hzoje373eapce4ses7xsx539suww5555hi9q8i8j7hpbayzxq4c4nn91hr8"
            }
        ],
        seed: "some-seed"
    }
    let navigationState: NavigationState

    const unsubscribe = navigationStore.subscribe<NavigationState>(value => {
        navigationState = value
    });
    const selectAccount = (account: NanoAccount) => {
        pushState({...navigationState, account: {selectedAccount: account, view: undefined, selectedTransaction: undefined}})
    }

</script>

<Content titleKey="wallet">
    {#if navigationState.account}
        <Account account={navigationState.account} />
    {:else}
        <List>
            {#each wallet.accounts as account}
                <WithSecondary primaryText={account.alias} on:click={() => selectAccount(account)} secondaryText={account.address} />
            {/each}
        </List>
        <Button languageId="generateAddress"/>
    {/if}
</Content>

