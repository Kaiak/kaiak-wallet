import {
  backPressesStore,
  loadedComponentStore, navigationStore,
  viewStore,
} from '../stores/stores';
import { Navigation } from './navigation';
import { MENU_VIEW } from '../constants/views';
import type {NavigationState} from "./NavigationState";

export interface LoadedElements {
  elements: HTMLElement[];
}

let selection = undefined;

const elementSelector = (selectedElement) => {
  selection = selectedElement;
};
let navigation = new Navigation([], elementSelector);

loadedComponentStore.subscribe((value) => {
  if (value.elements.length > 0) {
    document.removeEventListener('keydown', handleKeydown);
    navigation = new Navigation(value.elements, elementSelector);
    document.addEventListener('keydown', handleKeydown);
    navigation.focus();
  }
});


let stateHistory: NavigationState[] = [{
  menu: 'wallet',
}]

let index = 0

function popState(): void {
  if(index >= 0) {
    const nextState = stateHistory[index]
    navigationStore.set(nextState)
    index--
  }
}

export function pushState(state: NavigationState): void {
  stateHistory.push(state)
  navigationStore.set(state)
  index = stateHistory.length - 1;
}

export function handleKeydown(e) {
  switch (e.key) {
    case 'ArrowUp':
      if (navigation.up()) {
        e.preventDefault();
      }
      break;
    case 'ArrowDown':
      if (navigation.down()) {
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
      popState();
      e.preventDefault();
      break;
    case 'Backspace':
      popState();
      e.preventDefault();
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
