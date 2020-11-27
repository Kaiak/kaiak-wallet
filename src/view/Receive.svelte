<script>
    import Seperator from "../components/Seperator.svelte";
    import List from "../components/List.svelte";
    import Button from "../components/Button.svelte";

    let walletElements = [
        {
            primaryText: "main",
            type: "primary",
            data: {key: "main"},
            onClick: () => {
                console.log('enter!!!')
            }
        },
        {
            primaryText: "savings",
            type: "primary",
            data: {key: "savings"}
        }
    ];
</script>

<div id="receive__view">
    <Seperator languageId="selectYourWallet" />
    <List elements={walletElements} />
    <Button languageId="generateAddress"/>
</div>

