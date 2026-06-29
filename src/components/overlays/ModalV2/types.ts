import type { VDialog } from 'vuetify/components'

export type ModalType = 'destructive' | 'confirm' | 'success' | 'info'

export type ModalSize = 'sm' | 'md' | 'lg'

export interface ModalProps {
  // Custom design system props
  title: string
  type?: ModalType
  showIcon?: boolean
  size?: ModalSize
  primaryActionLabel?: string
  secondaryActionLabel?: string
  modelValue?: boolean
  persistent?: boolean

  // Extended VDialog props for Vuetify parity
  activator?: VDialog['$props']['activator']
  attach?: VDialog['$props']['attach']
  closeOnBack?: VDialog['$props']['closeOnBack']
  closeOnContentClick?: VDialog['$props']['closeOnContentClick']
  contained?: VDialog['$props']['contained']
  contentClass?: VDialog['$props']['contentClass']
  contentProps?: VDialog['$props']['contentProps']
  eager?: VDialog['$props']['eager']
  fullscreen?: VDialog['$props']['fullscreen']
  height?: VDialog['$props']['height']
  maxHeight?: VDialog['$props']['maxHeight']
  maxWidth?: VDialog['$props']['maxWidth']
  minHeight?: VDialog['$props']['minHeight']
  minWidth?: VDialog['$props']['minWidth']
  noClickAnimation?: VDialog['$props']['noClickAnimation']
  retainFocus?: VDialog['$props']['retainFocus']
  scrollable?: VDialog['$props']['scrollable']
  scrim?: VDialog['$props']['scrim']
  transition?: VDialog['$props']['transition']
  width?: VDialog['$props']['width']
  zIndex?: VDialog['$props']['zIndex']
}
