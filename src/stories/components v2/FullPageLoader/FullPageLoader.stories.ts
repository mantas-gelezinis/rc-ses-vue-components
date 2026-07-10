import type { Meta, StoryFn } from '@storybook/vue3'

import RcSesFullPageLoaderV2 from '@/components/common/FullPageLoaderV2/RcSesFullPageLoaderV2.vue'
import {
  FullPageLoaderBackdrop,
  type FullPageLoaderProps,
} from '@/components/common/FullPageLoaderV2/types'

const meta: Meta<typeof RcSesFullPageLoaderV2> = {
  title: 'componentsV2/FullPageLoader',
  component: RcSesFullPageLoaderV2,
  tags: ['autodocs'],
  argTypes: {
    backdrop: {
      control: 'select',
      options: [FullPageLoaderBackdrop.Dark, FullPageLoaderBackdrop.Light],
      description: 'Overlay scrim variant',
    },
    showLabel: {
      control: 'boolean',
      description: 'Toggle the loading label below the spinner',
    },
    label: {
      control: 'text',
      description: 'Custom loading label (defaults to i18n)',
    },
  },
}

export default meta

type Story = StoryFn<typeof RcSesFullPageLoaderV2>

const fullPageLoaderDefaultArgs: Partial<FullPageLoaderProps> = {
  backdrop: FullPageLoaderBackdrop.Dark,
  showLabel: true,
}

export const Dark: Story = (args) => ({
  components: { RcSesFullPageLoaderV2 },
  setup() {
    return { args }
  },
  template: `
    <div style="position: relative; height: 360px;">
      <RcSesFullPageLoaderV2 v-bind="args" contained />
    </div>
  `,
})
Dark.args = fullPageLoaderDefaultArgs as Meta<typeof RcSesFullPageLoaderV2>['args']

export const Light: Story = () => ({
  components: { RcSesFullPageLoaderV2 },
  template: `
    <div style="position: relative; height: 360px;">
      <RcSesFullPageLoaderV2 backdrop="light" contained />
    </div>
  `,
})
