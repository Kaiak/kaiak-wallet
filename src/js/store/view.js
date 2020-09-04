function getView(state = "setup", action = {}){
    switch(action.type){
        case SELECT_VIEW_ACTION_TYPE:
            console.log(action.viewName);
            return action.viewName;
        default:
            return state;
    }
}
