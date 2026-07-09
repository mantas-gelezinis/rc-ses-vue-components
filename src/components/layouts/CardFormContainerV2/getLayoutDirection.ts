import { StepperOrientation } from '@/components/common/StepperV2/types'
import type { CardFormContainerLayout } from '@/components/layouts/CardFormContainerV2/types'

export const MAX_STEPS_FOR_COLUMN_LAYOUT = 4
export const MAX_STEPS_WITHOUT_STEPPER = 2

export function getLayoutDirection(
  stepsCount: number,
  layout?: CardFormContainerLayout,
): CardFormContainerLayout {
  if (layout != null) {
    return layout
  }

  if (stepsCount > MAX_STEPS_FOR_COLUMN_LAYOUT) {
    return 'row'
  }

  return 'column'
}

export function shouldShowStepper(stepsCount: number): boolean {
  return stepsCount > MAX_STEPS_WITHOUT_STEPPER
}

export function getStepperOrientation(
  layoutDirection: CardFormContainerLayout,
): StepperOrientation {
  return layoutDirection === 'row'
    ? StepperOrientation.Vertical
    : StepperOrientation.Horizontal
}
