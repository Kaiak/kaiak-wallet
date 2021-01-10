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
  | 'transaction'
  | 'receive'
  | 'send_qr'
  | 'send_address'
  | 'settings';

export type OnboardView =
  | 'start'
  | 'intro'
  | 'disclaimer'
  | 'seed'
  | 'account'
  | 'pin'
  | 'disclaimer-import'
  | 'keyboard-change'
  | 'input-import';

export type SetupAction = 'menu' | 'export-seed';

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
  setupAction?: SetupAction;
}

export const START_STATE: NavigationState = {
  menu: 'unlock',
  accountAction: undefined,
  onboardState: undefined,
  setupAction: undefined,
};
