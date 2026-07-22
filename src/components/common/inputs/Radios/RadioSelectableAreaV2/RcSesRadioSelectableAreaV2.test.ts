import { fireEvent, render, screen } from '@testing-library/vue'
import I18NextVue from 'i18next-vue'
import { describe, expect, it } from 'vitest'
import { defineComponent, h, ref } from 'vue'

import RcSesRadioGroupV2 from '@/components/common/inputs/Radios/RadioGroupV2/RcSesRadioGroupV2.vue'
import type { RadioGroupProps } from '@/components/common/inputs/Radios/RadioGroupV2/types'
import RcSesRadioSelectableAreaV2 from '@/components/common/inputs/Radios/RadioSelectableAreaV2/RcSesRadioSelectableAreaV2.vue'
import type { RadioSelectableAreaProps } from '@/components/common/inputs/Radios/RadioSelectableAreaV2/types'
import initI18n from '@/plugins/i18n'

const { i18next } = initI18n()

const VRadioStub = defineComponent({
  name: 'VRadio',
  inheritAttrs: false,
  props: {
    value: { type: [String, Number, Boolean], default: undefined },
    disabled: { type: Boolean, default: false },
  },
  emits: ['click'],
  setup(radioProps, { attrs, emit }) {
    return () =>
      h(
        'div',
        {
          class: ['v-radio', 'rc-ses-radio-v2', attrs.class],
          onClick: (event: MouseEvent) => emit('click', event),
        },
        [
          h('input', {
            type: 'radio',
            role: 'presentation',
            disabled: radioProps.disabled,
            value: radioProps.value,
          }),
        ],
      )
  },
})

const renderSelectableAreaInGroup = (
  areaProps: Partial<RadioSelectableAreaProps> = {},
  groupProps: Partial<RadioGroupProps> & {
    modelValue?: string | number | boolean | null
  } = {},
) => {
  const { modelValue, ...restGroupProps } = groupProps
  const model = ref(modelValue ?? null)

  return render(
    {
      components: { RcSesRadioGroupV2, RcSesRadioSelectableAreaV2 },
      setup() {
        return {
          model,
          restGroupProps,
          areaProps: {
            description: 'Description text',
            value: 'option-a',
            ...areaProps,
          },
        }
      },
      template: `
        <RcSesRadioGroupV2 v-model="model" v-bind="restGroupProps">
          <RcSesRadioSelectableAreaV2 v-bind="areaProps" />
        </RcSesRadioGroupV2>
      `,
    },
    {
      global: {
        plugins: [[I18NextVue, { i18next }]],
        stubs: {
          VRadio: VRadioStub,
        },
      },
    },
  )
}

describe('RcSesRadioSelectableAreaV2', () => {
  it('renders description text', () => {
    renderSelectableAreaInGroup()

    expect(screen.getByText('Description text')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    const { container } = renderSelectableAreaInGroup({ title: 'Title' })

    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(container.querySelector('.rc-ses-radio-selectable-area-v2')).toHaveClass(
      'rc-ses-radio-selectable-area-v2--with-heading',
    )
  })

  it('renders trailing value when provided', () => {
    renderSelectableAreaInGroup({ trailing: '00,00 €' })

    expect(screen.getByText('00,00 €')).toBeInTheDocument()
  })

  it('selects value in the group when the area is clicked', async () => {
    const { container } = renderSelectableAreaInGroup(
      { value: 'card' },
      { modelValue: null },
    )

    await fireEvent.click(screen.getByText('Description text'))

    expect(container.querySelector('.rc-ses-radio-selectable-area-v2')).toHaveClass(
      'rc-ses-radio-selectable-area-v2--checked',
    )
  })

  it('applies checked modifier when group model matches value', () => {
    const { container } = renderSelectableAreaInGroup(
      { value: 'option-a' },
      { modelValue: 'option-a' },
    )

    expect(container.querySelector('.rc-ses-radio-selectable-area-v2')).toHaveClass(
      'rc-ses-radio-selectable-area-v2--checked',
    )
  })

  it('does not change value when disabled', async () => {
    const { container } = renderSelectableAreaInGroup(
      { disabled: true, value: 'option-a' },
      { modelValue: null },
    )

    const area = container.querySelector('.rc-ses-radio-selectable-area-v2')

    expect(area).toHaveAttribute('tabindex', '-1')

    await fireEvent.click(screen.getByText('Description text'))

    expect(area).not.toHaveClass('rc-ses-radio-selectable-area-v2--checked')
  })

  it('renders loading skeleton', () => {
    const { container } = renderSelectableAreaInGroup({ loading: true })

    expect(screen.queryByRole('radio')).not.toBeInTheDocument()
    expect(
      container.querySelector('.rc-ses-radio-selectable-area-v2--loading'),
    ).toBeInTheDocument()
  })

  it('exposes a single radio role on the area (visual radio is decorative)', () => {
    renderSelectableAreaInGroup({ accessibleLabel: 'Payment card' })

    expect(screen.getAllByRole('radio')).toHaveLength(1)
    expect(screen.getByRole('radio', { name: 'Payment card' })).toBeInTheDocument()
  })

  it('selects via keyboard Enter', async () => {
    const { container } = renderSelectableAreaInGroup(
      { value: 'bank' },
      { modelValue: null },
    )

    await fireEvent.keyDown(screen.getByRole('radio'), { key: 'Enter' })

    expect(container.querySelector('.rc-ses-radio-selectable-area-v2')).toHaveClass(
      'rc-ses-radio-selectable-area-v2--checked',
    )
  })
})
