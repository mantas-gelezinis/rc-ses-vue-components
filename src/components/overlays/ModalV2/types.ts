import type { VDialog } from 'vuetify/components'

type VDialogProps = InstanceType<typeof VDialog>['$props']

export type ModalType = 'destructive' | 'confirm' | 'success' | 'info'

export type ModalSize = 'sm' | 'md' | 'lg'

type ModalVDialogProps = Pick<
  VDialogProps,
  | 'activator'
  | 'attach'
  | 'closeOnBack'
  | 'closeOnContentClick'
  | 'contained'
  | 'contentClass'
  | 'contentProps'
  | 'eager'
  | 'fullscreen'
  | 'height'
  | 'maxHeight'
  | 'maxWidth'
  | 'minHeight'
  | 'minWidth'
  | 'noClickAnimation'
  | 'retainFocus'
  | 'scrollable'
  | 'scrim'
  | 'transition'
  | 'width'
  | 'zIndex'
>

export interface ModalProps extends /* @vue-ignore */ ModalVDialogProps {
  // Custom design system props
  title: string
  type?: ModalType
  showIcon?: boolean
  size?: ModalSize
  primaryActionLabel?: string
  secondaryActionLabel?: string
  modelValue?: boolean
  persistent?: boolean
}
