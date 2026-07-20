import { SNACKBAR_DURATION } from './config'

export type SnackbarDefaultsType = {
  modelValue: boolean
  showAction: boolean
  actionLabel: string
  showClose: boolean
  duration: number
  dismissOnAction: boolean
  contained: boolean
}

const snackbarV2Defaults = {
  modelValue: false,
  showAction: false,
  actionLabel: '',
  showClose: true,
  duration: SNACKBAR_DURATION,
  dismissOnAction: true,
  contained: false,
} satisfies SnackbarDefaultsType

export default snackbarV2Defaults
