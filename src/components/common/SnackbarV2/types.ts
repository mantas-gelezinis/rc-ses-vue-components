export enum SnackbarState {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  ActionNeeded = 'action-needed',
}

export type SnackbarProps = {
  state: `${SnackbarState}`
  message: string
  modelValue?: boolean
  showAction?: boolean
  actionLabel?: string
  showClose?: boolean
  duration?: number
  persist?: boolean
  dismissOnAction?: boolean
  contained?: boolean
}
