<script lang="ts">
    import Seperator from "../components/Seperator.svelte";
    import List from "../components/List.svelte";
    import WithSecondary from "../components/list/WithSecondary.svelte";

    const accounts: any[] = [
        {
            name: "Main",
            key: "main",
            balance: 10.12,
            last_update: "10/03/2020 10:23"
        },
        {
            name: "Savings",
            key: "savings",
            balance: 30.23,
            last_update: "10/03/2020 10:23"
        }
    ];

</script>

{#each accounts as account}
    <Seperator primaryText={account.name} />
    <List>
        <WithSecondary primaryText={account.balance} secondaryText={account.last_update}/>
    </List>
{/each}
