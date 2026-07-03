/* eslint-disable vue/one-component-per-file */
import { fireEvent, render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'

import RcSesToggleV2 from './RcSesToggleV2.vue'
import type { ToggleProps } from './types'

const VSwitchStub = defineComponent({
  name: 'VSwitch',
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean, default: false },
    label: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    inset: { type: Boolean, default: false },
    flat: { type: Boolean, default: false },
    hideDetails: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(switchProps, { emit, attrs }) {
    const inputId = 'rc-toggle-stub-input'

    return () =>
      h('div', { class: 'v-switch' }, [
        h('input', {
          id: inputId,
          type: 'checkbox',
          role: attrs.role,
          'aria-checked': attrs['aria-checked'],
          'aria-label': attrs['aria-label'],
          disabled: switchProps.disabled,
          checked: switchProps.modelValue === true,
          onChange: (event: Event) => {
            if (switchProps.disabled || switchProps.readonly) {
              return
            }

            emit('update:modelValue', (event.target as HTMLInputElement).checked)
          },
        }),
        switchProps.label ? h('label', { for: inputId }, switchProps.label) : null,
      ])
  },
})

const renderToggle = (props: Partial<ToggleProps> & { modelValue?: boolean } = {}) =>
  render(RcSesToggleV2, {
    props,
    global: {
      stubs: { VSwitch: VSwitchStub },
    },
  })

describe('RcSesToggleV2', () => {
  it('renders with label when showLabel is true', () => {
    renderToggle({ label: 'Toggle text', showLabel: true, modelValue: false })

    expect(screen.getByText('Toggle text')).toBeInTheDocument()
    expect(screen.getByRole('switch', { name: 'Toggle text' })).toBeInTheDocument()
  })

  it.each([
    { modelValue: false, ariaChecked: 'false' },
    { modelValue: true, ariaChecked: 'true' },
  ])(
    'sets aria-checked to $ariaChecked when modelValue is $modelValue',
    ({ modelValue, ariaChecked }) => {
      renderToggle({ label: 'Toggle text', modelValue })

      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', ariaChecked)
    },
  )

  it('hides visible label and uses ariaLabel when showLabel is false', () => {
    renderToggle({
      label: 'Toggle text',
      showLabel: false,
      ariaLabel: 'Enable notifications',
      modelValue: false,
    })

    expect(screen.queryByText('Toggle text')).not.toBeInTheDocument()
    expect(
      screen.getByRole('switch', { name: 'Enable notifications' }),
    ).toBeInTheDocument()
  })

  it('emits update:modelValue when toggled', async () => {
    const { emitted } = renderToggle({ label: 'Toggle text', modelValue: false })

    await fireEvent.click(screen.getByRole('switch'))
    expect(emitted()['update:modelValue']).toEqual([[true]])
  })

  it('does not toggle when disabled', async () => {
    const { emitted } = renderToggle({
      label: 'Toggle text',
      modelValue: false,
      disabled: true,
    })

    await fireEvent.click(screen.getByRole('switch'))
    expect(emitted()['update:modelValue']).toBeUndefined()
  })
})

/* eslint-enable vue/one-component-per-file */
