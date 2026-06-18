import type { VChip } from 'vuetify/components'

export type BadgeType = 'neutral' | 'success' | 'warning' | 'error' | 'info' | 'brand'
export type BadgeSize = 'small' | 'regular'

export interface BadgeProps {
  // Custom design system props
  type?: BadgeType
  size?: BadgeSize
  showIcon?: boolean | string
  showClose?: boolean
  /** Screen reader label, e.g. "Status: Registered" for status badges */
  accessibleLabel?: string

  // Extended VChip props for Vuetify parity
  active?: VChip['$props']['active']
  appendIcon?: VChip['$props']['appendIcon']
  border?: VChip['$props']['border']
  closable?: VChip['$props']['closable']
  closeIcon?: VChip['$props']['closeIcon']
  color?: VChip['$props']['color']
  density?: VChip['$props']['density']
  disabled?: VChip['$props']['disabled']
  draggable?: VChip['$props']['draggable']
  elevation?: VChip['$props']['elevation']
  filter?: VChip['$props']['filter']
  filterIcon?: VChip['$props']['filterIcon']
  label?: VChip['$props']['label']
  link?: VChip['$props']['link']
  modelValue?: VChip['$props']['modelValue']
  prependIcon?: VChip['$props']['prependIcon']
  ripple?: VChip['$props']['ripple']
  tag?: VChip['$props']['tag']
  theme?: VChip['$props']['theme']
  variant?: VChip['$props']['variant']
}
