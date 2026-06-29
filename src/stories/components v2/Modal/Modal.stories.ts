import type { StoryFn } from '@storybook/vue3'
import { reactive, ref } from 'vue'

import RcSesButtonV2 from '@/components/common/buttonV2/RcSesButtonV2.vue'
import RcSesModalV2 from '@/components/overlays/ModalV2/RcSesModalV2.vue'

export default {
  components: { RcSesModalV2, RcSesButtonV2 },
  title: 'componentsV2/Modal',
  component: RcSesModalV2,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['destructive', 'confirm', 'success', 'info'],
      description: 'Modal semantic type',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Modal width',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show type icon above title',
    },
    persistent: {
      control: 'boolean',
      description: 'Prevent closing on backdrop click',
    },
    title: {
      control: 'text',
      description: 'Modal title',
    },
    primaryActionLabel: {
      control: 'text',
      description: 'Primary action button label',
    },
    secondaryActionLabel: {
      control: 'text',
      description: 'Secondary action button label',
    },
    default: {
      control: 'text',
      description: 'Main slot content text',
    },
  },
}

const Template: StoryFn = (args) => ({
  components: { RcSesModalV2, RcSesButtonV2 },
  setup() {
    const isOpen = ref(false)
    const previewOpen = reactive({
      destructive: false,
      confirm: false,
      success: false,
      info: false,
    })
    const types = [
      {
        type: 'destructive',
        title: 'Ar tikrai norite pašalinti?',
        primaryActionLabel: 'Pašalinti',
        secondaryActionLabel: 'Atšaukti',
      },
      {
        type: 'confirm',
        title: 'Ar tikrai norite tęsti?',
        primaryActionLabel: 'Tęsti',
        secondaryActionLabel: 'Atšaukti',
      },
      {
        type: 'success',
        title: 'Pavyko!',
        primaryActionLabel: 'Uždaryti',
      },
      {
        type: 'info',
        title: 'Informacija',
        primaryActionLabel: 'Suprantu',
      },
    ]

    return { args, isOpen, previewOpen, types }
  },
  template: `
    <div class="storybook-field">
      <div class="storybook-field-view">
        <RcSesButtonV2 @click="isOpen = true">Open Modal</RcSesButtonV2>
        <RcSesModalV2
          v-model="isOpen"
          :title="args.title"
          :type="args.type"
          :show-icon="args.showIcon"
          :size="args.size"
          :persistent="args.persistent"
          :primary-action-label="args.primaryActionLabel"
          :secondary-action-label="args.secondaryActionLabel"
        >
          {{ args.default || 'Aprašymo tekstas.' }}
        </RcSesModalV2>
      </div>

      <div class="storybook-field-previews">
        <div class="storybook-field-previews-title">Type previews</div>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <template v-for="item in types" :key="item.type">
            <RcSesButtonV2 @click="previewOpen[item.type] = true">
              {{ item.type.charAt(0).toUpperCase() + item.type.slice(1) }}
            </RcSesButtonV2>
            <RcSesModalV2
              v-model="previewOpen[item.type]"
              :title="item.title"
              :type="item.type"
              show-icon
              :primary-action-label="item.primaryActionLabel"
              :secondary-action-label="item.secondaryActionLabel"
            >
              Aprašymo tekstas.
            </RcSesModalV2>
          </template>
        </div>
      </div>
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {
  title: 'Ar tikrai norite pašalinti?',
  default: 'Aprašymo tekstas.',
  type: 'destructive',
  showIcon: true,
  size: 'md',
  persistent: false,
  primaryActionLabel: 'Pašalinti',
  secondaryActionLabel: 'Atšaukti',
}
