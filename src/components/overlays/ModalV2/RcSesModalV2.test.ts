import { fireEvent, render, screen } from '@testing-library/vue'
import I18NextVue from 'i18next-vue'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { createVuetify } from 'vuetify'

import initI18n from '@/plugins/i18n'

import RcSesModalV2 from './RcSesModalV2.vue'

/* eslint-disable vue/one-component-per-file -- test stubs for Vuetify components */
const VBtnStub = defineComponent({
  name: 'VBtn',
  inheritAttrs: false,
  emits: ['click'],
  setup(_, { slots, attrs, emit }) {
    return () =>
      h(
        'button',
        {
          type: 'button',
          ...attrs,
          onClick: (event: Event) => emit('click', event),
        },
        slots.default?.(),
      )
  },
})

const VIconStub = defineComponent({
  name: 'VIcon',
  props: { icon: { type: String, default: undefined } },
  setup(iconProps) {
    return () => h('span', { class: 'v-icon', 'data-icon': iconProps.icon })
  },
})

const VDialogStub = defineComponent({
  name: 'VDialog',
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean, default: false },
  },
  emits: ['update:modelValue', 'click:outside'],
  setup(props, { slots, attrs, emit }) {
    return () =>
      props.modelValue
        ? h('div', { ...attrs, 'data-testid': 'v-dialog' }, [
            h('div', {
              'data-testid': 'dialog-backdrop',
              onClick: () => emit('click:outside'),
            }),
            slots.default?.(),
          ])
        : null
  },
})
/* eslint-enable vue/one-component-per-file */

const vuetify = createVuetify()
const { i18next } = initI18n()

const renderModal = (props = {}, slots = {}) =>
  render(RcSesModalV2, {
    props: {
      modelValue: true,
      title: 'Test title',
      ...props,
    },
    slots: {
      default: 'Body content',
      ...slots,
    },
    global: {
      plugins: [vuetify, [I18NextVue, { i18next }]],
      stubs: {
        VBtn: VBtnStub,
        VIcon: VIconStub,
        VDialog: VDialogStub,
      },
    },
  })

describe('RcSesModalV2', () => {
  it('renders title and default slot content when open', () => {
    renderModal()
    expect(screen.getByRole('heading', { name: 'Test title' })).toBeInTheDocument()
    expect(screen.getByText('Body content')).toBeInTheDocument()
  })

  it('renders two action buttons for destructive type', () => {
    renderModal({ type: 'destructive' })
    expect(screen.getByRole('button', { name: 'Atšaukti' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Pašalinti' })).toBeInTheDocument()
  })

  it('renders one action button for success type', () => {
    renderModal({ type: 'success' })
    expect(screen.getByRole('button', { name: 'Uždaryti' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Atšaukti' })).not.toBeInTheDocument()
  })

  it('shows icon when showIcon is true', () => {
    const { container } = renderModal({ type: 'info', showIcon: true })
    expect(container.querySelector('.rc-ses-modal-v2__icon')).toBeInTheDocument()
  })

  it('hides icon when showIcon is false', () => {
    const { container } = renderModal({ type: 'info', showIcon: false })
    expect(container.querySelector('.rc-ses-modal-v2__icon')).not.toBeInTheDocument()
  })

  it('emits primary when primary action is clicked', async () => {
    const { emitted } = renderModal({ type: 'success' })
    await fireEvent.click(screen.getByRole('button', { name: 'Uždaryti' }))
    expect(emitted().primary).toHaveLength(1)
    expect(emitted()['update:modelValue']).toEqual([[false]])
  })

  it('emits secondary when cancel is clicked', async () => {
    const { emitted } = renderModal({ type: 'confirm' })
    await fireEvent.click(screen.getByRole('button', { name: 'Atšaukti' }))
    expect(emitted().secondary).toHaveLength(1)
    expect(emitted()['update:modelValue']).toEqual([[false]])
  })

  it('uses custom action labels when provided', () => {
    renderModal({
      type: 'destructive',
      primaryActionLabel: 'Delete now',
      secondaryActionLabel: 'Keep',
    })
    expect(screen.getByRole('button', { name: 'Delete now' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Keep' })).toBeInTheDocument()
  })

  it('exposes accessibility attributes linking title and body', () => {
    renderModal()
    const dialog = screen.getByRole('document')
    const title = screen.getByRole('heading', { name: 'Test title' })
    const body = screen.getByText('Body content')

    expect(dialog).toHaveAttribute('aria-labelledby', title.id)
    expect(dialog).toHaveAttribute('aria-describedby', body.id)
    expect(title.id).toMatch(/^rc-ses-modal-v2-title-/)
    expect(body.id).toMatch(/^rc-ses-modal-v2-body-/)
  })

  it('marks decorative icon as hidden from assistive technologies', () => {
    const { container } = renderModal({ type: 'info', showIcon: true })
    expect(container.querySelector('.rc-ses-modal-v2__icon')).toHaveAttribute(
      'aria-hidden',
      'true',
    )
  })

  it('closes modal when backdrop is clicked and persistent is false', async () => {
    const { emitted } = renderModal({ persistent: false })
    await fireEvent.click(screen.getByTestId('dialog-backdrop'))
    expect(emitted()['update:modelValue']).toEqual([[false]])
  })

  it('does not close modal when backdrop is clicked and persistent is true', async () => {
    const { emitted } = renderModal({ persistent: true })
    await fireEvent.click(screen.getByTestId('dialog-backdrop'))
    expect(emitted()['update:modelValue']).toBeUndefined()
  })
})
