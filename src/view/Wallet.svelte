<script lang="ts">
    import type {NanoAccount, NanoWallet} from "../machinery/models";
    import Button from "../components/Button.svelte";
    import List from "../components/List.svelte";
    import Primary from "../components/list/Primary.svelte";
    import Account from "./wallet/Account.svelte";
    import {backPressesStore} from "../stores/stores";

    let wallet: NanoWallet = {
        accounts: [
            {
                alias: "Main",
                address: "nano_1jtx5p8141zjtukz4msp1x93st7nh475f74odj8673qqm96xczmtcnanos1o"
            },
            {
                alias: "Savings",
                address: "nano_1hzoje373eapce4ses7xsx539suww5555hi9q8i8j7hpbayzxq4c4nn91hr8"
            }
        ],
        seed: "some-seed"
    }
    let selectedAccount: NanoAccount | undefined = undefined

    const selectAccount = (account: NanoAccount) => {
        backPressesStore.set(() => selectedAccount = undefined)
        selectedAccount = account;
    }

</script>

{#if selectedAccount}
    <Account account={selectedAccount} />
{:else}
    <List>
        {#each wallet.accounts as account}
            <Primary primaryText={account.alias} on:click={() => selectAccount(account)} />
        {/each}
    </List>
    <Button languageId="generateAddress"/>
{/if}

