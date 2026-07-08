import type { StepperOrientation } from '@/components/common/StepperV2/types'
import type { CardFormContainerLayout } from '@/components/layouts/CardFormContainerV2/types'

export function getLayoutDirection(
  stepsCount: number,
  layout?: CardFormContainerLayout,
): CardFormContainerLayout {
  if (layout != null) {
    return layout
  }

  if (stepsCount > 4) {
    return 'row'
  }

  return 'column'
}

export function shouldShowStepper(stepsCount: number): boolean {
  return stepsCount > 2
}

export function getStepperOrientation(
  layoutDirection: CardFormContainerLayout,
): StepperOrientation {
  return layoutDirection === 'row' ? 'vertical' : 'horizontal'
}
