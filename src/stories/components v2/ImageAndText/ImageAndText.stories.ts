import type { Meta, StoryFn } from '@storybook/vue3'

import RcSesImageAndTextV2 from '@/components/common/imageAndTextV2/RcSesImageAndTextV2.vue'
import type { ImageAndTextProps } from '@/components/common/imageAndTextV2/types'

const meta: Meta<typeof RcSesImageAndTextV2> = {
  title: 'componentsV2/ImageAndText',
  component: RcSesImageAndTextV2,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'text',
      description: 'Icon alias for the default image slot (e.g. $infoRegular)',
    },
    title: {
      control: 'text',
      description: 'Main heading text shown below the image',
    },
    description: {
      control: 'text',
      description: 'Optional supporting text shown under the title',
    },
    background: {
      control: 'boolean',
      description: 'Toggle background panel variant',
    },
    action: {
      control: 'object',
      description:
        'Optional primary action button config ({ label, icon?, disabled? }). Omit to hide the default button.',
      table: { category: 'props' },
    },
  },
}

export default meta

type Story = StoryFn<typeof RcSesImageAndTextV2>

const imageAndTextDefaultArgs: Partial<ImageAndTextProps> = {
  icon: '$infoRegular',
  title: 'Place heading text here',
  description:
    'Additional description text elaborating on situation and what to do next.',
  background: false,
  action: { label: 'Button', icon: '$plus', disabled: false },
}

export const Default: Story = (args) => ({
  components: { RcSesImageAndTextV2 },
  setup() {
    return { args }
  },
  template: `
    <div class="storybook-field">
      <div class="storybook-field-view">
        <RcSesImageAndTextV2 v-bind="args" @action="() => {}" />
      </div>
      <div class="storybook-field-previews">
        <div class="storybook-field-previews-title">Icon variants</div>
        <div style="display: flex; flex-direction: column; gap: 32px;">
          <RcSesImageAndTextV2
            icon="$infoRegular"
            title="Place heading text here"
            description="Additional description text elaborating on situation and what to do next."
            :action="{ label: 'Button' }"
          />
          <RcSesImageAndTextV2
            icon="$magnifyingGlass"
            title="No results found"
            description="Try adjusting your filters or search terms."
            :action="{ label: 'Clear filters' }"
          />
        </div>
      </div>
    </div>
  `,
})
Default.args = imageAndTextDefaultArgs as Meta<typeof RcSesImageAndTextV2>['args']

export const WithBackground: Story = () => ({
  components: { RcSesImageAndTextV2 },
  template: `
    <RcSesImageAndTextV2
      icon="$infoRegular"
      title="Place heading text here"
      description="Additional description text elaborating on situation and what to do next."
      :action="{ label: 'Button', icon: '$plus' }"
      background
    />
  `,
})

export const CustomIcon: Story = () => ({
  components: { RcSesImageAndTextV2 },
  template: `
    <RcSesImageAndTextV2
      icon="$magnifyingGlass"
      title="No results found"
      description="Try adjusting your filters or search terms."
      :action="{ label: 'Clear filters' }"
    />
  `,
})

export const WithoutButton: Story = () => ({
  components: { RcSesImageAndTextV2 },
  template: `
    <RcSesImageAndTextV2
      icon="$infoRegular"
      title="Nothing here yet"
      description="Content will appear once data is available."
    />
  `,
})
