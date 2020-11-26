<script>
    import Seperator from "../components/Seperator.svelte";
    import List from "../components/List.svelte";
    import Button from "../components/Button.svelte";

    const languageData = [
        {
            primaryText: "English",
            type: "primary",
        }
    ];

    const walletData = [
        {
            primaryText: "Main",
            type: "primary",
        }
    ];
</script>

<div id="setup__view">
    <Seperator text="Languages"/>
    <List elements={languageData} />
    <Button text="Add language"/>
    <Seperator text="Wallets" />
    <List elements={walletData} />
    <Button text="Add wallet"/>
    <Button text="Save"/>
</div>


