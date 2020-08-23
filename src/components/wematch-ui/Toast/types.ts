export type ToastType = 'default'| 'error' | 'success' | 'warning' | 'info'

export interface Props {
  message: string;
  type?: ToastType;
  duration?: number;
  style?: React.CSSProperties;
}
