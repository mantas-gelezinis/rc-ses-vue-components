import type { Meta, StoryFn } from '@storybook/vue3'

import RcSesCardV2 from '@/components/common/CardV2/RcSesCardV2.vue'
import RcSesReviewCardV2 from '@/components/common/reviewCardV2/RcSesReviewCardV2.vue'

const summaryRowStyle = {
  display: 'grid',
  gap: '4px',
  margin: '0',
} as const

const summaryLabelStyle = {
  color: 'rgb(var(--v-theme-text-secondary-v2))',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  margin: '0',
} as const

const summaryValueStyle = {
  color: 'rgb(var(--v-theme-text-default-v2))',
  fontSize: '0.875rem',
  fontWeight: '500',
  lineHeight: '1.25rem',
  margin: '0',
} as const

const meta: Meta<typeof RcSesReviewCardV2> = {
  title: 'componentsV2/ReviewCard',
  component: RcSesReviewCardV2,
  tags: ['autodocs'],
  argTypes: {
    heading: { control: 'text' },
    showEdit: { control: 'boolean' },
    editLabel: { control: 'text' },
    headingLevel: {
      control: 'select',
      options: [4, 5, 6],
    },
  },
}

export default meta

type Story = StoryFn<typeof RcSesReviewCardV2>

export const Default: Story = (args) => ({
  components: { RcSesReviewCardV2 },
  setup() {
    return {
      args,
      summaryRowStyle,
      summaryLabelStyle,
      summaryValueStyle,
    }
  },
  template: `
    <RcSesReviewCardV2 v-bind="args">
      <dl :style="summaryRowStyle">
        <dt :style="summaryLabelStyle">Full name</dt>
        <dd :style="summaryValueStyle">John Doe</dd>
      </dl>
      <dl :style="summaryRowStyle">
        <dt :style="summaryLabelStyle">Personal code</dt>
        <dd :style="summaryValueStyle">3850........</dd>
      </dl>
      <dl :style="summaryRowStyle">
        <dt :style="summaryLabelStyle">Address</dt>
        <dd :style="summaryValueStyle">Example street 1</dd>
      </dl>
    </RcSesReviewCardV2>
  `,
})
Default.args = {
  heading: 'Section heading',
  showEdit: true,
}

export const WithoutEdit: Story = (args) => ({
  components: { RcSesReviewCardV2 },
  setup() {
    return {
      args,
      summaryRowStyle,
      summaryLabelStyle,
      summaryValueStyle,
    }
  },
  template: `
    <RcSesReviewCardV2 v-bind="args" :show-edit="false">
      <dl :style="summaryRowStyle">
        <dt :style="summaryLabelStyle">Full name</dt>
        <dd :style="summaryValueStyle">John Doe</dd>
      </dl>
      <dl :style="summaryRowStyle">
        <dt :style="summaryLabelStyle">Personal code</dt>
        <dd :style="summaryValueStyle">3850........</dd>
      </dl>
    </RcSesReviewCardV2>
  `,
})
WithoutEdit.args = {
  heading: 'Section heading',
}

export const ReviewStep: Story = (args) => ({
  components: { RcSesCardV2, RcSesReviewCardV2 },
  setup() {
    return {
      args,
      summaryRowStyle,
      summaryLabelStyle,
      summaryValueStyle,
    }
  },
  template: `
    <RcSesCardV2
      heading="Review and sign"
      description="Review the information before submitting."
    >
      <div style="display: grid; gap: 16px;">
        <RcSesReviewCardV2 heading="Authorized persons">
          <dl :style="summaryRowStyle">
            <dt :style="summaryLabelStyle">Grantor</dt>
            <dd :style="summaryValueStyle">Jane Smith · ID 38900000000</dd>
          </dl>
          <dl :style="summaryRowStyle">
            <dt :style="summaryLabelStyle">Authorized person</dt>
            <dd :style="summaryValueStyle">John Doe · ID 47000000000</dd>
          </dl>
        </RcSesReviewCardV2>
        <RcSesReviewCardV2 heading="Granted rights">
          <dl :style="summaryRowStyle">
            <dt :style="summaryLabelStyle">Service provider</dt>
            <dd :style="summaryValueStyle">Example municipality</dd>
          </dl>
          <dl :style="summaryRowStyle">
            <dt :style="summaryLabelStyle">Selected rights (2)</dt>
            <dd :style="summaryValueStyle">Represent · Sign documents</dd>
          </dl>
        </RcSesReviewCardV2>
        <RcSesReviewCardV2 v-bind="args" heading="Term and conditions">
          <dl :style="summaryRowStyle">
            <dt :style="summaryLabelStyle">Valid until</dt>
            <dd :style="summaryValueStyle">2027-05-19</dd>
          </dl>
          <dl :style="summaryRowStyle">
            <dt :style="summaryLabelStyle">Additional conditions</dt>
            <dd :style="summaryValueStyle">Prepared in local and English language</dd>
          </dl>
        </RcSesReviewCardV2>
      </div>
    </RcSesCardV2>
  `,
})
ReviewStep.args = {
  showEdit: true,
}
