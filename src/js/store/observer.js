function StoreObserver(){
    const observers = {};

    return {
        notify: function(key, state){
            const obs = observers[key];

            for(let i = 0; i < obs.length; i++){
                obs[i](state);
            }
        },
        observe: function(prop, func){
            if(!observers[prop]){
                observers[prop] = [];
            }
            observers[prop].push(func);
        }
    }
}

var observer = new StoreObserver();