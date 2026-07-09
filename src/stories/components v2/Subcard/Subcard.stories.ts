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
    heading: {
      control: 'text',
      description: 'Section heading shown in the subcard header',
    },
    showDescription: {
      control: 'boolean',
      description: 'Toggle the description text below the heading',
    },
    description: {
      control: 'text',
      description: 'Optional supporting text shown under the heading',
    },
    showFooter: {
      control: 'boolean',
      description: 'Toggle the footer slot area',
    },
    headingLevel: {
      control: 'select',
      options: [3, 4, 5, 6],
      description: 'Semantic heading level for the section title (h3–h6)',
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

export const WithHeaderActions: Story = () => ({
  components: { RcSesSubcardV2, RcSesButtonV2, RcSesBadgeV2 },
  template: `
    <RcSesSubcardV2
      heading="Section heading"
      description="Short supporting description for the section."
      :show-footer="false"
    >
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

export const WithoutDescription: Story = () => ({
  components: { RcSesSubcardV2, RcSesButtonV2 },
  template: `
    <RcSesSubcardV2 heading="Subcard heading" :show-description="false" :show-footer="true">
      <p style="margin: 0;">Subcard content area</p>
      <template #footer>
        <RcSesButtonV2 variant="secondary">Cancel</RcSesButtonV2>
        <RcSesButtonV2 variant="primary">Save</RcSesButtonV2>
      </template>
    </RcSesSubcardV2>
  `,
})

export const WithoutFooter: Story = () => ({
  components: { RcSesSubcardV2 },
  template: `
    <RcSesSubcardV2
      heading="Subcard heading"
      description="Short supporting description"
      :show-footer="false"
    >
      <p style="margin: 0;">Subcard content area</p>
    </RcSesSubcardV2>
  `,
})

export const InsideCard: Story = () => ({
  components: { RcSesCardV2, RcSesSubcardV2, RcSesButtonV2 },
  template: `
    <RcSesCardV2 heading="Main card" :show-description="false">
      <RcSesSubcardV2
        heading="Subcard heading"
        description="Short supporting description"
      >
        <p style="margin: 0;">Grouped content inside the main card.</p>
        <template #footer>
          <RcSesButtonV2 variant="secondary">Cancel</RcSesButtonV2>
          <RcSesButtonV2 variant="primary">Save</RcSesButtonV2>
        </template>
      </RcSesSubcardV2>
    </RcSesCardV2>
  `,
})
