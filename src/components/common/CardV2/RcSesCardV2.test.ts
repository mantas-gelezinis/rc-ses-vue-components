/* eslint-disable vue/one-component-per-file */
import { fireEvent, render, screen } from '@testing-library/vue'
import I18NextVue from 'i18next-vue'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'

import initI18n from '@/plugins/i18n'

import RcSesCardFooterV2 from './RcSesCardFooterV2.vue'
import RcSesCardV2 from './RcSesCardV2.vue'

const { i18next } = initI18n()

const renderWithI18n = (
  component: Parameters<typeof render>[0],
  options: Parameters<typeof render>[1] = {},
) =>
  render(component, {
    ...options,
    global: {
      ...options.global,
      plugins: [[I18NextVue, { i18next }], ...(options.global?.plugins ?? [])],
    },
  })

const RcSesButtonV2Stub = defineComponent({
  name: 'RcSesButtonV2',
  props: {
    variant: { type: String, default: undefined },
    size: { type: String, default: undefined },
    prependIcon: { type: String, default: undefined },
    appendIcon: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
  },
  emits: ['click'],
  setup(props, { slots, emit }) {
    return () =>
      h(
        'button',
        {
          type: 'button',
          disabled: props.disabled,
          'data-variant': props.variant,
          'data-size': props.size,
          'data-prepend-icon': props.prependIcon,
          'data-append-icon': props.appendIcon,
          onClick: () => emit('click'),
        },
        slots.default?.(),
      )
  },
})

const VCardStub = defineComponent({
  name: 'VCard',
  setup(_, { slots }) {
    return () => h('div', { class: 'v-card' }, slots.default?.())
  },
})

describe('RcSesCardV2', () => {
  const renderCard = (
    props: Record<string, unknown> = {},
    slots: Record<string, string> = {},
  ) =>
    renderWithI18n(RcSesCardV2, {
      props: {
        heading: 'Pavadinimas',
        ...props,
      },
      slots,
      global: {
        stubs: {
          VCard: VCardStub,
        },
      },
    })

  describe('header', () => {
    it('renders heading as semantic h2 by default', () => {
      renderCard({ heading: 'Užsakymo forma' })

      const heading = screen.getByRole('heading', { level: 2, name: 'Užsakymo forma' })
      expect(heading).toHaveClass('rc-ses-card-v2__heading')
    })

    it('renders heading with the requested heading level', () => {
      renderCard({ heading: 'Antraštė', headingLevel: 3 })

      expect(
        screen.getByRole('heading', { level: 3, name: 'Antraštė' }),
      ).toBeInTheDocument()
    })

    it('renders description when showDescription is true', () => {
      renderCard({
        description: 'Papildoma informacija',
        showDescription: true,
      })

      expect(screen.getByText('Papildoma informacija')).toHaveClass(
        'rc-ses-card-v2__description',
      )
    })

    it('hides description when showDescription is false', () => {
      renderCard({
        description: 'Paslėptas aprašymas',
        showDescription: false,
      })

      expect(screen.queryByText('Paslėptas aprašymas')).not.toBeInTheDocument()
    })
  })

  describe('content', () => {
    it('renders default slot content', () => {
      renderCard({}, { default: 'Turinio sritis' })

      expect(screen.getByText('Turinio sritis')).toBeInTheDocument()
    })

    it('applies content variant class', () => {
      const { container } = renderCard({ contentVariant: 'form-stack' })

      expect(
        container.querySelector('.rc-ses-card-v2__content--form-stack'),
      ).toBeInTheDocument()
    })
  })

  describe('footer slot', () => {
    it('renders footer wrapper only when footer slot is provided', () => {
      const { container } = renderCard({}, { footer: 'Poraštės turinys' })

      expect(container.querySelector('.rc-ses-card-v2__footer')).toBeInTheDocument()
      expect(screen.getByText('Poraštės turinys')).toBeInTheDocument()
    })

    it('does not render footer wrapper without a footer slot', () => {
      const { container } = renderCard()

      expect(container.querySelector('.rc-ses-card-v2__footer')).not.toBeInTheDocument()
    })
  })
})

