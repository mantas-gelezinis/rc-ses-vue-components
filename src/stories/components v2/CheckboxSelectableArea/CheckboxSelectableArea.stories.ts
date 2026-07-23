import type { Meta, StoryFn } from '@storybook/vue3'
import { ref } from 'vue'

import RcSesCheckboxSelectableAreaV2 from '@/components/common/inputs/Checkboxes/CheckboxSelectableAreaV2/RcSesCheckboxSelectableAreaV2.vue'
import type { CheckboxSelectableAreaProps } from '@/components/common/inputs/Checkboxes/CheckboxSelectableAreaV2/types'

const meta: Meta<typeof RcSesCheckboxSelectableAreaV2> = {
  title: 'componentsV2/CheckboxSelectableArea',
  component: RcSesCheckboxSelectableAreaV2,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Optional heading (Heading=true in Figma)',
    },
    description: {
      control: 'text',
    },
    trailing: {
      control: 'text',
      description: 'Trailing value, e.g. price',
    },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    loading: { control: 'boolean' },
    error: { control: 'boolean' },
  },
}

export default meta

type Story = StoryFn<typeof RcSesCheckboxSelectableAreaV2>

const defaultArgs: Partial<CheckboxSelectableAreaProps> = {
  title: 'Title',
  description: 'Description text',
  trailing: '00,00 €',
  disabled: false,
  loading: false,
  error: false,
}

export const WithHeading: Story = (args) => ({
  components: { RcSesCheckboxSelectableAreaV2 },
  setup() {
    const value = ref(false)

    return { args, value }
  },
  template: `
    <div style="max-width: 436px;">
      <RcSesCheckboxSelectableAreaV2 v-bind="args" v-model="value" />
    </div>
  `,
})
WithHeading.args = defaultArgs as Meta<typeof RcSesCheckboxSelectableAreaV2>['args']

export const DescriptionOnly: Story = () => ({
  components: { RcSesCheckboxSelectableAreaV2 },
  setup() {
    const value = ref(true)

    return { value }
  },
  template: `
    <div style="max-width: 436px;">
      <RcSesCheckboxSelectableAreaV2
        v-model="value"
        description="Description text"
        trailing="00,00 €"
      />
    </div>
  `,
})

export const States: Story = () => ({
  components: { RcSesCheckboxSelectableAreaV2 },
  setup() {
    return {
      rest: ref(false),
      selected: ref(true),
      disabled: ref(false),
      error: ref(false),
    }
  },
  template: `
    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 436px;">
      <RcSesCheckboxSelectableAreaV2
        v-model="rest"
        title="Title"
        description="Description text"
        trailing="00,00 €"
      />
      <RcSesCheckboxSelectableAreaV2
        v-model="selected"
        title="Title"
        description="Description text"
        trailing="00,00 €"
      />
      <RcSesCheckboxSelectableAreaV2
        v-model="disabled"
        title="Title"
        description="Description text"
        trailing="00,00 €"
        disabled
      />
      <RcSesCheckboxSelectableAreaV2
        v-model="error"
        title="Title"
        description="Description text"
        trailing="00,00 €"
        error
      />
      <RcSesCheckboxSelectableAreaV2
        title="Title"
        description="Description text"
        trailing="00,00 €"
        loading
      />
    </div>
  `,
})
