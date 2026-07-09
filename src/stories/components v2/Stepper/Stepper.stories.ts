import type { Meta, StoryFn } from '@storybook/vue3'
import { ref } from 'vue'

import RcSesStepperV2 from '@/components/common/StepperV2/RcSesStepperV2.vue'
import { StepperOrientation, type StepperStep } from '@/components/common/StepperV2/types'

const horizontalSteps: StepperStep[] = [
  { id: '1', label: 'Duomenys' },
  { id: '2', label: 'Patikra' },
  { id: '3', label: 'Patvirtinimas' },
]

const verticalSteps: StepperStep[] = [
  { id: '1', label: 'Pirmas žingsnis' },
  { id: '2', label: 'Antras žingsnis' },
  { id: '3', label: 'Trečias žingsnis' },
  { id: '4', label: 'Ketvirtas žingsnis' },
  { id: '5', label: 'Penktas žingsnis' },
]

const meta: Meta<typeof RcSesStepperV2> = {
  title: 'componentsV2/Stepper',
  component: RcSesStepperV2,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: [StepperOrientation.Horizontal, StepperOrientation.Vertical],
    },
    loading: { control: 'boolean' },
    activeStep: { control: { type: 'number', min: 0, max: 4 } },
  },
}

export default meta

type Story = StoryFn<typeof RcSesStepperV2>

const Template: Story = (args) => ({
  components: { RcSesStepperV2 },
  setup() {
    const activeStep = ref(args.activeStep ?? 0)

    const handleStepClick = (index: number) => {
      activeStep.value = index
    }

    return { args, activeStep, handleStepClick }
  },
  template: `
    <RcSesStepperV2
      v-bind="args"
      :active-step="activeStep"
      @step-click="handleStepClick"
    />
  `,
})

export const Horizontal = Template.bind({})
Horizontal.args = {
  steps: horizontalSteps,
  orientation: StepperOrientation.Horizontal,
  activeStep: 1,
  loading: false,
}

export const Vertical = Template.bind({})
Vertical.args = {
  steps: verticalSteps,
  orientation: StepperOrientation.Vertical,
  activeStep: 2,
  loading: false,
}

export const Loading = Template.bind({})
Loading.args = {
  steps: horizontalSteps,
  orientation: StepperOrientation.Horizontal,
  activeStep: 1,
  loading: true,
}

export const FiveSteps = Template.bind({})
FiveSteps.args = {
  steps: [
    { id: '1', label: 'Žingsnis 1' },
    { id: '2', label: 'Žingsnis 2' },
    { id: '3', label: 'Žingsnis 3' },
    { id: '4', label: 'Žingsnis 4' },
    { id: '5', label: 'Žingsnis 5' },
  ],
  orientation: StepperOrientation.Horizontal,
  activeStep: 2,
  loading: false,
}
