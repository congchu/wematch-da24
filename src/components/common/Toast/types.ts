export type ToastType = 'detail' | 'success' | 'error'

export interface Props {
  message: string;
  type?: ToastType;
  duration?: number;
}
