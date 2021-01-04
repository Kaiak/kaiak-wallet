import type { WalletResult } from './wallet';

export type MenuSelector =
  | 'accounts'
  | 'account'
  | 'setup'
  | 'menu'
  | 'about'
  | 'unlock'
  | 'onboard'
  | 'import';
export type AccountAction =
  | 'menu'
  | 'send'
  | 'transactions'
  | 'receive'
  | 'send_qr'
  | 'send_address';

export type OnboardView =
  | 'start'
  | 'disclaimer'
  | 'seed'
  | 'account'
  | 'pin'
  | 'disclaimer-import'
  | 'input-import';

export interface OnboardState {
  view: OnboardView;
  walletResult?: WalletResult;
  alias?: string;
  attemptedSeedImport?: string;
}

export interface NavigationState {
  menu: MenuSelector;
  accountAction: AccountAction;
  onboardState?: OnboardState;
}

export const START_STATE: NavigationState = {
  menu: 'unlock',
  accountAction: undefined,
  onboardState: undefined,
};
