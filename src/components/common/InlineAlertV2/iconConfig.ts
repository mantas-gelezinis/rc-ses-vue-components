import { InlineAlertType } from '@/components/common/InlineAlertV2/types'

export const inlineAlertIcons: Record<`${InlineAlertType}`, string> = {
  [InlineAlertType.Neutral]: '$infoRegular',
  [InlineAlertType.Info]: '$infoRegular',
  [InlineAlertType.Success]: '$checkCircle',
  [InlineAlertType.Warning]: '$warningRegular',
  [InlineAlertType.Error]: '$warningCircle',
}

export const assertiveInlineAlertTypes = new Set<`${InlineAlertType}`>([
  InlineAlertType.Warning,
  InlineAlertType.Error,
])
