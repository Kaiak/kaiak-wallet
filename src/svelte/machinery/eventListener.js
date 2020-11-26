import {loadedComponentStore, viewStore} from "../stores/stores";
import Navigation from "./navigation";
import {MENU_VIEW} from "../constants/views";

let selection = undefined;

const elementSelector = (selectedElement) => {
    selection = selectedElement
    console.log("Selected: " + selectedElement)
}
let navigation = new Navigation([], elementSelector);

const unsubscribe = loadedComponentStore.subscribe((value) => {
    document.activeElement.removeEventListener('keydown', handleKeydown);
    navigation = new Navigation(value.elements, elementSelector)
    document.activeElement.addEventListener('keydown', handleKeydown);
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
                // navigationStore.set({type: HISTORY_BACK_ACTION_TYPE});
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
            // navigationStore.set({type: HISTORY_BACK_ACTION_TYPE});
            break;
        case 'Enter':
            if(!!selection){
                selection.click()
                e.preventDefault();
            }else{
                e.preventDefault();
            }
            break;
        case 'SoftLeft':
            console.log("Soft left");
            break;
        case 'SoftRight':
            viewStore.set(MENU_VIEW)
            break;
        case 'Shift':
            viewStore.set(MENU_VIEW)
            break;
    }
}
