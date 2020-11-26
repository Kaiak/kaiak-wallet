import {HISTORY_BACK_ACTION_TYPE} from "../constants/actions";

export default function getHistory(state = [], action = {}){
    function back(){
        if(state.length > 1){
            state.splice(-1,1);
            app.loadView(state.pop());
        }
    }

    switch(action.type){
        case HISTORY_BACK_ACTION_TYPE:
            back();
    }
}
