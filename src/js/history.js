function AppHistory(app, config){
    var data = [];
    console.log(app);

    return {
        data: () => {return data},
        push: (name) => {data.push(name)},
        back: function(){
            if(data.length > 1){
                data.splice(-1,1);
                app.loadView(data.pop());
            }
        }
    };
}