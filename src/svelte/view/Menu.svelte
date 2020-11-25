<script>
    import List from "../components/List.svelte";
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
            data: { key: "balance" }
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
        }
    ];
</script>

<div id="view__menu">
    <List elements={menu}/>
</div>
