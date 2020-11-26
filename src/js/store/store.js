import { createStore } from 'redux'
import getForm from "./form";
import getNavSelection from "./selection";
import getHistory from "./history";
import getView from "./view";
import optionItems from "./option-items";
import menuItems from "./menu-items";
import balanceItems from "./balance-items";

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

export let store = createStore(nanoWalletStore);
