export type ToastType = 'detail' | 'success' | 'error'
export type PositionType = 'bottom' | 'navigator'

export interface Props {
  message: string;
  type?: ToastType;
  duration?: number;
  position?: PositionType
}
