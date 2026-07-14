import type { Meta, StoryFn } from '@storybook/vue3'

import RcSesLoaderV2 from '@/components/common/LoaderV2/RcSesLoaderV2.vue'
import { type LoaderProps, LoaderSize } from '@/components/common/LoaderV2/types'

const meta: Meta<typeof RcSesLoaderV2> = {
  title: 'componentsV2/Loader',
  component: RcSesLoaderV2,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: [LoaderSize.Small, LoaderSize.Medium, LoaderSize.Large],
      description: 'Spinner dimensions (24px / 40px / 64px)',
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

type Story = StoryFn<typeof RcSesLoaderV2>

const loaderDefaultArgs: Partial<LoaderProps> = {
  size: LoaderSize.Medium,
  showLabel: true,
}

export const Default: Story = (args) => ({
  components: { RcSesLoaderV2 },
  setup() {
    return { args }
  },
  template: `
    <div class="storybook-field">
      <div class="storybook-field-view">
        <RcSesLoaderV2 v-bind="args" />
      </div>
    </div>
  `,
})
Default.args = loaderDefaultArgs as Meta<typeof RcSesLoaderV2>['args']

export const Small: Story = () => ({
  components: { RcSesLoaderV2 },
  template: `<RcSesLoaderV2 size="small" />`,
})

export const Medium: Story = () => ({
  components: { RcSesLoaderV2 },
  template: `<RcSesLoaderV2 size="medium" />`,
})

export const Large: Story = () => ({
  components: { RcSesLoaderV2 },
  template: `<RcSesLoaderV2 size="large" />`,
})

export const WithoutLabel: Story = () => ({
  components: { RcSesLoaderV2 },
  template: `<RcSesLoaderV2 :show-label="false" />`,
})
