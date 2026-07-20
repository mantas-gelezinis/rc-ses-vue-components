import type { ChipSelectOption } from '@/components/common/ChipSelectV2/types'

export type ChipSelectDefaultsType = {
  options: () => ChipSelectOption[]
  disabled: boolean
}

const chipSelectV2Defaults = {
  options: () => [],
  disabled: false,
} satisfies ChipSelectDefaultsType

export default chipSelectV2Defaults
