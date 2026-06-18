import type { VChip } from 'vuetify/components'

import type { BadgeSize, BadgeType } from './types'

export default {
  // Custom design system props
  type: 'neutral' as BadgeType,
  size: 'regular' as BadgeSize,
  showIcon: false,
  showClose: false,

  // Extended VChip props for Vuetify parity
  border: undefined,
  closable: undefined,
  closeIcon: undefined,
  color: undefined,
  density: 'default' as VChip['$props']['density'],
  disabled: false,
  draggable: false,
  elevation: undefined,
  filter: false,
  filterIcon: undefined,
  label: false,
  link: false,
  modelValue: true,
  prependIcon: undefined,
  appendIcon: undefined,
  ripple: true,
  tag: 'span',
  theme: undefined,
  variant: 'outlined' as VChip['$props']['variant'],
}
