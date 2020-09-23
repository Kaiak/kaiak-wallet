function nanoWalletStore(state = {}, action){
    console.log(action);

    return {
        form: getForm(state.form, action),
        navSelection: getNavSelection(state.navSelection, action),
        history: getHistory(state.history, action),
        view: getView(state.view, action),
        options: optionItems(state.options, action),
        menu: menuItems(state.menu, action),
        balance: balanceItems(state.balance, action)
    }
}

var store = Redux.createStore(nanoWalletStore);
