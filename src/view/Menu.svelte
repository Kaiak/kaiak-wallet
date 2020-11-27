<script>
    import List from "../components/List.svelte";
    import {viewStore} from "../stores/stores";
    import {ABOUT_VIEW, BALANCE_VIEW, RECEIVE_VIEW, SEND_VIEW, SETUP_VIEW} from "../constants/views";
    let menu = [
        {
            primaryLanguageId: "receive",
            onClick: () => viewStore.set(RECEIVE_VIEW),
        },
        {
            primaryLanguageId: "send",
            onClick: () => viewStore.set(SEND_VIEW),
        },
        {
            primaryLanguageId: "balance",
            onClick: () => viewStore.set(BALANCE_VIEW),
        },
        {
            primaryLanguageId: "transactionHistory",
        },
        {
            primaryLanguageId: "about",
            onClick: () => viewStore.set(ABOUT_VIEW),
        },
        {
            primaryLanguageId: "setup",
            onClick: () => viewStore.set(SETUP_VIEW),
        }
    ];
</script>

<div id="view__menu">
    <List elements={menu}/>
</div>
