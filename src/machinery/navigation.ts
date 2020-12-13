export class Navigation {
  private current = 0;
  private targetElement = null;
  readonly elements = [];
  private selectedElement: Element | null = null;

  constructor(elements: Element[]) {
    if (elements.length > 0) {
      this.elements = elements;
    }
    this.focus();
  }

  focus() {
    if (this.elements.length > 0) {
      this.targetElement = this.elements[this.current];
      this.targetElement.focus();
      this.selectedElement = this.targetElement;
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

  selection(): HTMLElement | null {
    return this.selectedElement instanceof HTMLInputElement
      ? this.selectedElement
      : null;
  }

  selectionSupportsBackspace(): boolean {
    return (
      this.selectedElement instanceof HTMLInputElement &&
      this.selectedElement.value.length > 0
    );
  }
}
