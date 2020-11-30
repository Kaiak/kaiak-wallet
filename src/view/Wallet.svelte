<script lang="ts">
    import type {NanoAccount, NanoWallet} from "../machinery/models";
    import Button from "../components/Button.svelte";
    import List from "../components/List.svelte";
    import Primary from "../components/list/Primary.svelte";
    import Account from "./wallet/Account.svelte";
    import {backPressesStore, selectedAccountStore} from "../stores/stores";
    import WithSecondary from "../components/list/WithSecondary.svelte";
    import Content from "../components/Content.svelte";

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
    let selectedAccount: NanoAccount | undefined = undefined

    selectedAccountStore.subscribe(account => {
        backPressesStore.set(() => selectedAccount = undefined)
        selectedAccount = account
    })

</script>

<Content titleKey="wallet">
    {#if selectedAccount}
        <Account account={selectedAccount} />
    {:else}
        <List>
            {#each wallet.accounts as account}
                <WithSecondary primaryText={account.alias} on:click={() => selectedAccountStore.set(account)} secondaryText={account.address} />
            {/each}
        </List>
        <Button languageId="generateAddress"/>
    {/if}
</Content>

