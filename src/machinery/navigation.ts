export class Navigation {
  current = 0;
  targetElement = null;
  elements = [];
  selectedElement = null;

  constructor(elements: HtmlCollectionOf<Element>, selectedElement) {
    if (elements.length > 0) {
      this.elements = elements;
      this.selectedElement = selectedElement;
    }
  }

  focus() {
    if (this.elements.length > 0) {
      this.targetElement = this.elements[this.current];
      this.targetElement.focus();
      this.selectedElement(this.targetElement);
    }
  }

  up() {
    if (this.elements.length > 0) {
      const prev = this.current - 1;
      if (prev >= 0) {
        this.current--;
      } else {
        this.current = this.elements.length - 1;
      }
      this.focus();
      return true;
    } else {
      return false;
    }
  }

  down() {
    if (this.elements.length > 0) {
      const next = this.current + 1;

      if (next < this.elements.length) {
        this.current++;
        this.targetElement = this.elements[this.current];
      } else {
        this.current = 0;
      }
      this.focus();
      return true;
    } else {
      return false;
    }
  }
}
