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
    <Seperator languageId="languages"/>
    <List elements={languageData} />
    <Button languageId="addLanguage"/>
    <Seperator languageId="wallets" />
    <List elements={walletData} />
    <Button languageId="addWallet"/>
    <Button languageId="save"/>
</div>


