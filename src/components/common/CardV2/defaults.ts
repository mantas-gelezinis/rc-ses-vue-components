import type {
  CardFooterProps,
  CardHeadingLevel,
  CardProps,
} from '@/components/common/CardV2/types'

export type CardDefaultsType = {
  showDescription: boolean
  contentVariant: CardProps['contentVariant']
  headingLevel: CardHeadingLevel
  showFooter: boolean
  variant: CardProps['variant']
}

const cardDefaults = {
  showDescription: true,
  contentVariant: 'default',
  headingLevel: 2,
  showFooter: true,
  variant: 'step-n',
} satisfies CardDefaultsType

export type CardFooterDefaultsType = {
  variant: CardFooterProps['variant']
  showBackAction: boolean
  showSecondaryAction: boolean
  showPrice: boolean
  price: number
  primaryDisabled: boolean
  secondaryDisabled: boolean
  backDisabled: boolean
}

export const cardFooterDefaults = {
  variant: 'step-n',
  showBackAction: true,
  showSecondaryAction: true,
  showPrice: true,
  price: 0,
  primaryDisabled: false,
  secondaryDisabled: false,
  backDisabled: false,
} satisfies CardFooterDefaultsType

export default cardDefaults
