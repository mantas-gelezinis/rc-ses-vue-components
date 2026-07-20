import type { Meta, StoryFn } from '@storybook/vue3'
import { ref } from 'vue'

import RcSesSnackbarV2 from '@/components/common/SnackbarV2/RcSesSnackbarV2.vue'
import { type SnackbarProps, SnackbarState } from '@/components/common/SnackbarV2/types'

const defaultMessage = 'Short informational text. Replace with context-specific content.'
const defaultActionLabel = 'Button'

const meta: Meta<typeof RcSesSnackbarV2> = {
  title: 'componentsV2/Snackbar',
  component: RcSesSnackbarV2,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: [
        SnackbarState.Success,
        SnackbarState.Error,
        SnackbarState.Warning,
        SnackbarState.Info,
        SnackbarState.ActionNeeded,
      ],
      description: 'Semantic snackbar state',
    },
    message: {
      control: 'text',
      description: 'Snackbar message text',
    },
    showAction: {
      control: 'boolean',
      description: 'Toggle the action button',
    },
    actionLabel: {
      control: 'text',
      description: 'Action button label',
    },
    showClose: {
      control: 'boolean',
      description: 'Toggle the dismiss close button',
    },
    persist: {
      control: 'boolean',
      description: 'Disable auto-dismiss',
    },
    contained: {
      control: 'boolean',
      description: 'Position snackbar within the story container',
    },
  },
}

export default meta

type Story = StoryFn<typeof RcSesSnackbarV2>

const snackbarDefaultArgs: Partial<SnackbarProps> = {
  state: SnackbarState.Success,
  message: defaultMessage,
  showAction: false,
  actionLabel: defaultActionLabel,
  showClose: true,
  contained: true,
  persist: true,
}

export const Default: Story = (args) => ({
  components: { RcSesSnackbarV2 },
  setup() {
    const open = ref(true)

    return { args, open }
  },
  template: `
    <div class="snackbar-story-frame">
      <RcSesSnackbarV2 v-bind="args" v-model="open" />
    </div>
  `,
})
Default.args = snackbarDefaultArgs as Meta<typeof RcSesSnackbarV2>['args']

export const AllStates: Story = () => ({
  components: { RcSesSnackbarV2 },
  setup() {
    const states = [
      SnackbarState.Success,
      SnackbarState.Error,
      SnackbarState.Warning,
      SnackbarState.Info,
      SnackbarState.ActionNeeded,
    ]

    return {
      states,
      defaultMessage,
    }
  },
  template: `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div v-for="state in states" :key="state" class="snackbar-story-frame">
        <RcSesSnackbarV2
          :state="state"
          :message="defaultMessage"
          :show-action="false"
          :model-value="true"
          contained
          persist
        />
      </div>
    </div>
  `,
})

export const WithAction: Story = () => ({
  components: { RcSesSnackbarV2 },
  setup() {
    const open = ref(true)

    return { open, defaultMessage, defaultActionLabel, SnackbarState }
  },
  template: `
    <div class="snackbar-story-frame">
      <RcSesSnackbarV2
        v-model="open"
        :state="SnackbarState.Info"
        :message="defaultMessage"
        show-action
        :action-label="defaultActionLabel"
        contained
        persist
      />
    </div>
  `,
})