describe('RcSesCardFooterV2', () => {
  const renderFooter = (props: Record<string, unknown> = {}) =>
    renderWithI18n(RcSesCardFooterV2, {
      props,
      global: {
        stubs: {
          RcSesButtonV2: RcSesButtonV2Stub,
        },
      },
    })

  describe('variant: step-1', () => {
    it('renders cancel and continue actions', () => {
      renderFooter({ variant: 'step-1', showSecondaryAction: true })

      expect(screen.getByRole('button', { name: 'Atšaukti' })).toHaveAttribute(
        'data-size',
        'small',
      )
      expect(screen.getByRole('button', { name: 'Tęsti' })).toHaveAttribute(
        'data-append-icon',
        '$caretRight',
      )
    })

    it('emits both cancel and secondary when left button is clicked', async () => {
      const { emitted } = renderFooter({ variant: 'step-1', showSecondaryAction: true })

      await fireEvent.click(screen.getByRole('button', { name: 'Atšaukti' }))

      expect(emitted().cancel).toHaveLength(1)
      expect(emitted().secondary).toHaveLength(1)
    })

    it('disables the left button via secondaryDisabled', () => {
      renderFooter({
        variant: 'step-1',
        showSecondaryAction: true,
        secondaryDisabled: true,
      })

      expect(screen.getByRole('button', { name: 'Atšaukti' })).toBeDisabled()
    })
  })

  describe('variant: step-n', () => {
    it('renders back and continue actions', () => {
      renderFooter({ variant: 'step-n', showBackAction: true })

      expect(screen.getByRole('button', { name: 'Grįžti' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Tęsti' })).toBeInTheDocument()
    })

    it('emits back and primary on their respective clicks', async () => {
      const { emitted } = renderFooter({ variant: 'step-n', showBackAction: true })

      await fireEvent.click(screen.getByRole('button', { name: 'Grįžti' }))
      await fireEvent.click(screen.getByRole('button', { name: 'Tęsti' }))

      expect(emitted().back).toHaveLength(1)
      expect(emitted().primary).toHaveLength(1)
    })

    it('renders and emits secondary action when enabled', async () => {
      const { emitted } = renderFooter({
        variant: 'step-n',
        showSecondaryAction: true,
        secondaryLabel: 'Atšaukti',
      })

      const secondary = screen.getByRole('button', { name: 'Atšaukti' })
      await fireEvent.click(secondary)

      expect(emitted().secondary).toHaveLength(1)
    })

    it('hides the back button when showBackAction is false', () => {
      renderFooter({ variant: 'step-n', showBackAction: false })

      expect(screen.queryByRole('button', { name: 'Grįžti' })).not.toBeInTheDocument()
    })

    it('disables primary and back via their disabled props', () => {
      renderFooter({
        variant: 'step-n',
        showBackAction: true,
        primaryDisabled: true,
        backDisabled: true,
      })

      expect(screen.getByRole('button', { name: 'Grįžti' })).toBeDisabled()
      expect(screen.getByRole('button', { name: 'Tęsti' })).toBeDisabled()
    })
  })

  describe('variant: final', () => {
    it('renders formatted price block passed by the consumer', () => {
      renderFooter({
        variant: 'final',
        showPrice: true,
        price: '12,34 €',
        priceLabel: 'Suma be PVM:',
      })

      expect(screen.getByText('Suma be PVM:')).toBeInTheDocument()
      expect(screen.getByText('12,34 €')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Apmokėti' })).toHaveAttribute(
        'data-prepend-icon',
        '$shoppingCart',
      )
    })

    it('hides the price block when showPrice is false', () => {
      renderFooter({
        variant: 'final',
        showPrice: false,
        price: '12,34 €',
        priceLabel: 'Suma be PVM:',
      })

      expect(screen.queryByText('12,34 €')).not.toBeInTheDocument()
    })

    it('emits primary on pay click', async () => {
      const { emitted } = renderFooter({ variant: 'final' })

      await fireEvent.click(screen.getByRole('button', { name: 'Apmokėti' }))

      expect(emitted().primary).toHaveLength(1)
    })
  })

  describe('variant: custom', () => {
    it('renders custom slot content instead of default actions', () => {
      renderWithI18n(RcSesCardFooterV2, {
        props: { variant: 'custom' },
        slots: { default: 'Nestandartinė poraštė' },
        global: { stubs: { RcSesButtonV2: RcSesButtonV2Stub } },
      })

      expect(screen.getByText('Nestandartinė poraštė')).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: 'Tęsti' })).not.toBeInTheDocument()
    })
  })
})
