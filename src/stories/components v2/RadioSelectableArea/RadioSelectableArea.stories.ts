import type { Meta, StoryFn } from '@storybook/vue3'
import { ref } from 'vue'

import RcSesRadioGroupV2 from '@/components/common/inputs/Radios/RadioGroupV2/RcSesRadioGroupV2.vue'
import RcSesRadioSelectableAreaV2 from '@/components/common/inputs/Radios/RadioSelectableAreaV2/RcSesRadioSelectableAreaV2.vue'
import type { RadioSelectableAreaProps } from '@/components/common/inputs/Radios/RadioSelectableAreaV2/types'

const meta: Meta<typeof RcSesRadioSelectableAreaV2> = {
  title: 'componentsV2/RadioSelectableArea',
  component: RcSesRadioSelectableAreaV2,
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
    value: {
      control: 'text',
      description: 'Option value within RcSesRadioGroupV2',
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
}

export default meta

type Story = StoryFn<typeof RcSesRadioSelectableAreaV2>

const defaultArgs: Partial<RadioSelectableAreaProps> = {
  title: 'Title',
  description: 'Description text placed here.',
  trailing: '00,00 €',
  value: 'option-a',
  disabled: false,
  loading: false,
}

export const WithHeading: Story = (args) => ({
  components: { RcSesRadioGroupV2, RcSesRadioSelectableAreaV2 },
  setup() {
    const value = ref<string | null>(null)

    return { args, value }
  },
  template: `
    <RcSesRadioGroupV2 v-model="value" accessible-label="Payment" style="max-width: 436px;">
      <RcSesRadioSelectableAreaV2 v-bind="args" />
      <RcSesRadioSelectableAreaV2
        value="option-b"
        title="Title B"
        description="Description text placed here."
        trailing="12,00 €"
      />
    </RcSesRadioGroupV2>
  `,
})
WithHeading.args = defaultArgs as Meta<typeof RcSesRadioSelectableAreaV2>['args']

export const DescriptionOnly: Story = () => ({
  components: { RcSesRadioGroupV2, RcSesRadioSelectableAreaV2 },
  setup() {
    const value = ref('option-a')

    return { value }
  },
  template: `
    <RcSesRadioGroupV2 v-model="value" accessible-label="Options" style="max-width: 436px;">
      <RcSesRadioSelectableAreaV2
        value="option-a"
        description="Description text placed here."
        trailing="00,00 €"
      />
      <RcSesRadioSelectableAreaV2
        value="option-b"
        description="Another option."
        trailing="05,00 €"
      />
    </RcSesRadioGroupV2>
  `,
})

export const States: Story = () => ({
  components: { RcSesRadioGroupV2, RcSesRadioSelectableAreaV2 },
  setup() {
    return {
      rest: ref<string | null>(null),
      selected: ref('selected'),
      disabled: ref<string | null>(null),
      error: ref<string | null>(null),
    }
  },
  template: `
    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 436px;">
      <RcSesRadioGroupV2 v-model="rest" accessible-label="Rest">
        <RcSesRadioSelectableAreaV2
          value="rest"
          title="Title"
          description="Description text placed here."
          trailing="00,00 €"
        />
      </RcSesRadioGroupV2>

      <RcSesRadioGroupV2 v-model="selected" accessible-label="Selected">
        <RcSesRadioSelectableAreaV2
          value="selected"
          title="Title"
          description="Description text placed here."
          trailing="00,00 €"
        />
      </RcSesRadioGroupV2>

      <RcSesRadioGroupV2 v-model="disabled" accessible-label="Disabled" disabled>
        <RcSesRadioSelectableAreaV2
          value="disabled"
          title="Title"
          description="Description text placed here."
          trailing="00,00 €"
        />
      </RcSesRadioGroupV2>

      <RcSesRadioGroupV2 v-model="error" accessible-label="Error" error>
        <RcSesRadioSelectableAreaV2
          value="error"
          title="Title"
          description="Description text placed here."
          trailing="00,00 €"
        />
      </RcSesRadioGroupV2>

      <RcSesRadioGroupV2 accessible-label="Loading">
        <RcSesRadioSelectableAreaV2
          value="loading"
          title="Title"
          description="Description text placed here."
          trailing="00,00 €"
          loading
        />
      </RcSesRadioGroupV2>
    </div>
  `,
})
