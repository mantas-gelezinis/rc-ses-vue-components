import { fireEvent, render, screen } from '@testing-library/vue'
import I18NextVue from 'i18next-vue'
import { describe, expect, it } from 'vitest'

import initI18n from '@/plugins/i18n'

import RcSesInlineAlertV2 from './RcSesInlineAlertV2.vue'
import { type InlineAlertProps, InlineAlertType } from './types'

const { i18next } = initI18n()

const defaultMessage = 'Pranešimo tekstas. Pakeisk turinį pagal kontekstą.'

const renderInlineAlert = (
  props: Partial<InlineAlertProps> = {},
  slots: Record<string, string> = {},
) =>
  render(RcSesInlineAlertV2, {
    props: {
      message: defaultMessage,
      ...props,
    },
    slots,
    global: {
      plugins: [[I18NextVue, { i18next }]],
      stubs: {
        RcSesButtonV2: {
          props: ['variant', 'size'],
          emits: ['click'],
          template: `
            <button type="button" :data-variant="variant" @click="$emit('click')">
              <slot />
            </button>
          `,
        },
      },
    },
  })

describe('RcSesInlineAlertV2', () => {
  it('renders the message text', () => {
    renderInlineAlert()

    expect(screen.getByText(defaultMessage)).toBeInTheDocument()
  })

  it('applies type modifier classes', () => {
    const { container } = renderInlineAlert({ type: InlineAlertType.Warning })

    expect(container.querySelector('.rc-ses-inline-alert-v2')).toHaveClass(
      'rc-ses-inline-alert-v2--warning',
    )
  })

  it('uses role status and polite live region for info alerts', () => {
    const { container } = renderInlineAlert({ type: InlineAlertType.Info })

    const alert = container.querySelector('.rc-ses-inline-alert-v2')
    expect(alert).toHaveAttribute('role', 'status')
    expect(alert).toHaveAttribute('aria-live', 'polite')
  })

  it('uses role alert and assertive live region for error alerts', () => {
    const { container } = renderInlineAlert({ type: InlineAlertType.Error })

    const alert = container.querySelector('.rc-ses-inline-alert-v2')
    expect(alert).toHaveAttribute('role', 'alert')
    expect(alert).toHaveAttribute('aria-live', 'assertive')
  })

  it('hides the status icon when showIcon is false', () => {
    const { container } = renderInlineAlert({ showIcon: false })

    expect(
      container.querySelector('.rc-ses-inline-alert-v2__icon'),
    ).not.toBeInTheDocument()
  })

  it('emits close when the dismiss button is clicked', async () => {
    const { emitted } = renderInlineAlert()

    await fireEvent.click(screen.getByRole('button', { name: 'Uždaryti' }))

    expect(emitted().close).toEqual([[]])
  })

  it('renders and emits action when showAction is true', async () => {
    const { emitted } = renderInlineAlert({
      showAction: true,
      actionLabel: 'Peržiūrėti',
    })

    const actionButton = screen.getByRole('button', { name: 'Peržiūrėti' })
    expect(actionButton).toHaveAttribute('data-variant', 'link')

    await fireEvent.click(actionButton)

    expect(emitted().action).toEqual([[]])
  })
})
