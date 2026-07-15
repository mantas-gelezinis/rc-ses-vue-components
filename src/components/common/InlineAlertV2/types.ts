export enum InlineAlertType {
  Neutral = 'neutral',
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

export type InlineAlertProps = {
  type?: `${InlineAlertType}`
  message?: string
  showIcon?: boolean
  showClose?: boolean
  showAction?: boolean
  actionLabel?: string
}
