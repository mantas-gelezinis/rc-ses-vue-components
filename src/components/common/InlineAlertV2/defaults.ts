import { InlineAlertType } from '@/components/common/InlineAlertV2/types'

export type InlineAlertDefaultsType = {
  type: `${InlineAlertType}`
  showIcon: boolean
  showClose: boolean
  showAction: boolean
  actionLabel: string
}

const inlineAlertV2Defaults = {
  type: InlineAlertType.Neutral,
  showIcon: true,
  showClose: true,
  showAction: false,
  actionLabel: '',
} satisfies InlineAlertDefaultsType

export default inlineAlertV2Defaults
