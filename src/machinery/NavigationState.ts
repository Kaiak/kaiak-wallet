import type { WalletResult } from './wallet';

export type MenuSelector =
  | 'wallet'
  | 'setup'
  | 'menu'
  | 'about'
  | 'unlock'
  | 'onboard';
export type AccountAction =
  | 'overview'
  | 'send'
  | 'transactions'
  | 'receive'
  | 'send_qr'
  | 'send_address';

export type OnboardView = 'start' | 'disclaimer' | 'seed' | 'account' | 'pin';

export interface OnboardState {
  view: OnboardView;
  walletResult: WalletResult;
  alias: string;
}

export interface NavigationState {
  menu: MenuSelector;
  accountAction: AccountAction;
  onboardState: OnboardState | undefined;
}

export const START_STATE: NavigationState = {
  menu: 'unlock',
  accountAction: undefined,
  onboardState: undefined,
};
