export type ToggleDefaultsType = {
  showLabel: boolean
  disabled: boolean
  readonly: boolean
}

const toggleDefaults = {
  showLabel: true,
  disabled: false,
  readonly: false,
} satisfies ToggleDefaultsType

export default toggleDefaults
