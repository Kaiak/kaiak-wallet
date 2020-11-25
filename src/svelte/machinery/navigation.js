import {navigationStore} from "../stores/stores";
import {SELECT_NAV_ELEMENT_ACTION_TYPE} from "../constants/actions";

export default function Navigation(){
    let current = 0;
    let elements = [];
    let elementData = [];
    let targetElement = null;

    return {
        init: function(){
            targetElement = elements[0];
            targetElement.focus();
            console.log(targetElement);
            console.log("INIT");
            navigationStore.set({type: SELECT_NAV_ELEMENT_ACTION_TYPE, key: elementData[0].key});
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
            }else{
                current = elements.length-1;
                elements[current].focus();
                targetElement = elements[current];
            }

            navigationStore.set({type: SELECT_NAV_ELEMENT_ACTION_TYPE, key: elementData[current].key});
            return true;
        },
        down: function(){
            const next = current+1;
            if(next < elements.length){
                current++;
                elements[current].focus();
                targetElement = elements[current];
            }else{
                current = 0;
                elements[current].focus();
                targetElement = elements[current];
            }

            navigationStore.set({type: SELECT_NAV_ELEMENT_ACTION_TYPE, key: elementData[current].key});
            return true;
        }
    }
}
