import { fireEvent, render, screen } from '@testing-library/vue'
import I18NextVue from 'i18next-vue'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'

import initI18n from '@/plugins/i18n'

import RcSesCheckboxV2 from './RcSesCheckboxV2.vue'
import type { CheckboxProps } from './types'

const { i18next } = initI18n()

const VCheckboxStub = defineComponent({
  name: 'VCheckbox',
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean, default: false },
    label: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
    indeterminate: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    errorMessages: { type: [String, Array], default: undefined },
    hideDetails: { type: [Boolean, String], default: false },
    trueIcon: { type: String, default: undefined },
    falseIcon: { type: String, default: undefined },
    indeterminateIcon: { type: String, default: undefined },
  },
  emits: ['update:modelValue', 'click'],
  setup(checkboxProps, { emit, attrs, slots }) {
    const inputId = 'rc-checkbox-stub-input'

    return () =>
      h(
        'div',
        {
          class: [
            'v-checkbox',
            'rc-ses-checkbox-v2',
            attrs.class,
            {
              'rc-ses-checkbox-v2--checked':
                checkboxProps.modelValue && !checkboxProps.indeterminate,
              'rc-ses-checkbox-v2--indeterminate': checkboxProps.indeterminate,
              'rc-ses-checkbox-v2--disabled': checkboxProps.disabled,
              'rc-ses-checkbox-v2--error': checkboxProps.error,
            },
          ],
        },
        [
          h('input', {
            id: inputId,
            type: 'checkbox',
            role: 'checkbox',
            'aria-label': attrs['aria-label'],
            'aria-invalid': checkboxProps.error ? 'true' : undefined,
            disabled: checkboxProps.disabled,
            checked: checkboxProps.modelValue === true,
            indeterminate: checkboxProps.indeterminate,
            onChange: (event: Event) => {
              if (checkboxProps.disabled) {
                return
              }

              emit('update:modelValue', (event.target as HTMLInputElement).checked)
            },
            onClick: () => emit('click'),
          }),
          checkboxProps.indeterminate
            ? h('span', { 'data-icon': checkboxProps.indeterminateIcon })
            : null,
          checkboxProps.label
            ? h('label', { for: inputId }, checkboxProps.label)
            : slots.label?.(),
          checkboxProps.errorMessages
            ? h('p', {}, String(checkboxProps.errorMessages))
            : null,
        ],
      )
  },
})

const renderCheckbox = (props: Partial<CheckboxProps> & { modelValue?: boolean } = {}) =>
  render(RcSesCheckboxV2, {
    props: {
      label: 'Checkbox text',
      modelValue: false,
      ...props,
    },
    global: {
      plugins: [[I18NextVue, { i18next }]],
      stubs: {
        VCheckbox: VCheckboxStub,
      },
    },
  })

describe('RcSesCheckboxV2', () => {
  it('renders the label text', () => {
    renderCheckbox()

    expect(screen.getByText('Checkbox text')).toBeInTheDocument()
  })

  it('toggles modelValue on click', async () => {
    const { emitted } = renderCheckbox({ modelValue: false })

    await fireEvent.click(screen.getByRole('checkbox'))

    expect(emitted()['update:modelValue']).toEqual([[true]])
  })

  it('applies checked modifier when selected', () => {
    const { container } = renderCheckbox({ modelValue: true })

    expect(container.querySelector('.rc-ses-checkbox-v2')).toHaveClass(
      'rc-ses-checkbox-v2--checked',
    )
  })

  it('applies indeterminate modifier and icon', () => {
    const { container } = renderCheckbox({ indeterminate: true, modelValue: false })

    expect(container.querySelector('.rc-ses-checkbox-v2')).toHaveClass(
      'rc-ses-checkbox-v2--indeterminate',
    )
    expect(container.querySelector('[data-icon="$minusBold"]')).toBeInTheDocument()
  })

  it('does not toggle when disabled', async () => {
    const { emitted } = renderCheckbox({ disabled: true, modelValue: false })

    await fireEvent.click(screen.getByRole('checkbox'))

    expect(emitted()['update:modelValue']).toBeUndefined()
  })

  it('shows error message and aria-invalid when error is a string', () => {
    renderCheckbox({ error: 'Privalomas laukas' })

    expect(screen.getByText('Privalomas laukas')).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('renders loading skeleton instead of the control', () => {
    const { container } = renderCheckbox({ loading: true })

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
    expect(container.querySelector('.rc-ses-checkbox-v2--loading')).toBeInTheDocument()
  })

  it('hides the label when showLabel is false', () => {
    renderCheckbox({ showLabel: false, accessibleLabel: 'Pasirinkti' })

    expect(screen.queryByText('Checkbox text')).not.toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'Pasirinkti' })).toBeInTheDocument()
  })
})
