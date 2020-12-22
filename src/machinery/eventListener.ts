import { navigationStore, toastStore } from '../stores/stores';
import { Navigation } from './navigation';
import type {
  AccountAction,
  MenuSelector,
  NavigationState,
  OnboardState,
} from './NavigationState';
import type { SoftwareKeysState } from './SoftwareKeysState';
import { START_STATE } from './NavigationState';
import type { ToastState } from './ToastState';
import { softwareKeysStore } from './SoftwareKeysState';

let navigation: Navigation = new Navigation([]);

let middleKey: (() => void) | undefined = undefined;
let leftKey: (() => void) | undefined = undefined;
let rightKey: (() => void) | undefined = undefined;

let stateHistory: NavigationState[] = [START_STATE];

let index = 0;

export const navigationReload = () => {
  const elements: Element[] = Array.from(
    document.getElementsByClassName('navigation')
  );
  document.removeEventListener('keydown', handleKeydown);
  navigation = new Navigation(elements);
  document.addEventListener('keydown', handleKeydown);
  navigation.focus();
};

softwareKeysStore.subscribe((value: SoftwareKeysState) => {
  leftKey = value.leftKey?.onClick;
  middleKey = value.middleKey?.onClick;
  rightKey = value.rightKey?.onClick;
});

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
  pushState({ ...stateHistory[index], menu, onboardState: undefined });
}

export function pushAccountAction(action: AccountAction): void {
  pushState({ ...stateHistory[index], accountAction: action });
}

export function pushToast(state: ToastState): void {
  toastStore.set(state);
}

export function clearState(): void {
  stateHistory = [];
  index = 0;
}

export function pushOnboardState(updated: OnboardState): void {
  let state: NavigationState = stateHistory[index];
  pushState({ ...state, onboardState: updated });
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
      if (navigation.navigatesInInputField()) {
        break;
      } else if (navigation.selection()) {
        navigation.selection().click();
      }
      e.preventDefault();
      break;
    case 'ArrowLeft':
      if (
        navigation.navigatesInInputField() &&
        navigation.preventBackspaceInInputField()
      ) {
        break;
      } else {
        popState();
        e.preventDefault();
      }
      break;
    case 'Backspace':
      if (navigation.preventBackspaceInInputField()) {
        break;
      } else if (popState()) {
        e.preventDefault();
      }
      break;
    case 'Enter':
      if (middleKey) {
        middleKey();
      } else if (navigation.selection()) {
        navigation.selection().click();
      }
      e.preventDefault();
      break;
    case 'SoftLeft':
      if (leftKey) {
        leftKey();
        e.preventDefault();
      }
      break;
    case 'SoftRight':
      if (rightKey) {
        rightKey();
        e.preventDefault();
      }
      break;
  }
}
