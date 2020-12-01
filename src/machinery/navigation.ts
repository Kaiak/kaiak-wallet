export class Navigation{
    current = 0;
    targetElement = null;
    elements = [];
    selectedElement = null;

    constructor(elements: HTMLElement[], selectedElement){
        this.elements = elements;
        this.selectedElement = selectedElement;
    }

    focus(){
        this.targetElement = this.elements[this.current]
        this.targetElement.focus()
        this.selectedElement(this.targetElement)
    }

    up() {
        const prev = this.current-1;
        if(prev >= 0){
            this.current--;
        } else{
            this.current = this.elements.length-1;
        }

        this.focus()

        return true;
    }

    down() {
        const next = this.current+1;

        if(next < this.elements.length){
            this.current++;
            this.targetElement = this.elements[this.current];
        } else{
            this.current = 0;
        }

        this.focus()

        return true;
    }
}

