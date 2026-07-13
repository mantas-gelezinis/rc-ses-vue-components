import { FullPageLoaderBackdrop } from '@/components/common/FullPageLoaderV2/types'

export type FullPageLoaderDefaultsType = {
  backdrop: `${FullPageLoaderBackdrop}`
  showLabel: boolean
  modelValue: boolean
  contained: boolean
}

const fullPageLoaderV2Defaults = {
  backdrop: FullPageLoaderBackdrop.Dark,
  showLabel: true,
  modelValue: true,
  contained: false,
} satisfies FullPageLoaderDefaultsType

export default fullPageLoaderV2Defaults
