<script>
    import Seperator from "../components/Seperator.svelte";
    import List from "../components/List.svelte";

    const accounts = [
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

    const toListElement = (account) => {
        return {
            primaryText: account.balance,
            secondaryText: account.last_update,
            type: "secondary",
            data: { key: account.key }
        };
    }

</script>

{#each accounts as account}
    <Seperator text={account.name}/>
    <List elements={[toListElement(account)]} />
{/each}
