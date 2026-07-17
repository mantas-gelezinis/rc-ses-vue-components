import { fireEvent, render, screen } from '@testing-library/vue'
import I18NextVue from 'i18next-vue'
import { describe, expect, it } from 'vitest'
import { defineComponent, h, ref } from 'vue'

import RcSesRadioGroupV2 from '@/components/common/inputs/Radios/RadioGroupV2/RcSesRadioGroupV2.vue'
import type { RadioGroupProps } from '@/components/common/inputs/Radios/RadioGroupV2/types'
import RcSesRadioV2 from '@/components/common/inputs/Radios/RadioV2/RcSesRadioV2.vue'
import type { RadioProps } from '@/components/common/inputs/Radios/RadioV2/types'
import initI18n from '@/plugins/i18n'

const { i18next } = initI18n()

const VRadioStub = defineComponent({
  name: 'VRadio',
  inheritAttrs: false,
  props: {
    value: { type: [String, Number, Boolean], default: undefined },
    label: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
    trueIcon: { type: String, default: undefined },
    falseIcon: { type: String, default: undefined },
  },
  emits: ['click'],
  setup(radioProps, { attrs, slots, emit }) {
    return () =>
      h(
        'div',
        {
          class: ['v-radio', 'v-selection-control', 'rc-ses-radio-v2', attrs.class],
          role: 'radio',
          'aria-label': attrs['aria-label'],
          'aria-checked': attrs['aria-checked'],
          'aria-disabled': radioProps.disabled || undefined,
          onClick: (event: MouseEvent) => emit('click', event),
        },
        [
          h('input', {
            type: 'radio',
            role: 'presentation',
            tabindex: -1,
            disabled: radioProps.disabled,
            value: radioProps.value,
          }),
          radioProps.label ? h('label', {}, radioProps.label) : slots.label?.(),
        ],
      )
  },
})

const renderRadioInGroup = (
  radioProps: Partial<RadioProps> = {},
  groupProps: Partial<RadioGroupProps> & {
    modelValue?: string | number | boolean | null
  } = {},
) => {
  const { modelValue, ...restGroupProps } = groupProps
  const model = ref(modelValue ?? null)

  return render(
    {
      components: { RcSesRadioGroupV2, RcSesRadioV2 },
      setup() {
        return {
          model,
          restGroupProps,
          radioProps: {
            label: 'Radio text',
            value: 'option-a',
            ...radioProps,
          },
        }
      },
      template: `
        <RcSesRadioGroupV2 v-model="model" v-bind="restGroupProps">
          <RcSesRadioV2 v-bind="radioProps" />
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

describe('RcSesRadioV2', () => {
  it('renders the label text', () => {
    renderRadioInGroup()

    expect(screen.getByText('Radio text')).toBeInTheDocument()
  })

  it('applies checked modifier when group model matches value', () => {
    const { container } = renderRadioInGroup(
      { value: 'option-a' },
      { modelValue: 'option-a' },
    )

    expect(container.querySelector('.rc-ses-radio-v2')).toHaveClass(
      'rc-ses-radio-v2--checked',
    )
  })

  it('applies error modifier when group has error', () => {
    const { container } = renderRadioInGroup({}, { error: true })

    expect(container.querySelector('.rc-ses-radio-v2')).toHaveClass(
      'rc-ses-radio-v2--error',
    )
  })

  it('selects value in the group when clicked', async () => {
    const { container } = renderRadioInGroup({ value: 'option-a' }, { modelValue: null })

    await fireEvent.click(screen.getByRole('radio'))

    expect(container.querySelector('.rc-ses-radio-v2')).toHaveClass(
      'rc-ses-radio-v2--checked',
    )
  })

  it('renders loading skeleton instead of the control', () => {
    const { container } = renderRadioInGroup({ loading: true })

    expect(screen.queryByRole('radio')).not.toBeInTheDocument()
    expect(container.querySelector('.rc-ses-radio-v2--loading')).toBeInTheDocument()
  })

  it('hides the label when showLabel is false', () => {
    renderRadioInGroup({ showLabel: false, accessibleLabel: 'Pasirinkti' })

    expect(screen.queryByText('Radio text')).not.toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Pasirinkti' })).toBeInTheDocument()
  })

  it('does not toggle when disabled', async () => {
    const { container } = renderRadioInGroup(
      { disabled: true, value: 'option-a' },
      { modelValue: null },
    )

    expect(container.querySelector('.rc-ses-radio-v2')).toHaveClass(
      'rc-ses-radio-v2--disabled',
    )

    await fireEvent.click(screen.getByRole('radio'))

    expect(container.querySelector('.rc-ses-radio-v2')).not.toHaveClass(
      'rc-ses-radio-v2--checked',
    )
  })
})
