import { fireEvent, render, screen } from '@testing-library/vue'
import I18NextVue from 'i18next-vue'
import { describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'

import initI18n from '@/plugins/i18n'

import RcSesBadgeV2 from './RcSesBadgeV2.vue'

/* eslint-disable vue/one-component-per-file -- test stubs for Vuetify components */
const VChipStub = defineComponent({
  name: 'VChip',
  props: {
    closable: Boolean,
    disabled: Boolean,
    closeLabel: {
      type: String,
      default: undefined,
    },
  },
  emits: ['click:close'],
  template: `
    <div>
      <slot name="prepend" />
      <slot />
      <button
        v-if="closable"
        type="button"
        :disabled="disabled"
        :aria-label="closeLabel"
        @click="$emit('click:close')"
      >
        <slot name="close" />
      </button>
    </div>
  `,
})

const VIconStub = defineComponent({
  name: 'VIcon',
  template: '<span />',
})

/* eslint-enable vue/one-component-per-file */

const { i18next } = initI18n()

const renderBadge = (props = {}, slots = {}) =>
  render(RcSesBadgeV2, {
    props,
    slots,
    global: {
      plugins: [[I18NextVue, { i18next }]],
      components: {
        VChip: VChipStub,
        VIcon: VIconStub,
      },
    },
  })

describe('RcSesBadgeV2', () => {
  it('renders badge text via slot', () => {
    renderBadge({}, { default: 'Registered' })
    expect(screen.getByText('Registered')).toBeInTheDocument()
  })

  it('emits close when close button is clicked', async () => {
    const { emitted } = renderBadge({ showClose: true }, { default: 'Filter' })

    await fireEvent.click(screen.getByRole('button', { name: 'Pašalinti' }))
    expect(emitted().close).toHaveLength(1)
  })

  it('does not emit close when disabled', async () => {
    const { emitted } = renderBadge(
      { showClose: true, disabled: true },
      { default: 'Filter' },
    )

    await fireEvent.click(screen.getByRole('button', { name: 'Pašalinti' }))
    expect(emitted().close).toBeUndefined()
  })
})
