import {observer} from "./observer";
import {SELECT_VIEW_ACTION_TYPE} from "../constants/actions";

export default function getView(state = "setup", action = {}){
    switch(action.type){
        case SELECT_VIEW_ACTION_TYPE:
            console.log(action.viewName);
            const newState = action.viewName.slice();
            observer.notify("view", newState);
            return newState;
        default:
            return state;
    }
}
