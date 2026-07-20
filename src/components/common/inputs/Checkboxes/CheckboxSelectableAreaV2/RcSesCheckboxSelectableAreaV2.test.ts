import { fireEvent, render, screen } from '@testing-library/vue'
import I18NextVue from 'i18next-vue'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'

import initI18n from '@/plugins/i18n'

import RcSesCheckboxSelectableAreaV2 from './RcSesCheckboxSelectableAreaV2.vue'
import type { CheckboxSelectableAreaProps } from './types'

const { i18next } = initI18n()

const VCheckboxStub = defineComponent({
  name: 'VCheckbox',
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    indeterminate: { type: Boolean, default: false },
  },
  emits: ['update:modelValue', 'click'],
  setup(checkboxProps, { emit, attrs }) {
    return () =>
      h('div', { class: ['v-checkbox', 'rc-ses-checkbox-v2', attrs.class] }, [
        h('input', {
          type: 'checkbox',
          role: 'checkbox',
          'aria-label': attrs['aria-label'],
          disabled: checkboxProps.disabled,
          checked: checkboxProps.modelValue === true,
          onChange: (event: Event) => {
            if (checkboxProps.disabled) {
              return
            }

            emit('update:modelValue', (event.target as HTMLInputElement).checked)
          },
          onClick: (event: Event) => {
            event.stopPropagation()
            emit('click')
          },
        }),
      ])
  },
})

const renderSelectableArea = (
  props: Partial<CheckboxSelectableAreaProps> & { modelValue?: boolean } = {},
) =>
  render(RcSesCheckboxSelectableAreaV2, {
    props: {
      description: 'Description text',
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

describe('RcSesCheckboxSelectableAreaV2', () => {
  it('renders description text', () => {
    renderSelectableArea()

    expect(screen.getByText('Description text')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    const { container } = renderSelectableArea({ title: 'Title' })

    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(container.querySelector('.rc-ses-checkbox-selectable-area-v2')).toHaveClass(
      'rc-ses-checkbox-selectable-area-v2--with-heading',
    )
  })

  it('renders trailing value when provided', () => {
    renderSelectableArea({ trailing: '00,00 €' })

    expect(screen.getByText('00,00 €')).toBeInTheDocument()
  })

  it('toggles modelValue when the area is clicked', async () => {
    const { emitted } = renderSelectableArea({ modelValue: false })

    await fireEvent.click(screen.getByText('Description text'))

    expect(emitted()['update:modelValue']).toEqual([[true]])
  })

  it('applies checked modifier when selected', () => {
    const { container } = renderSelectableArea({ modelValue: true })

    expect(container.querySelector('.rc-ses-checkbox-selectable-area-v2')).toHaveClass(
      'rc-ses-checkbox-selectable-area-v2--checked',
    )
  })

  it('does not toggle when disabled', async () => {
    const { emitted } = renderSelectableArea({ disabled: true })

    await fireEvent.click(screen.getByText('Description text'))

    expect(emitted()['update:modelValue']).toBeUndefined()
  })

  it('renders loading skeleton', () => {
    const { container } = renderSelectableArea({ loading: true })

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
    expect(
      container.querySelector('.rc-ses-checkbox-selectable-area-v2--loading'),
    ).toBeInTheDocument()
  })
})
