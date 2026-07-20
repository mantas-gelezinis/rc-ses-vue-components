export type ChipSelectOption = {
  text: string
  value: string | number
}

export type ChipSelectProps = {
  options: ChipSelectOption[]
  disabled?: boolean
  accessibleLabel?: string
}
