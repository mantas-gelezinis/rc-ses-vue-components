import type { Meta, StoryFn } from '@storybook/vue3'

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
    variant: {
      control: 'select',
      options: ['step-1', 'step-n', 'final', 'custom'],
    },
    showFooter: { control: 'boolean' },
    showBackAction: { control: 'boolean' },
    showSecondaryAction: { control: 'boolean' },
    showPrice: { control: 'boolean' },
    price: { control: 'number' },
  },
}

export default meta

type Story = StoryFn<typeof RcSesCardV2>

const Template: Story = (args) => ({
  components: { RcSesCardV2 },
  setup() {
    return { args }
  },
  template: `
    <RcSesCardV2 v-bind="args">
      <div style="padding: 12px; border: 1px dashed #ccc; border-radius: 8px;">
        Turinio sritis (slot)
      </div>
    </RcSesCardV2>
  `,
})

export const StepN = Template.bind({})
StepN.args = {
  heading: 'Pavadinimas',
  description: 'Papildomas aprašymo tekstas',
  variant: 'step-n',
  showBackAction: true,
  showSecondaryAction: true,
}

export const Step1: Story = (args) => ({
  components: { RcSesCardV2 },
  setup() {
    return { args }
  },
  template: `
    <RcSesCardV2
      v-bind="args"
      heading="Pirmas žingsnis"
      variant="step-1"
      :show-back-action="false"
      :show-secondary-action="true"
    >
      <div style="padding: 12px; border: 1px dashed #ccc; border-radius: 8px;">
        Formos laukai
      </div>
    </RcSesCardV2>
  `,
})

export const Final: Story = (args) => ({
  components: { RcSesCardV2 },
  setup() {
    return { args }
  },
  template: `
    <RcSesCardV2
      v-bind="args"
      heading="Patvirtinimas"
      variant="final"
      primary-label="Apmokėti"
      :show-price="true"
      :price="125.5"
      :show-back-action="true"
    >
      <div style="padding: 12px; border: 1px dashed #ccc; border-radius: 8px;">
        Peržiūros suvestinė
      </div>
    </RcSesCardV2>
  `,
})

export const Mobile: Story = (args) => ({
  components: { RcSesCardV2 },
  setup() {
    return { args }
  },
  template: `
    <div style="max-width: 568px;">
      <RcSesCardV2
        v-bind="args"
        heading="Mobili versija"
        variant="step-n"
      >
        <div style="padding: 12px; border: 1px dashed #ccc; border-radius: 8px;">
          Turinys
        </div>
      </RcSesCardV2>
    </div>
  `,
})

export const FormStackContent: Story = (args) => ({
  components: { RcSesCardV2 },
  setup() {
    return { args }
  },
  template: `
    <RcSesCardV2
      v-bind="args"
      heading="Forma"
      content-variant="form-stack"
      variant="step-n"
    >
      <div style="padding: 8px 0;">Laukas 1</div>
      <div style="padding: 8px 0;">Laukas 2</div>
      <div style="padding: 8px 0;">Laukas 3</div>
    </RcSesCardV2>
  `,
})

export const FooterOnly: Story = () => ({
  components: { RcSesCardFooterV2 },
  template: `
    <div style="max-width: 1064px;">
      <RcSesCardFooterV2 variant="step-n" />
    </div>
  `,
})

FooterOnly.storyName = 'Card footer (standalone)'
