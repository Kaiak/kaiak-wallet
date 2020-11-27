<script>
    import Seperator from "../components/Seperator.svelte";
    import Button from "../components/Button.svelte";
    import List from "../components/List.svelte";
    import Primary from "../components/list/Primary.svelte";

    let wallets = [
        {
            primaryText: "main",
            type: "primary",
            data: {key: "main"},
            onClick: () => console.log('clicked main')
        },
        {
            primaryText: "savings",
            type: "primary",
            data: {key: "savings"},
            onClick: () => console.log('clicked savings')
        }
    ];
</script>

<div id="receive__view">
    <Seperator languageId="selectYourWallet" />
    <List>
        {#each wallets as wallet}
            <Primary primaryText={wallet.primaryText} on:click={wallet.onClick}/>
        {/each}
    </List>
    <Button languageId="generateAddress"/>
</div>

