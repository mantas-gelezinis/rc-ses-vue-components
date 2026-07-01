import type { StoryFn } from '@storybook/vue3'

import RcSesBadgeV2 from '@/components/common/BadgeV2/RcSesBadgeV2.vue'

export default {
  components: { RcSesBadgeV2 },
  title: 'componentsV2/Badge',
  component: RcSesBadgeV2,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['neutral', 'success', 'warning', 'error', 'info', 'brand'],
      description: 'Semantic badge type',
    },
    size: {
      control: 'select',
      options: ['small', 'regular'],
      description: 'Badge dimensions',
    },
    showIcon: {
      control: 'boolean',
      description: 'Toggle default circle icon',
    },
    showClose: {
      control: 'boolean',
      description: 'Toggle dismissible close action icon',
    },
    default: {
      control: 'text',
      description: 'Main slot content text',
    },
  },
}

const Template: StoryFn = (args) => ({
  components: { RcSesBadgeV2 },
  setup() {
    const types = ['neutral', 'success', 'warning', 'error', 'info', 'brand']
    return { args, types }
  },
  template: `
    <div class="storybook-field">
      <div class="storybook-field-view">
        <RcSesBadgeV2 v-bind="args">
          {{ args.default || 'Badge label' }}
        </RcSesBadgeV2>
      </div>

      <div class="storybook-field-previews">
        <div class="storybook-field-previews-title">Size: Regular (with icon & close)</div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
          <RcSesBadgeV2 v-for="t in types" :key="'reg-'+t" :type="t" size="regular" showIcon showClose>
            {{ t.charAt(0).toUpperCase() + t.slice(1) }}
          </RcSesBadgeV2>
        </div>

        <div class="storybook-field-previews-title">Size: Small (with icon)</div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <RcSesBadgeV2 v-for="t in types" :key="'sm-'+t" :type="t" size="small" showIcon>
            {{ t.charAt(0).toUpperCase() + t.slice(1) }}
          </RcSesBadgeV2>
        </div>
      </div>
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {
  type: 'neutral',
  size: 'regular',
  showIcon: false,
  showClose: false,
  default: 'Badge label',
}
