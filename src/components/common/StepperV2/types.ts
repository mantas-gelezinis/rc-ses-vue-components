export type StepperOrientation = 'horizontal' | 'vertical'

export type StepperStepState = 'completed' | 'active' | 'disabled' | 'loading'

export type StepperStepPlacement = 'first' | 'middle' | 'last' | 'only'

export type StepperStep = {
  id: string
  label: string
}

export type StepperProps = {
  steps: StepperStep[]
  activeStep: number
  orientation?: StepperOrientation
  loading?: boolean
}

export type StepperOwnProps = {
  steps: StepperStep[]
  activeStep: number
  orientation?: StepperOrientation
  loading?: boolean
}
