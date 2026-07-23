import { fireEvent, render, screen } from '@testing-library/vue'
import I18NextVue from 'i18next-vue'
import { describe, expect, it } from 'vitest'

import initI18n from '@/plugins/i18n'

import RcSesSnackbarV2 from './RcSesSnackbarV2.vue'
import { type SnackbarProps, SnackbarState } from './types'

const { i18next } = initI18n()

const defaultMessage = 'Trumpas informacinis tekstas.'

const renderSnackbar = (props: Partial<SnackbarProps> = {}) =>
  render(RcSesSnackbarV2, {
    props: {
      state: SnackbarState.Success,
      message: defaultMessage,
      modelValue: true,
      ...props,
    },
    global: {
      plugins: [[I18NextVue, { i18next }]],
      stubs: {
        VSnackbar: {
          props: ['modelValue', 'timeout', 'location', 'contained'],
          emits: ['update:modelValue'],
          template: `
            <div
              v-if="modelValue"
              data-testid="v-snackbar"
              :data-timeout="timeout"
              @keydown="$event.key === 'Escape' && $emit('update:modelValue', false)"
            >
              <slot />
            </div>
          `,
        },
        VIcon: {
          props: ['icon'],
          template: '<span :data-icon="icon" />',
        },
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

describe('RcSesSnackbarV2', () => {
  it('renders the message text', () => {
    renderSnackbar()

    expect(screen.getByText(defaultMessage)).toBeInTheDocument()
  })

  it('applies with-action modifier when showAction is true', () => {
    const { container } = renderSnackbar({
      showAction: true,
      actionLabel: 'Button',
    })

    expect(container.querySelector('.rc-ses-snackbar-v2')).toHaveClass(
      'rc-ses-snackbar-v2--with-action',
    )
  })

  it('uses role status and polite live region for success snackbars', () => {
    const { container } = renderSnackbar({ state: SnackbarState.Success })

    const snackbar = container.querySelector('.rc-ses-snackbar-v2')
    expect(snackbar).toHaveAttribute('role', 'status')
    expect(snackbar).toHaveAttribute('aria-live', 'polite')
    expect(snackbar).toHaveAttribute('aria-atomic', 'true')
  })

  it('uses role alert and assertive live region for error snackbars', () => {
    const { container } = renderSnackbar({ state: SnackbarState.Error })

    const snackbar = container.querySelector('.rc-ses-snackbar-v2')
    expect(snackbar).toHaveAttribute('role', 'alert')
    expect(snackbar).toHaveAttribute('aria-live', 'assertive')
  })

  it('renders action button when showAction is true', () => {
    renderSnackbar({
      showAction: true,
      actionLabel: 'Button',
    })

    expect(screen.getByRole('button', { name: 'Button' })).toBeInTheDocument()
  })

  it('does not render action button when showAction is false', () => {
    renderSnackbar({
      showAction: false,
      actionLabel: 'Button',
    })

    expect(screen.queryByRole('button', { name: 'Button' })).not.toBeInTheDocument()
  })

  it('emits close when the dismiss button is clicked', async () => {
    const { emitted } = renderSnackbar()

    await fireEvent.click(screen.getByRole('button', { name: 'Uždaryti' }))

    expect(emitted().close).toEqual([[]])
    expect(emitted()['update:modelValue']).toEqual([[false]])
  })

  it('emits update:modelValue once when Vuetify closes the snackbar', async () => {
    const { emitted } = renderSnackbar()

    await fireEvent.keyDown(screen.getByTestId('v-snackbar'), { key: 'Escape' })

    expect(emitted()['update:modelValue']).toEqual([[false]])
    expect(emitted().close).toEqual([[]])
  })

  it('emits action and closes when dismissOnAction is true', async () => {
    const { emitted } = renderSnackbar({
      showAction: true,
      actionLabel: 'Button',
      dismissOnAction: true,
    })

    await fireEvent.click(screen.getByRole('button', { name: 'Button' }))

    expect(emitted().action).toEqual([[]])
    expect(emitted().close).toEqual([[]])
  })

  it('does not auto-hide when persist is true', () => {
    renderSnackbar({ persist: true, duration: 1000 })

    expect(screen.getByTestId('v-snackbar')).toHaveAttribute('data-timeout', '-1')
  })

  it('shows the full message when showAction is false', () => {
    const longMessage = 'a'.repeat(80)

    renderSnackbar({
      showAction: false,
      message: longMessage,
    })

    expect(screen.getByText(longMessage)).toBeInTheDocument()
  })

  it('truncates long messages when showAction is true', () => {
    const longMessage = 'a'.repeat(130)

    renderSnackbar({
      showAction: true,
      actionLabel: 'Button',
      message: longMessage,
    })

    expect(screen.getByText(`${'a'.repeat(120)}...`)).toBeInTheDocument()
  })
})
