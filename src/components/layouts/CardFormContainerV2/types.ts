import type { CardProps } from '@/components/common/CardV2/types'
import type { StepperStep } from '@/components/common/StepperV2/types'

export type CardFormContainerLayout = 'column' | 'row'

export type CardFormContainerProps = CardProps & {
  steps: StepperStep[]
  activeStep: number
  layout?: CardFormContainerLayout
  loading?: boolean
}

export type CardFormContainerOwnProps = {
  steps: StepperStep[]
  activeStep: number
  layout?: CardFormContainerLayout
  loading?: boolean
  heading: CardProps['heading']
  showDescription?: CardProps['showDescription']
  description?: CardProps['description']
  contentVariant?: CardProps['contentVariant']
  headingLevel?: CardProps['headingLevel']
}
