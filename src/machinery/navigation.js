export default function Navigation(elements, selectedElement){
    let current = 0;
    let targetElement = null;

    return {
        //fixme: infinite scrolling doesn't work
        up: function(){
            const prev = current-1;
            if(prev >= 0){
                current--;
                elements[current].focus();
                targetElement = elements[current];
            } else{
                current = elements.length-1;
                elements[current].focus();
                targetElement = elements[current];
            }
            selectedElement(targetElement)

            return true;
        },
        down: function(){
            const next = current+1;
            if(next < elements.length){
                current++;
                elements[current].focus();
                targetElement = elements[current];
            } else{
                current = 0;
                elements[current].focus();
                targetElement = elements[current];
            }
            selectedElement(targetElement)

            return true;
        }
    }
}
