import {HISTORY_BACK_ACTION_TYPE, SELECT_VIEW_ACTION_TYPE} from "../../js/constants/actions";
import menuView from "../../js/views/menu";
import {navigationStore} from "../stores/stores";
import Navigation from "./navigation";

let selection = undefined;

const navigation = new Navigation();

const unsubscribe = navigationStore.subscribe((v) => {
    console.log(v)
    selection = v;
})

export function handleKeydown(e) {
    switch (e.key) {
        case 'ArrowUp':
            if(!navigation.up()){
                e.preventDefault();
            }
            break;
        case 'ArrowDown':
            if(!navigation.down()){
                e.preventDefault();
            }
            break;
        case 'ArrowRight':
            if(!!navigation.targetElement){
                navigationStore.set({type: HISTORY_BACK_ACTION_TYPE});
            }else{
                e.preventDefault();
            }
            break;
        case 'ArrowLeft':
            if(history.data().length === 0){
                e.preventDefault();
            }else{
                history.back();
            }
            break;
        case 'Backspace':
            store.dispatch({type: HISTORY_BACK_ACTION_TYPE});
            break;
        case 'Enter':
            if(!!selection){
                navigationStore.set({ type: SELECT_VIEW_ACTION_TYPE, selection });
            }else{
                e.preventDefault();
            }
            break;
        case 'SoftLeft':
            console.log("Soft left");
            break;
        case 'SoftRight':
            menuView(self, config).then(dom.setBody);
            break;
        case 'Shift':
            console.log("shift");
            break;
    }
}
