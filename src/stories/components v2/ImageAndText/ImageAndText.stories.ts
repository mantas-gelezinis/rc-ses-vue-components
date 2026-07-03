import type { Meta, StoryFn } from '@storybook/vue3'

import RcSesImageAndTextV2 from '@/components/common/imageAndTextV2/RcSesImageAndTextV2.vue'

const meta: Meta<typeof RcSesImageAndTextV2> = {
  title: 'componentsV2/ImageAndText',
  component: RcSesImageAndTextV2,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    background: { control: 'boolean' },
    buttonLabel: { control: 'text' },
    buttonIcon: { control: 'text' },
    buttonDisabled: { control: 'boolean' },
  },
}

export default meta

type Story = StoryFn<typeof RcSesImageAndTextV2>

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
            button-label="Button"
          />
          <RcSesImageAndTextV2
            icon="$magnifyingGlass"
            title="No results found"
            description="Try adjusting your filters or search terms."
            button-label="Clear filters"
          />
        </div>
      </div>
    </div>
  `,
})
Default.args = {
  icon: '$infoRegular',
  title: 'Place heading text here',
  description:
    'Additional description text elaborating on situation and what to do next.',
  background: false,
  buttonLabel: 'Button',
  buttonIcon: '$plus',
  buttonDisabled: false,
}

export const WithBackground: Story = () => ({
  components: { RcSesImageAndTextV2 },
  template: `
    <RcSesImageAndTextV2
      icon="$infoRegular"
      title="Place heading text here"
      description="Additional description text elaborating on situation and what to do next."
      button-label="Button"
      button-icon="$plus"
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
      button-label="Clear filters"
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
