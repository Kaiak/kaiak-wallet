<script lang="ts">
    import Seperator from "../components/Seperator.svelte";
    import List from "../components/List.svelte";
    import Button from "../components/Button.svelte";
    import Primary from "../components/list/Primary.svelte";
    import Content from "../components/Content.svelte";
</script>


<Content titleKey="setup">
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
</Content>


