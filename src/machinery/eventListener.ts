import { loadedComponentStore, navigationStore } from '../stores/stores';
import { Navigation } from './navigation';
import type {MenuSelector, NavigationState} from './NavigationState';

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

let stateHistory: NavigationState[] = [
  {
    menu: 'wallet',
    account: undefined,
  },
];

let index = 0;

export function popState(): boolean {
  if (index > 0) {
    index--;
    const nextState = stateHistory[index];
    navigationStore.set(nextState);
    return true;
  } else {
    return false;
  }
}

export function pushMenu(menu: MenuSelector): void {
  pushState({...stateHistory[index], menu})
}

export function pushState(state: NavigationState): void {
  /** Ignore if previous state was menu and we are pushing menu */
  if (state.menu === 'menu' && stateHistory[index].menu === 'menu') {
    popState();
    return;
  }

  index++;
  if (stateHistory.length > index) {
    stateHistory[index] = state;
  } else {
    stateHistory.push(state);
  }
  navigationStore.set(state);
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
      if (popState()) {
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
      pushState({ ...stateHistory[index], menu: 'menu' });
      break;
  }
}
