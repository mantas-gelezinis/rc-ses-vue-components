import type { Meta, StoryFn } from '@storybook/vue3'
import { ref } from 'vue'

import RcSesToggleV2 from '@/components/common/toggleV2/RcSesToggleV2.vue'

const meta: Meta<typeof RcSesToggleV2> = {
  title: 'componentsV2/Toggle',
  component: RcSesToggleV2,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    showLabel: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    ariaLabel: { control: 'text' },
  },
}

export default meta

type Story = StoryFn<typeof RcSesToggleV2>

export const Default: Story = (args) => ({
  components: { RcSesToggleV2 },
  setup() {
    const value = ref(args.modelValue ?? false)

    return { args, value }
  },
  template: `
    <div class="storybook-field">
      <div class="storybook-field-view">
        <RcSesToggleV2 v-bind="args" v-model="value" />
      </div>
      <div class="storybook-field-previews">
        <div class="storybook-field-previews-title">States</div>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <RcSesToggleV2 label="Toggle text" :model-value="false" />
          <RcSesToggleV2 label="Toggle text" :model-value="true" />
          <RcSesToggleV2 label="Toggle text" :model-value="false" disabled />
          <RcSesToggleV2 label="Toggle text" :model-value="true" disabled />
        </div>
      </div>
    </div>
  `,
})
Default.args = {
  label: 'Toggle text',
  showLabel: true,
  modelValue: false,
  disabled: false,
}

export const WithoutLabel: Story = (args) => ({
  components: { RcSesToggleV2 },
  setup() {
    const value = ref(false)

    return { args, value }
  },
  template:
    '<RcSesToggleV2 v-bind="args" v-model="value" label="Toggle text" :show-label="false" aria-label="Toggle text" />',
})
WithoutLabel.args = {
  disabled: false,
}

export const Disabled: Story = () => ({
  components: { RcSesToggleV2 },
  template: `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <RcSesToggleV2 label="Off disabled" :model-value="false" disabled />
      <RcSesToggleV2 label="On disabled" :model-value="true" disabled />
    </div>
  `,
})

export const Readonly: Story = () => ({
  components: { RcSesToggleV2 },
  template: `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <RcSesToggleV2 label="Off readonly" :model-value="false" readonly />
      <RcSesToggleV2 label="On readonly" :model-value="true" readonly />
    </div>
  `,
})
