<script>
    import Seperator from "../components/Seperator.svelte";
    import List from "../components/List.svelte";
    import Button from "../components/Button.svelte";
    import Primary from "../components/list/Primary.svelte";
</script>

<div id="setup__view">
    <Seperator languageId="languages"/>
    <List>
        <Primary primaryText="English" on:click={() => console.log('English')}/>
    </List>
    <Button languageId="addLanguage"/>
    <Seperator languageId="wallets" />
    <List>
        <Primary primaryText="Main" on:click={() => console.log('Main')}/>
    </List>
    <Button languageId="addWallet"/>
    <Button languageId="save"/>
</div>


