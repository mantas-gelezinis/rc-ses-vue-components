import type { Meta, StoryFn } from '@storybook/vue3'
import { ref } from 'vue'

import RcSesRadioGroupV2 from '@/components/common/inputs/Radios/RadioGroupV2/RcSesRadioGroupV2.vue'
import type { RadioGroupProps } from '@/components/common/inputs/Radios/RadioGroupV2/types'
import RcSesRadioV2 from '@/components/common/inputs/Radios/RadioV2/RcSesRadioV2.vue'

const meta: Meta<typeof RcSesRadioGroupV2> = {
  title: 'componentsV2/RadioGroup',
  component: RcSesRadioGroupV2,
  tags: ['autodocs'],
  argTypes: {
    accessibleLabel: {
      control: 'text',
      description: 'Screen reader name for the radiogroup',
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'text',
      description: 'Error state (boolean or message string)',
    },
  },
}

export default meta

type Story = StoryFn<typeof RcSesRadioGroupV2>

const defaultArgs: Partial<RadioGroupProps> = {
  accessibleLabel: 'Select an option',
  disabled: false,
  error: false,
}

export const Default: Story = (args) => ({
  components: { RcSesRadioGroupV2, RcSesRadioV2 },
  setup() {
    const value = ref<string | null>(null)

    return { args, value }
  },
  template: `
    <RcSesRadioGroupV2 v-model="value" v-bind="args">
      <RcSesRadioV2 value="a" label="Radio text" />
      <RcSesRadioV2 value="b" label="Selected option" />
    </RcSesRadioGroupV2>
  `,
})
Default.args = defaultArgs as Meta<typeof RcSesRadioGroupV2>['args']

export const States: Story = () => ({
  components: { RcSesRadioGroupV2, RcSesRadioV2 },
  setup() {
    return {
      rest: ref<string | null>(null),
      selected: ref('b'),
      disabled: ref('b'),
      error: ref<string | null>(null),
      errorSelected: ref('b'),
    }
  },
  template: `
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <RcSesRadioGroupV2 v-model="rest" accessible-label="Unselected">
        <RcSesRadioV2 value="a" label="Option A" />
        <RcSesRadioV2 value="b" label="Option B" />
      </RcSesRadioGroupV2>

      <RcSesRadioGroupV2 v-model="selected" accessible-label="Selected">
        <RcSesRadioV2 value="a" label="Option A" />
        <RcSesRadioV2 value="b" label="Option B" />
      </RcSesRadioGroupV2>

      <RcSesRadioGroupV2 v-model="disabled" accessible-label="Disabled" disabled>
        <RcSesRadioV2 value="a" label="Option A" />
        <RcSesRadioV2 value="b" label="Option B" />
      </RcSesRadioGroupV2>

      <RcSesRadioGroupV2
        v-model="error"
        accessible-label="Error"
        error="Required field"
      >
        <RcSesRadioV2 value="a" label="Option A" />
        <RcSesRadioV2 value="b" label="Option B" />
      </RcSesRadioGroupV2>

      <RcSesRadioGroupV2
        v-model="errorSelected"
        accessible-label="Error selected"
        error="Required field"
      >
        <RcSesRadioV2 value="a" label="Option A" />
        <RcSesRadioV2 value="b" label="Option B" />
      </RcSesRadioGroupV2>

      <RcSesRadioGroupV2 accessible-label="Loading">
        <RcSesRadioV2 value="a" label="Loading" loading />
      </RcSesRadioGroupV2>
    </div>
  `,
})
