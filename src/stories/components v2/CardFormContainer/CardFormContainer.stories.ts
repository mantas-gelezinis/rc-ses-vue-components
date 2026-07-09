import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

import RcSesCardFooterV2 from '@/components/common/CardV2/RcSesCardFooterV2.vue'
import type { StepperStep } from '@/components/common/StepperV2/types'
import RcSesCardFormContainerV2 from '@/components/layouts/CardFormContainerV2/RcSesCardFormContainerV2.vue'

const shortSteps: StepperStep[] = [
  { id: '1', label: 'Service' },
  { id: '2', label: 'Details' },
  { id: '3', label: 'Confirmation' },
]

const longSteps: StepperStep[] = [
  { id: '1', label: 'Service' },
  { id: '2', label: 'Details' },
  { id: '3', label: 'Documents' },
  { id: '4', label: 'Payment' },
  { id: '5', label: 'Confirmation' },
]

const meta: Meta<typeof RcSesCardFormContainerV2> = {
  title: 'componentsV2/CardFormContainer',
  component: RcSesCardFormContainerV2,
  tags: ['autodocs'],
  argTypes: {
    steps: { table: { disable: true } },
    activeStep: { table: { disable: true } },
    layout: {
      control: 'select',
      options: ['column', 'row'],
    },
    loading: { control: 'boolean' },
    heading: { control: 'text' },
    showDescription: { control: 'boolean' },
    description: { control: 'text' },
  },
}

export default meta

type Story = StoryObj<typeof RcSesCardFormContainerV2>

const renderDemo = (steps: StepperStep[]) =>
  function render(args: Story['args']) {
    return {
      components: {
        RcSesCardFormContainerV2,
        RcSesCardFooterV2,
      },
      setup() {
        const activeStep = ref(0)
        const demoSteps = steps

        const handleBack = () => {
          activeStep.value = Math.max(activeStep.value - 1, 0)
        }

        const handleNext = () => {
          activeStep.value = Math.min(activeStep.value + 1, demoSteps.length - 1)
        }

        const handleStepClick = (index: number) => {
          if (index > activeStep.value) {
            return
          }

          activeStep.value = index
        }

        return {
          args,
          activeStep,
          demoSteps,
          handleBack,
          handleNext,
          handleStepClick,
        }
      },
      template: `
        <RcSesCardFormContainerV2
          :heading="args.heading"
          :description="args.description"
          :show-description="args.showDescription"
          :steps="demoSteps"
          :active-step="activeStep"
          :layout="args.layout"
          :loading="args.loading"
          @step-click="handleStepClick"
        >
          <div style="padding: 12px; border: 1px dashed #ccc; border-radius: 8px;">
            Step {{ activeStep + 1 }} / {{ demoSteps.length }}
          </div>

          <template #footer>
            <RcSesCardFooterV2
              variant="step-n"
              :show-back-action="activeStep > 0"
              :show-secondary-action="true"
              secondary-label="Secondary"
              primary-label="Next"
              :primary-disabled="activeStep === demoSteps.length - 1"
              @back="handleBack"
              @primary="handleNext"
            />
          </template>
        </RcSesCardFormContainerV2>
      `,
    }
  }

export const HorizontalDemo: Story = {
  args: {
    heading: 'Section title',
    description: 'Additional description text',
    showDescription: true,
    loading: false,
    layout: 'column',
  },
  render: renderDemo(shortSteps),
}

export const VerticalDemo: Story = {
  args: {
    heading: 'Section title',
    description: 'Additional description text',
    showDescription: true,
    loading: false,
    layout: 'row',
  },
  render: renderDemo(longSteps),
}

export const Loading: Story = {
  args: {
    heading: 'Section title',
    description: 'Loading state on the active step',
    showDescription: true,
    loading: true,
    layout: 'column',
  },
  render: renderDemo(shortSteps),
}
