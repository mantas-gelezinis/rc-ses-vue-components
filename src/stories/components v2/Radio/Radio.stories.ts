import type { Meta, StoryFn } from '@storybook/vue3'
import { ref } from 'vue'

import RcSesRadioGroupV2 from '@/components/common/inputs/Radios/RadioGroupV2/RcSesRadioGroupV2.vue'
import RcSesRadioV2 from '@/components/common/inputs/Radios/RadioV2/RcSesRadioV2.vue'
import type { RadioProps } from '@/components/common/inputs/Radios/RadioV2/types'

const meta: Meta<typeof RcSesRadioV2> = {
  title: 'componentsV2/Radio',
  component: RcSesRadioV2,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Visible radio label',
    },
    showLabel: {
      control: 'boolean',
      description: 'Toggle the visible label',
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    accessibleLabel: {
      control: 'text',
    },
    value: {
      control: 'text',
      description: 'Option value within RcSesRadioGroupV2',
    },
  },
}

export default meta

type Story = StoryFn<typeof RcSesRadioV2>

const radioDefaultArgs: Partial<RadioProps> = {
  label: 'Radio text',
  showLabel: true,
  disabled: false,
  loading: false,
  value: 'a',
}

export const Default: Story = (args) => ({
  components: { RcSesRadioGroupV2, RcSesRadioV2 },
  setup() {
    const value = ref<string | null>(null)

    return { args, value }
  },
  template: `
    <RcSesRadioGroupV2 v-model="value" accessible-label="Radio">
      <RcSesRadioV2 v-bind="args" />
    </RcSesRadioGroupV2>
  `,
})
Default.args = radioDefaultArgs as Meta<typeof RcSesRadioV2>['args']

export const States: Story = () => ({
  components: { RcSesRadioGroupV2, RcSesRadioV2 },
  setup() {
    return {
      rest: ref<string | null>(null),
      selected: ref('selected'),
      disabled: ref<string | null>(null),
      disabledSelected: ref('y'),
      error: ref<string | null>(null),
      errorSelected: ref('e2'),
    }
  },
  template: `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <RcSesRadioGroupV2 v-model="rest" accessible-label="Unselected">
        <RcSesRadioV2 value="unselected" label="Unselected" />
      </RcSesRadioGroupV2>

      <RcSesRadioGroupV2 v-model="selected" accessible-label="Selected">
        <RcSesRadioV2 value="selected" label="Selected" />
      </RcSesRadioGroupV2>

      <RcSesRadioGroupV2 v-model="disabled" accessible-label="Disabled" disabled>
        <RcSesRadioV2 value="x" label="Disabled" />
      </RcSesRadioGroupV2>

      <RcSesRadioGroupV2
        v-model="disabledSelected"
        accessible-label="Disabled selected"
        disabled
      >
        <RcSesRadioV2 value="y" label="Disabled selected" />
      </RcSesRadioGroupV2>

      <RcSesRadioGroupV2
        v-model="error"
        accessible-label="Error"
        error="Required field"
      >
        <RcSesRadioV2 value="e1" label="Error" />
      </RcSesRadioGroupV2>

      <RcSesRadioGroupV2
        v-model="errorSelected"
        accessible-label="Error selected"
        error="Required field"
      >
        <RcSesRadioV2 value="e2" label="Error selected" />
      </RcSesRadioGroupV2>

      <RcSesRadioGroupV2 accessible-label="Loading">
        <RcSesRadioV2 value="loading" label="Loading" loading />
      </RcSesRadioGroupV2>
    </div>
  `,
})
