import { fireEvent, render, screen } from '@testing-library/vue'
import I18NextVue from 'i18next-vue'
import { describe, expect, it } from 'vitest'

import initI18n from '@/plugins/i18n'

import RcSesFullPageLoaderV2 from './RcSesFullPageLoaderV2.vue'
import { FullPageLoaderBackdrop, type FullPageLoaderProps } from './types'

const { i18next } = initI18n()

const vOverlayStub = {
  template: '<div data-testid="full-page-loader-overlay"><slot /></div>',
}

const vOverlayEmitStub = {
  template:
    '<div data-testid="full-page-loader-overlay" @click="$emit(\'update:modelValue\', false)"><slot /></div>',
}

const renderFullPageLoader = (
  props: Partial<FullPageLoaderProps> = {},
  stubs: { VOverlay?: typeof vOverlayStub } = { VOverlay: vOverlayStub },
) =>
  render(RcSesFullPageLoaderV2, {
    props,
    global: {
      plugins: [[I18NextVue, { i18next }]],
      stubs,
    },
  })

describe('RcSesFullPageLoaderV2', () => {
  it('renders the large loader inside the overlay card', () => {
    const { container } = renderFullPageLoader()

    expect(screen.getByTestId('full-page-loader-overlay')).toBeInTheDocument()
    expect(
      container.querySelector('.rc-ses-full-page-loader-v2__card'),
    ).toBeInTheDocument()
    expect(container.querySelector('.rc-ses-loader-v2--large')).toBeInTheDocument()
    expect(screen.getByText('Kraunama...')).toBeInTheDocument()
  })

  it('applies backdrop modifier classes', () => {
    const { container: darkContainer } = renderFullPageLoader()
    const { container: lightContainer } = renderFullPageLoader({
      backdrop: FullPageLoaderBackdrop.Light,
    })

    expect(darkContainer.querySelector('.rc-ses-full-page-loader-v2')).toHaveClass(
      'rc-ses-full-page-loader-v2--dark',
    )
    expect(lightContainer.querySelector('.rc-ses-full-page-loader-v2')).toHaveClass(
      'rc-ses-full-page-loader-v2--light',
    )
  })

  it('emits update:modelValue when the overlay closes', async () => {
    const { emitted } = renderFullPageLoader(
      { modelValue: true },
      { VOverlay: vOverlayEmitStub },
    )

    await fireEvent.click(screen.getByTestId('full-page-loader-overlay'))

    expect(emitted()['update:modelValue']).toEqual([[false]])
  })
})
