import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'

import RcSesBackdropV2 from './RcSesBackdropV2.vue'

/* eslint-disable vue/one-component-per-file -- test stub for Vuetify component */
const VOverlayStub = defineComponent({
  name: 'VOverlay',
  inheritAttrs: false,
  props: {
    modelValue: Boolean,
  },
  setup(props, { attrs }) {
    return () =>
      props.modelValue ? h('div', { ...attrs, 'data-testid': 'v-overlay' }) : null
  },
})
/* eslint-enable vue/one-component-per-file */

describe('RcSesBackdropV2', () => {
  it('renders backdrop overlay element', () => {
    const { container } = render(RcSesBackdropV2, {
      global: {
        components: {
          VOverlay: VOverlayStub,
        },
      },
    })
    expect(screen.getByTestId('backdrop')).toBeInTheDocument()
  })
})
