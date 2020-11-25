export default function menuItems(state = [], action = {}){
    state = [
        {
            img: "",
            key: "send",
            lang: "Send"
        },
        {
            img: "",
            key: "receive",
            lang: "Receive"
        },
        {
            img: "",
            key: "balance",
            lang: "Balance"
        },
        {
            img: "",
            key: "transaction_history",
            lang: "Transaction history"
        },
        {
            img: "",
            key: "settings",
            lang: "Settings"
        },
        {
            img: "",
            key: "about",
            lang: "About"
        }
    ];

    return state;
}
