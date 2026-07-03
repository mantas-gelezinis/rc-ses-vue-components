type ToggleLabelProps =
  | { label: string; ariaLabel?: string }
  | { label?: string; ariaLabel: string }

export type ToggleProps = ToggleLabelProps & {
  showLabel?: boolean
  disabled?: boolean
  readonly?: boolean
}
