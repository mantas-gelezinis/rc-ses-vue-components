import type { Meta, StoryFn } from '@storybook/vue3'
import { ref } from 'vue'

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
    modelValue: {
      control: 'boolean',
      description: 'Controls overlay visibility (v-model)',
    },
    contained: {
      control: 'boolean',
      description: 'Position overlay within the parent container',
    },
  },
}

export default meta

type Story = StoryFn<typeof RcSesFullPageLoaderV2>

const fullPageLoaderDefaultArgs: Partial<FullPageLoaderProps> = {
  backdrop: FullPageLoaderBackdrop.Dark,
  showLabel: true,
  modelValue: true,
  contained: true,
}

export const Dark: Story = (args) => ({
  components: { RcSesFullPageLoaderV2 },
  setup() {
    const open = ref(args.modelValue ?? true)

    return { args, open }
  },
  template: `
    <div style="position: relative; height: 360px;">
      <RcSesFullPageLoaderV2 v-bind="args" v-model="open" />
    </div>
  `,
})
Dark.args = fullPageLoaderDefaultArgs as Meta<typeof RcSesFullPageLoaderV2>['args']

export const Light: Story = (args) => ({
  components: { RcSesFullPageLoaderV2 },
  setup() {
    const open = ref(args.modelValue ?? true)

    return { args, open }
  },
  template: `
    <div style="position: relative; height: 360px;">
      <RcSesFullPageLoaderV2
        v-bind="args"
        v-model="open"
        backdrop="light"
      />
    </div>
  `,
})
Light.args = {
  ...fullPageLoaderDefaultArgs,
  backdrop: FullPageLoaderBackdrop.Light,
} as Meta<typeof RcSesFullPageLoaderV2>['args']
