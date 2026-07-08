import type { StepperStepState } from '@/components/common/StepperV2/types'

export const getStepState = (
  index: number,
  activeStep: number,
  loading: boolean,
): StepperStepState => {
  if (index < activeStep) {
    return 'completed'
  }

  if (index === activeStep) {
    return loading ? 'loading' : 'active'
  }

  return 'disabled'
}

export const getStepPlacement = (
  index: number,
  total: number,
): 'first' | 'middle' | 'last' | 'only' => {
  if (total <= 1) {
    return 'only'
  }

  if (index === 0) {
    return 'first'
  }

  if (index === total - 1) {
    return 'last'
  }

  return 'middle'
}

export const isStepClickable = (
  index: number,
  activeStep: number,
  interactive: boolean,
) => interactive && index <= activeStep

export const isLeadingConnectorCompleted = (
  index: number,
  activeStep: number,
  loading: boolean,
) => {
  if (index === 0) {
    return false
  }

  if (loading && index === activeStep) {
    return false
  }

  return index <= activeStep
}

export const isTrailingConnectorCompleted = (
  index: number,
  activeStep: number,
  loading: boolean,
) => {
  if (loading && (index === activeStep || index === activeStep - 1)) {
    return false
  }

  return index < activeStep
}
