import {SELECT_NAV_ELEMENT_ACTION_TYPE} from "../constants/actions";

export default function getNavSelection(state = "", action = {}){
    switch(action.type){
        case SELECT_NAV_ELEMENT_ACTION_TYPE:
            console.log(action);
            return action.key.slice();
        default:
            return state;
    }
}
