import type { NanoAccount, NanoTransaction, NanoWallet } from './models';

export type MenuSelector =
  | 'wallet'
  | 'setup'
  | 'menu'
  | 'about'
  | 'unlock'
  | 'create'
  | 'onboard';
export type AccountAction = 'send' | 'transactions' | 'receive';

export type SendAction = 'qr' | 'address';

export interface SelectedAccountState {
  selectedAccount: NanoAccount;
  view: AccountAction | undefined;
  selectedTransaction: NanoTransaction | undefined;
}

export type OnboardView = 'start' | 'disclaimer' | 'seed' | 'account';

export interface OnboardState {
  view: OnboardView;
}

export interface NavigationState {
  menu: MenuSelector;
  account: SelectedAccountState | undefined;
  wallet: NanoWallet | undefined;
  onboardState: OnboardState | undefined;
}

export const START_STATE: NavigationState = {
  menu: 'onboard',
  account: undefined,
  wallet: undefined,
  onboardState: undefined,
};
