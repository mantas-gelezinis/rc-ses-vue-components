export enum StepperOrientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export enum StepperStepState {
  Completed = 'completed',
  Active = 'active',
  Disabled = 'disabled',
  Loading = 'loading',
}

export enum StepperStepPlacement {
  First = 'first',
  Middle = 'middle',
  Last = 'last',
  Only = 'only',
}

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
