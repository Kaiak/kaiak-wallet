<script>
    import List from "../components/List.svelte";
    import {viewStore} from "../stores/stores";
    import {ABOUT_VIEW, BALANCE_VIEW, RECEIVE_VIEW, SEND_VIEW, SETUP_VIEW} from "../constants/views";
    let menu = [
        {
            primaryText: "Receive",
            type: "primary",
            onClick: () => viewStore.set(RECEIVE_VIEW),
        },
        {
            primaryText: "Send",
            type: "primary",
            onClick: () => viewStore.set(SEND_VIEW),
        },
        {
            primaryText: "Balance",
            type: "primary",
            onClick: () => viewStore.set(BALANCE_VIEW),
        },
        {
            primaryText: "Transaction history",
            type: "primary",
        },
        {
            primaryText: "About",
            type: "primary",
            onClick: () => viewStore.set(ABOUT_VIEW),
        },
        {
            primaryText: "Setup",
            type: "primary",
            onClick: () => viewStore.set(SETUP_VIEW),
        }
    ];
</script>

<div id="view__menu">
    <List elements={menu}/>
</div>
