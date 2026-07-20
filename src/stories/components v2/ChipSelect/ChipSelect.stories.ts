import type { Meta, StoryFn } from '@storybook/vue3'
import { ref } from 'vue'

import RcSesChipSelectV2 from '@/components/common/ChipSelectV2/RcSesChipSelectV2.vue'
import type { ChipSelectProps } from '@/components/common/ChipSelectV2/types'

const defaultOptions: ChipSelectProps['options'] = [
  { text: 'Reikšmė 1', value: 'val1' },
  { text: 'Reikšmė 2', value: 'val2' },
  { text: 'Reikšmė 3', value: 'val3' },
]

const meta: Meta<typeof RcSesChipSelectV2> = {
  title: 'componentsV2/ChipSelect',
  component: RcSesChipSelectV2,
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'Selectable chip options',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all chips',
    },
    accessibleLabel: {
      control: 'text',
      description: 'Accessible name for the chip group',
    },
  },
}

export default meta

type Story = StoryFn<typeof RcSesChipSelectV2>

const chipSelectDefaultArgs: Partial<ChipSelectProps> = {
  options: defaultOptions,
  disabled: false,
  accessibleLabel: 'Pasirinkite reikšmę',
}

export const Default: Story = (args) => ({
  components: { RcSesChipSelectV2 },
  setup() {
    const value = ref('val1')

    return { args, value }
  },
  template: `
    <RcSesChipSelectV2 v-bind="args" v-model="value" />
  `,
})
Default.args = chipSelectDefaultArgs as Meta<typeof RcSesChipSelectV2>['args']

export const Disabled: Story = () => ({
  components: { RcSesChipSelectV2 },
  setup() {
    const value = ref('val2')

    return { value, options: defaultOptions }
  },
  template: `
    <RcSesChipSelectV2
      v-model="value"
      :options="options"
      disabled
      accessible-label="Pasirinkite reikšmę"
    />
  `,
})
