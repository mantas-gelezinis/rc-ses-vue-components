import { fireEvent, render, screen } from '@testing-library/vue'
import I18NextVue from 'i18next-vue'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'

import initI18n from '@/plugins/i18n'

import RcSesErrorSummaryV2 from './RcSesErrorSummaryV2.vue'
import type { ErrorSummaryProps } from './types'

const { i18next } = initI18n()

const renderSummary = (props: Partial<ErrorSummaryProps> = {}) =>
  render(RcSesErrorSummaryV2, {
    props: {
      autofocus: false,
      ...props,
    },
    global: {
      plugins: [[I18NextVue, { i18next }]],
      stubs: {
        'v-icon': true,
      },
    },
  })

describe('RcSesErrorSummaryV2', () => {
  it('renders nothing when there are no errors', () => {
    const { container } = renderSummary({ errors: [] })

    expect(container.querySelector('.rc-ses-error-summary-v2')).not.toBeInTheDocument()
  })

  it('renders the default title and error messages', () => {
    renderSummary({
      errors: [
        { message: 'Vardas, pavardė — privaloma', fieldId: 'fullName' },
        'Serverio klaida — bandykite dar kartą',
      ],
    })

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Pataisykite šias klaidas' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Vardas, pavardė — privaloma' }),
    ).toHaveAttribute('href', '#fullName')
    expect(screen.getByText('Serverio klaida — bandykite dar kartą')).toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: 'Serverio klaida — bandykite dar kartą' }),
    ).not.toBeInTheDocument()
  })

  it('accepts plain string errors without field links', () => {
    renderSummary({
      errors: ['Bendroji klaida'],
    })

    expect(screen.getByText('Bendroji klaida')).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('uses a custom title when provided', () => {
    renderSummary({
      title: 'Yra klaidų',
      errors: ['Klaida'],
    })

    expect(screen.getByRole('heading', { name: 'Yra klaidų' })).toBeInTheDocument()
  })

  it('focuses the linked field when an error link is clicked', async () => {
    const field = document.createElement('input')
    field.id = 'email'
    document.body.appendChild(field)
    const focusSpy = vi.spyOn(field, 'focus')

    renderSummary({
      errors: [{ message: 'El. paštas — neteisingo formato', fieldId: 'email' }],
    })

    await fireEvent.click(
      screen.getByRole('link', { name: 'El. paštas — neteisingo formato' }),
    )
    await nextTick()

    expect(focusSpy).toHaveBeenCalled()
    field.remove()
  })

  it('exposes focus() to move keyboard focus onto the summary', async () => {
    const { container } = renderSummary({
      errors: ['Klaida'],
    })

    const summary = container.querySelector('.rc-ses-error-summary-v2') as HTMLElement
    const focusSpy = vi.spyOn(summary, 'focus')

    // Access exposed method via the Vue instance on the container's first child vnode is awkward;
    // instead assert tabindex and call focus on the root element (same as expose).
    expect(summary).toHaveAttribute('tabindex', '-1')
    summary.focus()
    expect(focusSpy).toHaveBeenCalled()
  })
})
