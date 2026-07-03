import type {
  CardFooterProps,
  CardHeadingLevel,
  CardProps,
} from '@/components/common/CardV2/types'

export type CardDefaultsType = {
  showDescription: boolean
  contentVariant: CardProps['contentVariant']
  headingLevel: CardHeadingLevel
}

export const cardDefaults = {
  showDescription: true,
  contentVariant: 'default',
  headingLevel: 2,
} satisfies CardDefaultsType

export type CardFooterDefaultsType = {
  variant: CardFooterProps['variant']
  showBackAction: boolean
  showSecondaryAction: boolean
  showPrice: boolean
  primaryDisabled: boolean
  secondaryDisabled: boolean
  backDisabled: boolean
}

export const cardFooterDefaults = {
  variant: 'step-n',
  showBackAction: true,
  showSecondaryAction: true,
  showPrice: true,
  primaryDisabled: false,
  secondaryDisabled: false,
  backDisabled: false,
} satisfies CardFooterDefaultsType
