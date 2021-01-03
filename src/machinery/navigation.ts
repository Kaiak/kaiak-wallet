export class Navigation {
  private current = 0;
  private targetElement = null;
  readonly elements = [];
  private selectedElement: Element | null = null;

  constructor(elements: Element[]) {
    if (elements.length > 0) {
      this.elements = elements;
    }
  }

  focus() {
    if (this.elements.length > 0) {
      this.targetElement = this.elements[this.current];
      this.targetElement.focus();
      this.selectedElement = this.targetElement;
      this.selectedElement.scrollIntoView(false);
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
    return this.selectedElement instanceof HTMLElement
      ? this.selectedElement
      : null;
  }

  inputSelection(): HTMLInputElement | HTMLTextAreaElement | null {
    return this.selectedElement instanceof HTMLInputElement ||
      this.selectedElement instanceof HTMLTextAreaElement
      ? this.selectedElement
      : null;
  }

  navigatesInInputField(): boolean {
    return this.inputSelection() !== null;
  }

  preventBackspaceInInputField(): boolean {
    return this.inputSelection()
      ? this.inputSelection().selectionStart !== 0
      : false;
  }
}
