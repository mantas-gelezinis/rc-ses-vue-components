import type { Meta, StoryFn } from '@storybook/vue3'

import RcSesButtonV2 from '@/components/common/buttonV2/RcSesButtonV2.vue'

const meta: Meta<typeof RcSesButtonV2> = {
  title: 'components v2/Button',
  component: RcSesButtonV2,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'link'],
    },
    size: {
      control: 'select',
      options: ['regular', 'small'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    prependIcon: { control: 'text' },
    appendIcon: { control: 'text' },
    icon: { control: 'text' },
    accessibleLabel: { control: 'text' },
  },
}

export default meta

type Story = StoryFn<typeof RcSesButtonV2>

const Template: Story = (args) => ({
  components: { RcSesButtonV2 },
  setup() {
    return { args }
  },
  template: `
    <div class="storybook-field">
      <div class="storybook-field-view">
        <RcSesButtonV2 v-bind="args">Button</RcSesButtonV2>
      </div>
      <div class="storybook-field-previews">
        <div class="storybook-field-previews-title">Variant previews</div>
        <RcSesButtonV2 variant="primary">Primary</RcSesButtonV2>
        <RcSesButtonV2 variant="secondary">Secondary</RcSesButtonV2>
        <RcSesButtonV2 variant="error">Error</RcSesButtonV2>
        <RcSesButtonV2 variant="link">Link</RcSesButtonV2>
      </div>
    </div>
  `,
})

export const Primary = Template.bind({})
Primary.args = {
  variant: 'primary',
  size: 'regular',
}

export const WithPrependIcon: Story = (args) => ({
  components: { RcSesButtonV2 },
  setup() {
    return { args }
  },
  template: '<RcSesButtonV2 v-bind="args" prepend-icon="$plus">Button</RcSesButtonV2>',
})
WithPrependIcon.args = {
  variant: 'primary',
}

export const IconOnly: Story = (args) => ({
  components: { RcSesButtonV2 },
  setup() {
    return { args }
  },
  template: '<RcSesButtonV2 v-bind="args" icon="$plus" />',
})
IconOnly.args = {
  variant: 'primary',
  accessibleLabel: 'Add item',
}

export const Loading: Story = (args) => ({
  components: { RcSesButtonV2 },
  setup() {
    return { args }
  },
  template: `
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      <RcSesButtonV2 v-bind="args">Button</RcSesButtonV2>
      <RcSesButtonV2 v-bind="args" prepend-icon="$plus">Button</RcSesButtonV2>
      <RcSesButtonV2 v-bind="args" icon="$plus" accessible-label="Add item" />
    </div>
  `,
})
Loading.args = {
  variant: 'primary',
  loading: true,
}

export const Disabled: Story = () => ({
  components: { RcSesButtonV2 },
  template: `
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      <RcSesButtonV2 variant="primary" disabled>Primary</RcSesButtonV2>
      <RcSesButtonV2 variant="secondary" disabled>Secondary</RcSesButtonV2>
      <RcSesButtonV2 variant="error" disabled>Error</RcSesButtonV2>
      <RcSesButtonV2 variant="link" disabled>Link</RcSesButtonV2>
    </div>
  `,
})

export const Small: Story = () => ({
  components: { RcSesButtonV2 },
  template: `
    <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
      <RcSesButtonV2 variant="primary" size="small">Button</RcSesButtonV2>
      <RcSesButtonV2 variant="secondary" size="small">Button</RcSesButtonV2>
      <RcSesButtonV2 variant="link" size="small">Button</RcSesButtonV2>
      <RcSesButtonV2 variant="primary" size="small" icon="$plus" accessible-label="Add item" />
    </div>
  `,
})
