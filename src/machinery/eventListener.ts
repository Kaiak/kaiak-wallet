import { toastStore } from '../stores/stores';
import { Navigation } from './navigation';
import type {
  AccountAction,
  MenuSelector,
  NavigationState,
  OnboardState,
} from './NavigationState';
import type { SoftwareKeysState } from './SoftwareKeysState';
import type { ToastState } from './ToastState';
import { setSoftwareKeys, softwareKeysStore } from './SoftwareKeysState';
import { NavigationStack } from './NavigationStack';
import { walletExists } from './secure-storage';

let navigation: Navigation = new Navigation([]);

let middleKey: (() => Promise<void>) | undefined = undefined;
let leftKey: (() => Promise<void>) | undefined = undefined;
let rightKey: (() => Promise<void>) | undefined = undefined;

let stack = new NavigationStack();

/** Asking for permissions blurs / focuses screen, we need to ignore on those events */
export function ignoreOnCameraBlur(): boolean {
  let current = stack.peek();
  return current?.menu === 'account' && current?.accountAction === 'send_qr';
}

export const loadStartScreen = async () => {
  const exists = await walletExists();
  if (exists) {
    pushMenu('unlock');
  } else {
    pushMenu('onboard');
  }
};

export const navigationReload = (value: SoftwareKeysState = undefined) => {
  const elements: Element[] = Array.from(
    document.getElementsByClassName('navigation')
  );
  document.removeEventListener('keydown', handleKeydown);
  navigation = new Navigation(elements);
  document.addEventListener('keydown', handleKeydown);
  navigation.focus();
  if (value) {
    setSoftwareKeys(value);
  }
};

softwareKeysStore.subscribe((value: SoftwareKeysState) => {
  leftKey = value.leftKey?.onClick;
  middleKey = value.middleKey?.onClick;
  rightKey = value.rightKey?.onClick;
});

export function reset(): void {
  stack = new NavigationStack();
}

export function back(): boolean {
  return stack.pop() !== undefined;
}
export function pushMenu(menu: MenuSelector): void {
  stack.pushOn((current: NavigationState | undefined) => {
    return { ...current, menu, onboardState: undefined };
  });
}
export function pushAccountAction(action: AccountAction): void {
  stack.pushOn((current: NavigationState | undefined) => {
    return { ...current, accountAction: action };
  });
}
export function pushOnboardState(updated: OnboardState): void {
  stack.pushOn((current: NavigationState | undefined) => {
    return { ...current, onboardState: updated };
  });
}

export function pushState(state: NavigationState): void {
  stack.push(state);
}

export function pushToast(state: ToastState): void {
  toastStore.set(state);
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
      if (navigation.navigatesInInputField()) {
        break;
      } else if (back()) {
        e.preventDefault();
      }
      break;
    case 'Backspace':
      if (navigation.preventBackspaceInInputField()) {
        break;
      } else if (back()) {
        e.preventDefault();
      }
      break;
    case 'Enter':
      if (middleKey) {
        await middleKey();
      } else if (navigation.selection()) {
        navigation.selection().click();
      }
      e.preventDefault();
      break;
    case 'SoftLeft':
      if (leftKey) {
        await leftKey();
        e.preventDefault();
      }
      break;
    case 'SoftRight':
      if (rightKey) {
        await rightKey();
        e.preventDefault();
      }
      break;
  }
}
