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
        RcSesButtonV2: RcSesButtonV2Stub,
        RcSesCardFooterV2: false,
        RcSesCardPriceBeforeTaxesV2: false,
      },
    },
  })

describe('RcSesCardV2', () => {
  describe('header', () => {
    it('renders heading as semantic h2 by default', () => {
      renderCard({ heading: 'Užsakymo forma' })

      const heading = screen.getByRole('heading', { level: 2, name: 'Užsakymo forma' })
      expect(heading).toHaveClass('rc-ses-card-v2__heading')
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

  describe('footer', () => {
    it('renders step-n footer with back and continue actions', () => {
      renderCard({ variant: 'step-n', showBackAction: true })

      expect(screen.getByRole('button', { name: 'Grįžti' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Tęsti' })).toBeInTheDocument()
    })

    it('emits back when back button is clicked', async () => {
      const { emitted } = renderCard({ variant: 'step-n', showBackAction: true })

      await fireEvent.click(screen.getByRole('button', { name: 'Grįžti' }))

      expect(emitted().back).toHaveLength(1)
    })

    it('hides footer when showFooter is false', () => {
      renderCard({ showFooter: false })

      expect(screen.queryByRole('button', { name: 'Tęsti' })).not.toBeInTheDocument()
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
          RcSesCardPriceBeforeTaxesV2: false,
        },
      },
    })

  it('renders cancel and continue for step-1 variant', () => {
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

  it('renders price block for final variant', () => {
    renderFooter({
      variant: 'final',
      showPrice: true,
      price: 12.34,
    })

    expect(screen.getByText('Suma be PVM:')).toBeInTheDocument()
    expect(screen.getByText('12,34 €')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Apmokėti' })).toHaveAttribute(
      'data-prepend-icon',
      '$shoppingCart',
    )
  })
})
