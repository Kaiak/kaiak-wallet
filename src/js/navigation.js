function Navigation(){
    let current = 0;
    let elements = [];
    let elementData = [];
    let targetElement = null;

    return {
        init: function(){
            targetElement = elements[0];
            targetElement.focus();
        },
        clear: function(){
            current = 0;
            elements = [];
            elementData = [];
            targetElement = null;
        },
        add: function(toAdd, data){
            if(HTMLCollection.prototype.isPrototypeOf(toAdd)){
                elements = elements.concat(Array.from(toAdd));
            }else{
                elements = elements.concat(toAdd);
            }
            elementData.push(data);
        },
        //fixme: infinite scrolling doesn't work
        up: function(){
            const prev = current-1;
            if(prev >= 0){
                current--;
                elements[current].focus();
                targetElement = elements[current];

                return true;
            }else{
                current = elements.length-1;
                elements[current].focus();
                targetElement = elements[current];

                return true;
            }
        },
        down: function(){
            const next = current+1;
            if(next < elements.length){
                current++;
                elements[current].focus();
                targetElement = elements[current];

                return true;
            }else{
                current = 0;
                elements[current].focus();
                targetElement = elements[current];

                return true;
            }
        }
    }
}