import {
  StepperStepPlacement,
  StepperStepState,
} from '@/components/common/StepperV2/types'

export const getStepState = (
  index: number,
  activeStep: number,
  loading: boolean,
): StepperStepState => {
  if (index < activeStep) {
    return StepperStepState.Completed
  }

  if (index === activeStep) {
    return loading ? StepperStepState.Loading : StepperStepState.Active
  }

  return StepperStepState.Disabled
}

export const getStepPlacement = (index: number, total: number): StepperStepPlacement => {
  if (total <= 1) {
    return StepperStepPlacement.Only
  }

  if (index === 0) {
    return StepperStepPlacement.First
  }

  if (index === total - 1) {
    return StepperStepPlacement.Last
  }

  return StepperStepPlacement.Middle
}

export const isStepClickable = (
  index: number,
  activeStep: number,
  interactive: boolean,
): boolean => interactive && index <= activeStep

export const isLeadingConnectorCompleted = (
  index: number,
  activeStep: number,
  loading: boolean,
): boolean => {
  const isFirstStep = index === 0
  const isLoadingCurrentStep = loading && index === activeStep

  return !isFirstStep && !isLoadingCurrentStep && index <= activeStep
}

export const isTrailingConnectorCompleted = (
  index: number,
  activeStep: number,
  loading: boolean,
): boolean => {
  if (loading && (index === activeStep || index === activeStep - 1)) {
    return false
  }

  return index < activeStep
}
