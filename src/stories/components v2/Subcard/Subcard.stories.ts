import type { Meta, StoryFn } from '@storybook/vue3'

import RcSesBadgeV2 from '@/components/common/BadgeV2/RcSesBadgeV2.vue'
import RcSesCardV2 from '@/components/common/CardV2/RcSesCardV2.vue'
import RcSesButtonV2 from '@/components/common/buttonV2/RcSesButtonV2.vue'
import RcSesSubcardV2 from '@/components/common/subcardV2/RcSesSubcardV2.vue'

const meta: Meta<typeof RcSesSubcardV2> = {
  title: 'componentsV2/Subcard',
  component: RcSesSubcardV2,
  tags: ['autodocs'],
  argTypes: {
    heading: { control: 'text' },
    showDescription: { control: 'boolean' },
    description: { control: 'text' },
    showFooter: { control: 'boolean' },
    headingLevel: {
      control: 'select',
      options: [3, 4, 5, 6],
    },
  },
}

export default meta

type Story = StoryFn<typeof RcSesSubcardV2>

export const Default: Story = (args) => ({
  components: { RcSesSubcardV2, RcSesButtonV2 },
  setup() {
    return { args }
  },
  template: `
    <RcSesSubcardV2 v-bind="args">
      <p style="margin: 0;">Subcard content area</p>
      <template #footer>
        <RcSesButtonV2 variant="secondary">Cancel</RcSesButtonV2>
        <RcSesButtonV2 variant="primary">Save</RcSesButtonV2>
      </template>
    </RcSesSubcardV2>
  `,
})
Default.args = {
  heading: 'Subcard heading',
  description: 'Short supporting description',
  showDescription: true,
  showFooter: true,
}

export const WithHeaderActions: Story = (args) => ({
  components: { RcSesSubcardV2, RcSesButtonV2, RcSesBadgeV2 },
  setup() {
    return { args }
  },
  template: `
    <RcSesSubcardV2 v-bind="args">
      <template #heading-adornment>
        <RcSesBadgeV2 type="warning" size="small">Missing data</RcSesBadgeV2>
      </template>
      <template #header-actions>
        <RcSesButtonV2 variant="primary" size="small" prepend-icon="$plus">
          Add item
        </RcSesButtonV2>
        <RcSesButtonV2 variant="link" size="small">Add me</RcSesButtonV2>
      </template>
      <p style="margin: 0; color: rgb(var(--v-theme-text-secondary-v2));">
        Content area (list items, empty state, or form fields)
      </p>
    </RcSesSubcardV2>
  `,
})
WithHeaderActions.args = {
  heading: 'Section heading',
  description: 'Short supporting description for the section.',
  showFooter: false,
}

export const WithoutDescription: Story = (args) => ({
  components: { RcSesSubcardV2, RcSesButtonV2 },
  setup() {
    return { args }
  },
  template: `
    <RcSesSubcardV2 v-bind="args" :show-description="false">
      <p style="margin: 0;">Subcard content area</p>
      <template #footer>
        <RcSesButtonV2 variant="secondary">Cancel</RcSesButtonV2>
        <RcSesButtonV2 variant="primary">Save</RcSesButtonV2>
      </template>
    </RcSesSubcardV2>
  `,
})
WithoutDescription.args = {
  heading: 'Subcard heading',
  showFooter: true,
}

export const WithoutFooter: Story = (args) => ({
  components: { RcSesSubcardV2 },
  setup() {
    return { args }
  },
  template: `
    <RcSesSubcardV2 v-bind="args" :show-footer="false">
      <p style="margin: 0;">Subcard content area</p>
    </RcSesSubcardV2>
  `,
})
WithoutFooter.args = {
  heading: 'Subcard heading',
  description: 'Short supporting description',
}

export const InsideCard: Story = (args) => ({
  components: { RcSesCardV2, RcSesSubcardV2, RcSesButtonV2 },
  setup() {
    return { args }
  },
  template: `
    <RcSesCardV2 heading="Main card" :show-description="false">
      <RcSesSubcardV2 v-bind="args">
        <p style="margin: 0;">Grouped content inside the main card.</p>
        <template #footer>
          <RcSesButtonV2 variant="secondary">Cancel</RcSesButtonV2>
          <RcSesButtonV2 variant="primary">Save</RcSesButtonV2>
        </template>
      </RcSesSubcardV2>
    </RcSesCardV2>
  `,
})
InsideCard.args = {
  heading: 'Subcard heading',
  description: 'Short supporting description',
}
