import { fireEvent, render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

import RcSesChipSelectV2 from './RcSesChipSelectV2.vue'
import type { ChipSelectOption, ChipSelectProps } from './types'

const defaultOptions: ChipSelectOption[] = [
  { text: 'Reikšmė 1', value: 'val1' },
  { text: 'Reikšmė 2', value: 'val2' },
  { text: 'Reikšmė 3', value: 'val3' },
]

const RcSesBadgeV2Stub = {
  props: ['type', 'showIcon', 'disabled', 'accessibleLabel'],
  emits: ['click'],
  template: `
    <button
      type="button"
      :data-type="type"
      :data-show-icon="showIcon"
      :disabled="disabled"
      :aria-label="accessibleLabel"
      @click="$emit('click')"
    >
      <slot />
    </button>
  `,
}

const renderChipSelect = (
  props: Partial<ChipSelectProps> & { modelValue?: string | number } = {},
) =>
  render(RcSesChipSelectV2, {
    props: {
      options: defaultOptions,
      modelValue: 'val1',
      ...props,
    },
    global: {
      stubs: {
        RcSesBadgeV2: RcSesBadgeV2Stub,
      },
    },
  })

describe('RcSesChipSelectV2', () => {
  it('renders all option labels', () => {
    renderChipSelect()

    expect(
      screen.getByRole('button', { name: 'Reikšmė 1, selected' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reikšmė 2' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reikšmė 3' })).toBeInTheDocument()
  })

  it('applies brand type to the selected option', () => {
    renderChipSelect({ modelValue: 'val2' })

    expect(screen.getByRole('button', { name: 'Reikšmė 2, selected' })).toHaveAttribute(
      'data-type',
      'brand',
    )
    expect(screen.getByRole('button', { name: 'Reikšmė 1' })).toHaveAttribute(
      'data-type',
      'neutral',
    )
  })

  it('updates modelValue when another option is selected', async () => {
    const { emitted } = renderChipSelect({ modelValue: 'val1' })

    await fireEvent.click(screen.getByRole('button', { name: 'Reikšmė 3' }))

    expect(emitted()['update:modelValue']).toEqual([['val3']])
  })

  it('does not emit when the already selected option is clicked', async () => {
    const { emitted } = renderChipSelect({ modelValue: 'val1' })

    await fireEvent.click(screen.getByRole('button', { name: 'Reikšmė 1, selected' }))

    expect(emitted()['update:modelValue']).toBeUndefined()
  })

  it('does not emit when disabled', async () => {
    const { emitted } = renderChipSelect({ modelValue: 'val1', disabled: true })

    await fireEvent.click(screen.getByRole('button', { name: 'Reikšmė 2' }))

    expect(emitted()['update:modelValue']).toBeUndefined()
  })

  it('exposes radiogroup semantics', () => {
    renderChipSelect({ accessibleLabel: 'Filtras' })

    expect(screen.getByRole('radiogroup', { name: 'Filtras' })).toBeInTheDocument()
  })
})
