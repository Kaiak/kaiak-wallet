<script>
    import {viewStore} from "../stores/stores";
    import {ABOUT_VIEW, BALANCE_VIEW, RECEIVE_VIEW, SEND_VIEW, SETUP_VIEW, TRANSACTIONS_VIEW} from "../constants/views";
    import List from "../components/List.svelte";
    import Primary from "../components/list/Primary.svelte";
</script>

<div id="view__menu">
    <List>
        <Primary primaryLanguageId="receive" primaryText="receive" on:click={() => viewStore.set(RECEIVE_VIEW)}/>
        <Primary primaryLanguageId="send" primaryText="send" on:click={() => viewStore.set(SEND_VIEW)}/>
        <Primary primaryLanguageId="balance" primaryText="balance" on:click={() => viewStore.set(BALANCE_VIEW)}/>
        <Primary primaryLanguageId="transactions" primaryText="transactions" on:click={() => viewStore.set(TRANSACTIONS_VIEW)}/>
        <Primary primaryLanguageId="about" primaryText="about" on:click={() => viewStore.set(ABOUT_VIEW)}/>
        <Primary primaryLanguageId="setup" primaryText="setup" on:click={() => viewStore.set(SETUP_VIEW)}/>
    </List>
</div>
