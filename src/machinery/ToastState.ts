type ToastType = 'info' | 'warn' | 'success';

export interface ToastState {
  languageId: string | null;
  type?: ToastType;
}
