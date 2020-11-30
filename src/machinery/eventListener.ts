import {
  backPressesStore,
  loadedComponentStore,
  viewStore,
} from '../stores/stores';
import Navigation from './navigation';
import { MENU_VIEW } from '../constants/views';

export interface LoadedElements {
  elements: HTMLElement[];
}

let selection = undefined;

const elementSelector = (selectedElement) => {
  selection = selectedElement;
  console.log('Selected: ' + selectedElement);
};
let navigation = new Navigation([], elementSelector);

loadedComponentStore.subscribe((value) => {
  document.activeElement.removeEventListener('keydown', handleKeydown);
  navigation = new Navigation(value.elements, elementSelector);
  document.activeElement.addEventListener('keydown', handleKeydown);
});

let backPresses: (() => any)[] = [];
backPressesStore.subscribe((b: () => any) => {
  console.log(b);
  backPresses.push(b);
});

export function handleKeydown(e) {
  switch (e.key) {
    case 'ArrowUp':
      if (!navigation.up()) {
        e.preventDefault();
      }
      break;
    case 'ArrowDown':
      if (!navigation.down()) {
        e.preventDefault();
      }
      break;
    case 'ArrowRight':
      if (selection) {
        selection.click();
        e.preventDefault();
      } else {
        e.preventDefault();
      }
      break;
    case 'ArrowLeft':
      if (backPresses.length > 0) {
        const backPressToRun = backPresses.pop();
        backPressToRun();
      } else {
        e.preventDefault();
      }
      break;
    case 'Backspace':
      if (backPresses.length > 0) {
        const backPressToRun = backPresses.pop();
        backPressToRun();
        e.preventDefault();
      } else {
        e.preventDefault();
      }
      break;
    case 'Enter':
      if (selection) {
        selection.click();
        e.preventDefault();
      } else {
        e.preventDefault();
      }
      break;
    case 'SoftLeft':
      console.log('Soft left');
      break;
    case 'SoftRight':
      viewStore.set(MENU_VIEW);
      break;
    case 'Shift':
      viewStore.set(MENU_VIEW);
      break;
  }
}
