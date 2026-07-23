import { render, screen } from '@testing-library/vue'
import I18NextVue from 'i18next-vue'
import { describe, expect, it } from 'vitest'
import { ref } from 'vue'

import RcSesRadioGroupV2 from '@/components/common/inputs/Radios/RadioGroupV2/RcSesRadioGroupV2.vue'
import type { RadioGroupProps } from '@/components/common/inputs/Radios/RadioGroupV2/types'
import RcSesRadioV2 from '@/components/common/inputs/Radios/RadioV2/RcSesRadioV2.vue'
import initI18n from '@/plugins/i18n'

const { i18next } = initI18n()

const renderGroup = (
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
        }
      },
      template: `
        <RcSesRadioGroupV2 v-model="model" v-bind="restGroupProps">
          <RcSesRadioV2 value="a" label="Option A" />
          <RcSesRadioV2 value="b" label="Option B" />
        </RcSesRadioGroupV2>
      `,
    },
    {
      global: {
        plugins: [[I18NextVue, { i18next }]],
        stubs: {
          VRadio: true,
        },
      },
    },
  )
}

describe('RcSesRadioGroupV2', () => {
  it('exposes accessible label on the radiogroup', () => {
    renderGroup({ accessibleLabel: 'Mokėjimas' })

    expect(screen.getByRole('radiogroup', { name: 'Mokėjimas' })).toBeInTheDocument()
  })

  it('shows error message when error is a string', () => {
    renderGroup({ error: 'Privalomas laukas' })

    expect(screen.getByText('Privalomas laukas')).toBeInTheDocument()
  })

  it('marks the radiogroup as invalid when error is set', () => {
    renderGroup({ error: true, accessibleLabel: 'Pasirinkimas' })

    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-invalid', 'true')
  })
})
