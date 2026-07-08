import type { CardFormContainerOwnProps } from '@/components/layouts/CardFormContainerV2/types'

export type CardFormContainerDefaultsType = {
  showDescription: boolean
  contentVariant: CardFormContainerOwnProps['contentVariant']
  headingLevel: CardFormContainerOwnProps['headingLevel']
  loading: boolean
}

export const cardFormContainerDefaults = {
  showDescription: true,
  contentVariant: 'default',
  headingLevel: 2,
  loading: false,
} as const
