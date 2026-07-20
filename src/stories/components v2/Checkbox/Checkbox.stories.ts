import type { Meta, StoryFn } from '@storybook/vue3'
import { ref } from 'vue'

import RcSesCheckboxV2 from '@/components/common/inputs/Checkboxes/CheckboxV2/RcSesCheckboxV2.vue'
import type { CheckboxProps } from '@/components/common/inputs/Checkboxes/CheckboxV2/types'

const meta: Meta<typeof RcSesCheckboxV2> = {
  title: 'componentsV2/Checkbox',
  component: RcSesCheckboxV2,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Visible checkbox label',
    },
    showLabel: {
      control: 'boolean',
      description: 'Toggle the visible label',
    },
    disabled: {
      control: 'boolean',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Mixed parent state for sub-lists',
    },
    loading: {
      control: 'boolean',
    },
    error: {
      control: 'text',
      description: 'Error state (boolean or message string)',
    },
    accessibleLabel: {
      control: 'text',
    },
  },
}

export default meta

type Story = StoryFn<typeof RcSesCheckboxV2>

const checkboxDefaultArgs: Partial<CheckboxProps> = {
  label: 'Checkbox text',
  showLabel: true,
  disabled: false,
  indeterminate: false,
  loading: false,
  error: false,
}

export const Default: Story = (args) => ({
  components: { RcSesCheckboxV2 },
  setup() {
    const value = ref(false)

    return { args, value }
  },
  template: `
    <RcSesCheckboxV2 v-bind="args" v-model="value" />
  `,
})
Default.args = checkboxDefaultArgs as Meta<typeof RcSesCheckboxV2>['args']

export const States: Story = () => ({
  components: { RcSesCheckboxV2 },
  setup() {
    return {
      unchecked: ref(false),
      checked: ref(true),
      indeterminate: ref(false),
      disabledUnchecked: ref(false),
      disabledChecked: ref(true),
      errorUnchecked: ref(false),
      errorChecked: ref(true),
    }
  },
  template: `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <RcSesCheckboxV2 v-model="unchecked" label="Unselected" />
      <RcSesCheckboxV2 v-model="checked" label="Selected" />
      <RcSesCheckboxV2 v-model="indeterminate" label="Indeterminate" indeterminate />
      <RcSesCheckboxV2 v-model="disabledUnchecked" label="Disabled" disabled />
      <RcSesCheckboxV2 v-model="disabledChecked" label="Disabled selected" disabled />
      <RcSesCheckboxV2
        v-model="errorUnchecked"
        label="Error"
        error="Privalomas laukas"
      />
      <RcSesCheckboxV2 v-model="errorChecked" label="Error selected" error />
      <RcSesCheckboxV2 label="Loading" loading />
    </div>
  `,
})
