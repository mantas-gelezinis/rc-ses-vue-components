import type { StepperOrientation } from '@/components/common/StepperV2/types'

export type StepperDefaultsType = {
  orientation: StepperOrientation
  loading: boolean
}

const stepperDefaults = {
  orientation: 'horizontal',
  loading: false,
} satisfies StepperDefaultsType

export default stepperDefaults
