import type { Meta, StoryObj } from '@storybook/vue3'

import RcSesCardFooterV2 from '@/components/common/CardV2/RcSesCardFooterV2.vue'
import RcSesCardV2 from '@/components/common/CardV2/RcSesCardV2.vue'

const meta: Meta<typeof RcSesCardV2> = {
  title: 'componentsV2/Card',
  component: RcSesCardV2,
  tags: ['autodocs'],
  argTypes: {
    heading: { control: 'text' },
    showDescription: { control: 'boolean' },
    description: { control: 'text' },
    contentVariant: {
      control: 'select',
      options: ['default', 'form-stack', 'radio-list', 'item-list', 'empty', 'review'],
    },
    headingLevel: {
      control: 'select',
      options: [2, 3, 4, 5, 6],
    },
  },
}

export default meta

type Story = StoryObj<typeof RcSesCardV2>

export const StepN: Story = {
  args: {
    heading: 'Pavadinimas',
    description: 'Papildomas aprašymo tekstas',
  },
  render: (args) => ({
    components: { RcSesCardV2, RcSesCardFooterV2 },
    setup() {
      return { args }
    },
    template: `
      <RcSesCardV2 v-bind="args">
        <div style="padding: 12px; border: 1px dashed #ccc; border-radius: 8px;">
          Turinio sritis (slot)
        </div>
        <template #footer>
          <RcSesCardFooterV2 variant="step-n" :show-back-action="true" />
        </template>
      </RcSesCardV2>
    `,
  }),
}

export const Step1: Story = {
  render: (args) => ({
    components: { RcSesCardV2, RcSesCardFooterV2 },
    setup() {
      return { args }
    },
    template: `
      <RcSesCardV2 v-bind="args" heading="Pirmas žingsnis">
        <div style="padding: 12px; border: 1px dashed #ccc; border-radius: 8px;">
          Formos laukai
        </div>
        <template #footer>
          <RcSesCardFooterV2
            variant="step-1"
            :show-back-action="false"
            :show-secondary-action="true"
          />
        </template>
      </RcSesCardV2>
    `,
  }),
}

export const Final: Story = {
  render: (args) => ({
    components: { RcSesCardV2, RcSesCardFooterV2 },
    setup() {
      return { args }
    },
    template: `
      <RcSesCardV2 v-bind="args" heading="Patvirtinimas">
        <div style="padding: 12px; border: 1px dashed #ccc; border-radius: 8px;">
          Peržiūros suvestinė
        </div>
        <template #footer>
          <RcSesCardFooterV2
            variant="final"
            primary-label="Apmokėti"
            :show-price="true"
            price="125,50 €"
            price-label="Suma be PVM:"
            :show-back-action="true"
          />
        </template>
      </RcSesCardV2>
    `,
  }),
}

export const Mobile: Story = {
  render: (args) => ({
    components: { RcSesCardV2, RcSesCardFooterV2 },
    setup() {
      return { args }
    },
    template: `
      <div style="max-width: 568px;">
        <RcSesCardV2 v-bind="args" heading="Mobili versija">
          <div style="padding: 12px; border: 1px dashed #ccc; border-radius: 8px;">
            Turinys
          </div>
          <template #footer>
            <RcSesCardFooterV2 variant="step-n" />
          </template>
        </RcSesCardV2>
      </div>
    `,
  }),
}

export const FormStackContent: Story = {
  render: (args) => ({
    components: { RcSesCardV2 },
    setup() {
      return { args }
    },
    template: `
      <RcSesCardV2 v-bind="args" heading="Forma" content-variant="form-stack">
        <div style="padding: 8px 0;">Laukas 1</div>
        <div style="padding: 8px 0;">Laukas 2</div>
        <div style="padding: 8px 0;">Laukas 3</div>
      </RcSesCardV2>
    `,
  }),
}

export const FooterOnly: Story = {
  name: 'Card footer (standalone)',
  render: () => ({
    components: { RcSesCardFooterV2 },
    template: `
      <div style="max-width: 1064px;">
        <RcSesCardFooterV2 variant="step-n" />
      </div>
    `,
  }),
}
