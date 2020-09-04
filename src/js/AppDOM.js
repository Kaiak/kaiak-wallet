function AppDOM(){
    const body = document.getElementById('kui-body');
    const header = document.getElementById('kui-header');
    const options = document.getElementById('kui-options');
    const leftKey = document.getElementById('kui-left-soft-key');
    const middleKey = document.getElementById('kui-middle-soft-key');

    return {
        setBody: function(html){
            body.innerHTML = "";
            body.appendChild(html);
        },
        setHeader: function(text){
            header.innerText = text;
        },
        setOptions: function(html){
            options.innerHTML = "";
            options.appendChild(html);
        },
        setLeftKey: function(text){
            leftKey.innerText = text;
        },
        setMiddleKey: function(text){
            middleKey.innerText = text;
        },
        getBody: function(){
            return body.innerHTML;
        },
        getHeader: function(){
            return header.innerHTML;
        },
        getOptions: function(){
            return options.innerHTML;
        },
        getLeftKey: function(){
            return leftKey.innerHTML;
        },
        getMiddleKey: function(){
            return middleKey.innerHTML;
        }
    }
}