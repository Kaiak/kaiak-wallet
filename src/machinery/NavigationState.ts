export type MenuSelector = 'wallet' | 'setup' | 'menu' | 'about'

export interface NavigationState {
    menu: MenuSelector
}
