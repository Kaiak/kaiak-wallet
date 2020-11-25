export default function balanceItems(state = {}, action = {}){
    state = {
        translation: {
            lastUpdate: "Last update"
        },
        items: [
            {
                accountName: "Main",
                amount: 10.42,
                lastUpdate: "send"
            }
        ]
    };

    return state;
}
