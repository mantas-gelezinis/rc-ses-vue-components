import type { VNodeProps } from 'vue'
import type { VSwitch } from 'vuetify/components'

type VSwitchPublicProps = Omit<
  Partial<VSwitch['$props']>,
  | keyof VNodeProps
  | 'inset'
  | 'flat'
  | 'hideDetails'
  | 'label'
  | 'color'
  | '$children'
  | 'v-slots'
  | 'v-slot:default'
  | 'v-slot:label'
  | 'v-slot:thumb'
>

export type ToggleProps = VSwitchPublicProps & {
  label?: string
  showLabel?: boolean
  accessibleLabel?: string
}

export type ToggleOwnProps = {
  label?: string
  showLabel?: boolean
  accessibleLabel?: string
  disabled?: VSwitch['$props']['disabled']
  readonly?: VSwitch['$props']['readonly']
}
