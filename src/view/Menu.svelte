<script>
    import {viewStore} from "../stores/stores";
    import {WALLET_VIEW, ABOUT_VIEW, SETUP_VIEW} from "../constants/views";
    import List from "../components/List.svelte";
    import Primary from "../components/list/Primary.svelte";
</script>

<div id="view__menu">
    <List>
        <Primary primaryLanguageId="wallet" primaryText="wallet" on:click={() => viewStore.set(WALLET_VIEW)}/>
        <Primary primaryLanguageId="about" primaryText="about" on:click={() => viewStore.set(ABOUT_VIEW)}/>
        <Primary primaryLanguageId="setup" primaryText="setup" on:click={() => viewStore.set(SETUP_VIEW)}/>
    </List>
</div>
