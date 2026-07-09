import type { VNodeProps } from 'vue'
import type { VBtn } from 'vuetify/components'

export type ButtonVariants = 'primary' | 'secondary' | 'error' | 'link'
export type ButtonSize = 'small' | 'regular'

type VBtnPublicProps = Omit<
  Partial<VBtn['$props']>,
  | keyof VNodeProps
  | 'size'
  | 'variant'
  | '$children'
  | 'v-slots'
  | 'v-slot:default'
  | 'v-slot:prepend'
  | 'v-slot:append'
  | 'v-slot:loader'
>

export type ButtonProps = VBtnPublicProps & {
  /** Screen reader label, e.g. for icon-only buttons without visible text */
  accessibleLabel?: string
  size?: ButtonSize
  variant?: ButtonVariants
}

/** Props declared at runtime; remaining VBtn props pass through via attrs. */
export type ButtonOwnProps = {
  accessibleLabel?: string
  variant?: ButtonVariants
  size?: ButtonSize
  loading?: VBtn['$props']['loading']
  icon?: VBtn['$props']['icon']
  prependIcon?: VBtn['$props']['prependIcon']
  appendIcon?: VBtn['$props']['appendIcon']
  disabled?: VBtn['$props']['disabled']
  density?: VBtn['$props']['density']
  flat?: VBtn['$props']['flat']
}
