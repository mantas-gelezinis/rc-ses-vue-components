import type { AdvancedListVariant } from '@/components/common/AdvancedListV2/types'

export type AdvancedListDefaultsType = {
  variant: AdvancedListVariant
  listbox: boolean
  multiselectable: boolean
  framed: boolean
}

const advancedListV2Defaults = {
  variant: 'card',
  listbox: false,
  multiselectable: false,
  framed: false,
} satisfies AdvancedListDefaultsType

export default advancedListV2Defaults
