import type { Meta, StoryFn } from '@storybook/vue3'

import RcSesInlineAlertV2 from '@/components/common/InlineAlertV2/RcSesInlineAlertV2.vue'
import {
  type InlineAlertProps,
  InlineAlertType,
} from '@/components/common/InlineAlertV2/types'

const defaultMessage =
  'Alert message. Replace this text with content relevant to your context.'
const longMessage =
  'This is a very long alert message intended to demonstrate how InlineAlertV2 handles extended content without breaking the layout. It should wrap naturally across multiple lines while keeping the icon, action link, and close button aligned. Replace this placeholder copy with context-specific content from your application.'
const defaultActionLabel = 'View details'

const meta: Meta<typeof RcSesInlineAlertV2> = {
  title: 'componentsV2/InlineAlert',
  component: RcSesInlineAlertV2,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: [
        InlineAlertType.Neutral,
        InlineAlertType.Info,
        InlineAlertType.Success,
        InlineAlertType.Warning,
        InlineAlertType.Error,
      ],
      description: 'Semantic alert type',
    },
    showIcon: {
      control: 'boolean',
      description: 'Toggle the leading status icon',
    },
    showClose: {
      control: 'boolean',
      description: 'Toggle the dismiss close button',
    },
    showAction: {
      control: 'boolean',
      description: 'Toggle the trailing link action',
    },
    message: {
      control: 'text',
      description: 'Alert message text',
    },
    actionLabel: {
      control: 'text',
      description: 'Link action label',
    },
  },
}

export default meta

type Story = StoryFn<typeof RcSesInlineAlertV2>

const inlineAlertDefaultArgs: Partial<InlineAlertProps> = {
  type: InlineAlertType.Neutral,
  message: defaultMessage,
  showIcon: true,
  showClose: true,
  showAction: false,
}

export const Default: Story = (args) => ({
  components: { RcSesInlineAlertV2 },
  setup() {
    return { args }
  },
  template: `
    <div class="storybook-field">
      <div class="storybook-field-view">
        <RcSesInlineAlertV2 v-bind="args" />
      </div>
    </div>
  `,
})
Default.args = inlineAlertDefaultArgs as Meta<typeof RcSesInlineAlertV2>['args']

export const AllTypes: Story = () => ({
  components: { RcSesInlineAlertV2 },
  setup() {
    return {
      defaultMessage,
      InlineAlertType,
    }
  },
  template: `
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 560px;">
      <RcSesInlineAlertV2 :type="InlineAlertType.Neutral" :message="defaultMessage" />
      <RcSesInlineAlertV2 :type="InlineAlertType.Info" :message="defaultMessage" />
      <RcSesInlineAlertV2 :type="InlineAlertType.Success" :message="defaultMessage" />
      <RcSesInlineAlertV2 :type="InlineAlertType.Warning" :message="defaultMessage" />
      <RcSesInlineAlertV2 :type="InlineAlertType.Error" :message="defaultMessage" />
    </div>
  `,
})

export const WithAction: Story = () => ({
  components: { RcSesInlineAlertV2 },
  setup() {
    return { defaultMessage, defaultActionLabel }
  },
  template: `
    <RcSesInlineAlertV2
      type="info"
      :message="defaultMessage"
      show-action
      :action-label="defaultActionLabel"
    />
  `,
})

export const WithoutIcon: Story = () => ({
  components: { RcSesInlineAlertV2 },
  setup() {
    return { defaultMessage }
  },
  template: `
    <RcSesInlineAlertV2
      type="warning"
      :message="defaultMessage"
      :show-icon="false"
    />
  `,
})

export const LongMessage: Story = () => ({
  components: { RcSesInlineAlertV2 },
  setup() {
    return { longMessage, defaultActionLabel }
  },
  template: `
    <div style="max-width: 560px;">
      <RcSesInlineAlertV2
        type="info"
        :message="longMessage"
        show-action
        :action-label="defaultActionLabel"
      />
    </div>
  `,
})
