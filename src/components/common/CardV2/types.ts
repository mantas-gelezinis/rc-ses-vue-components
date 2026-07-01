export type CardContentVariant =
  | 'default'
  | 'form-stack'
  | 'radio-list'
  | 'item-list'
  | 'empty'
  | 'review'

export type CardFooterVariant = 'step-1' | 'step-n' | 'final' | 'custom'

export type CardHeadingLevel = 2 | 3 | 4 | 5 | 6

export interface CardProps {
  heading: string
  showDescription?: boolean
  description?: string
  contentVariant?: CardContentVariant
  headingLevel?: CardHeadingLevel
  showFooter?: boolean
  variant?: CardFooterVariant
}

export interface CardFooterProps {
  variant?: CardFooterVariant
  showBackAction?: boolean
  showSecondaryAction?: boolean
  showPrice?: boolean
  price?: number
  priceLabel?: string
  backLabel?: string
  primaryLabel?: string
  secondaryLabel?: string
  cancelLabel?: string
  primaryDisabled?: boolean
  secondaryDisabled?: boolean
  backDisabled?: boolean
}

export interface CardPriceBeforeTaxesProps {
  price: number
  label?: string
}
