export type CheckboxDefaultsType = {
  showLabel: boolean
  disabled: boolean
  indeterminate: boolean
  loading: boolean
  error: boolean
}

const checkboxV2Defaults = {
  showLabel: true,
  disabled: false,
  indeterminate: false,
  loading: false,
  error: false,
} satisfies CheckboxDefaultsType

export default checkboxV2Defaults
