import type { VBtn } from 'vuetify/components'

import type { ButtonSize, ButtonVariants } from '@/components/common/buttonV2/types'

export type ButtonDefaultsType = {
  variant: ButtonVariants
  size: ButtonSize
  disabled: boolean
  density: NonNullable<VBtn['$props']['density']>
  flat: boolean
}

const buttonDefaults = {
  variant: 'primary',
  size: 'regular',
  disabled: false,
  density: 'default',
  flat: false,
} satisfies ButtonDefaultsType

export default buttonDefaults
