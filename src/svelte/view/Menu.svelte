<script>
    import List from "../components/List.svelte";
    import {viewStore} from "../stores/stores";
    import {BALANCE_VIEW, SETUP_VIEW} from "../constants/views";
    let menu = [
        {
            primaryText: "Receive",
            type: "primary",
            data: { key: "receive" }
        },
        {
            primaryText: "Send",
            type: "primary",
            data: { key: "send" }
        },
        {
            primaryText: "Balance",
            type: "primary",
            data: { key: "balance" },
            onClick: () => {
                viewStore.set(BALANCE_VIEW)
            }
        },
        {
            primaryText: "Transaction history",
            type: "primary",
            data: { key: "transaction_history" }
        },
        {
            primaryText: "About",
            type: "primary",
            data: { key: "about" }
        },
        {
            primaryText: "Setup",
            type: "primary",
            data: { key: "setup" },
            onClick: () => {
                viewStore.set(SETUP_VIEW)
            }
        }
    ];
</script>

<div id="view__menu">
    <List elements={menu}/>
</div>
