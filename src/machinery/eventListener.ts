import { toastStore } from '../stores/stores';
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
import { NavigationStack } from './Stack';

let navigation: Navigation = new Navigation([]);

let middleKey: (() => Promise<void>) | undefined = undefined;
let leftKey: (() => Promise<void>) | undefined = undefined;
let rightKey: (() => Promise<void>) | undefined = undefined;

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

const stack = new NavigationStack();

export function popState(): boolean {
  return stack.pop() !== undefined;
}
export function pushMenu(menu: MenuSelector): void {
  pushState({ ...stateHistory[index], menu, onboardState: undefined });
}

export function pushAccountAction(action: AccountAction): void {
  stack.patch((current: NavigationState | undefined) => {
    return { ...current, accountAction: action };
  });
}

export function pushToast(state: ToastState): void {
  toastStore.set(state);
}

export function clearState(): void {
  stateHistory = [];
  index = -1;
}

export function pushOnboardState(updated: OnboardState): void {
  let state: NavigationState = stateHistory[index];
  pushState({ ...state, onboardState: updated });
}

export function pushState(state: NavigationState): void {
  stack.push(state);
}

export async function handleKeydown(e) {
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
