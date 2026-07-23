import { LoaderSize } from '@/components/common/LoaderV2/types'

export type LoaderDefaultsType = {
  size: `${LoaderSize}`
  showLabel: boolean
}

const loaderV2Defaults = {
  size: LoaderSize.Medium,
  showLabel: true,
} satisfies LoaderDefaultsType

export default loaderV2Defaults
