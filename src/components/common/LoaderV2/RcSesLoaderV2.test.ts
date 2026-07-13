import { render, screen } from '@testing-library/vue'
import I18NextVue from 'i18next-vue'
import { describe, expect, it } from 'vitest'

import initI18n from '@/plugins/i18n'

import RcSesLoaderV2 from './RcSesLoaderV2.vue'
import { type LoaderProps, LoaderSize } from './types'

const { i18next } = initI18n()

const renderLoader = (props: Partial<LoaderProps> = {}) =>
  render(RcSesLoaderV2, {
    props,
    global: {
      plugins: [[I18NextVue, { i18next }]],
    },
  })

describe('RcSesLoaderV2', () => {
  it('renders with role status and default label', () => {
    renderLoader()

    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByText('Kraunama...')).toBeInTheDocument()
  })

  it('applies size modifier classes', () => {
    const { container: defaultContainer } = renderLoader()
    const { container: smallContainer } = renderLoader({ size: LoaderSize.Small })
    const { container: largeContainer } = renderLoader({ size: LoaderSize.Large })

    expect(defaultContainer.querySelector('.rc-ses-loader-v2')).toHaveClass(
      'rc-ses-loader-v2--medium',
    )
    expect(smallContainer.querySelector('.rc-ses-loader-v2')).toHaveClass(
      'rc-ses-loader-v2--small',
    )
    expect(largeContainer.querySelector('.rc-ses-loader-v2')).toHaveClass(
      'rc-ses-loader-v2--large',
    )
  })

  it('renders a custom label when provided', () => {
    renderLoader({ label: 'Exporting report...' })

    expect(screen.getByText('Exporting report...')).toBeInTheDocument()
  })

  it('uses aria-label when the visual label is hidden', () => {
    renderLoader({ showLabel: false })

    expect(screen.queryByText('Kraunama...')).not.toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Kraunama...')
  })
})
