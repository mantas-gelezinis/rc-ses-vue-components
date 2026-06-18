import type { VBtn } from 'vuetify/components'

import type { ColorType } from '@/types/common/ColorType'

export type ButtonVariants = 'primary' | 'secondary' | 'error' | 'link'
export type ButtonSize = 'small' | 'regular'

export interface ButtonProps {
  accessibleLabel?: string
  appendIcon?: VBtn['$props']['appendIcon']
  baseColor?: VBtn['$props']['baseColor']
  block?: VBtn['$props']['block']
  border?: VBtn['$props']['border']
  color?: ColorType
  density?: VBtn['$props']['density']
  disabled?: VBtn['$props']['disabled']
  elevation?: VBtn['$props']['elevation']
  exact?: VBtn['$props']['exact']
  flat?: VBtn['$props']['flat']
  height?: VBtn['$props']['height']
  href?: VBtn['$props']['href']
  icon?: VBtn['$props']['icon']
  loading?: VBtn['$props']['loading']
  location?: VBtn['$props']['location']
  maxHeight?: VBtn['$props']['maxHeight']
  maxWidth?: VBtn['$props']['maxWidth']
  minHeight?: VBtn['$props']['minHeight']
  minWidth?: VBtn['$props']['minWidth']
  position?: VBtn['$props']['position']
  prependIcon?: VBtn['$props']['prependIcon']
  readonly?: VBtn['$props']['readonly']
  replace?: VBtn['$props']['replace']
  selectedClass?: VBtn['$props']['selectedClass']
  size?: ButtonSize
  stacked?: VBtn['$props']['stacked']
  symbol?: VBtn['$props']['symbol']
  tag?: VBtn['$props']['tag']
  text?: VBtn['$props']['text']
  theme?: VBtn['$props']['theme']
  tile?: VBtn['$props']['tile']
  to?: VBtn['$props']['to']
  value?: VBtn['$props']['value']
  variant?: ButtonVariants
  width?: VBtn['$props']['width']
}
