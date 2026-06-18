/* eslint-disable vue/one-component-per-file */
import { render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'

import RcSesButtonV2 from './RcSesButtonV2.vue'
import type { ButtonProps } from './types'

const VBtnStub = defineComponent({
  name: 'VBtn',
  inheritAttrs: false,
  props: {
    loading: { type: Boolean, default: false },
    prependIcon: { type: String, default: undefined },
    appendIcon: { type: String, default: undefined },
    icon: { type: [String, Boolean], default: undefined },
    variant: { type: String, default: undefined },
    size: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        'button',
        {
          type: 'button',
          ...attrs,
          'data-loading': props.loading ? 'true' : 'false',
          'data-prepend-icon': props.prependIcon,
          'data-append-icon': props.appendIcon,
          'data-icon': props.icon,
          'data-variant': props.variant,
          'data-size': props.size,
          disabled: props.disabled,
        },
        [slots.prepend?.(), slots.default?.(), slots.append?.(), slots.loader?.()],
      )
  },
})

const VIconStub = defineComponent({
  name: 'VIcon',
  setup(_, { slots }) {
    return () => h('span', { class: 'v-icon' }, slots.default?.())
  },
})

describe('RcSesButtonV2', () => {
  it('renders slot content', () => {
    render(RcSesButtonV2, {
      slots: { default: 'Click me' },
      global: {
        stubs: { VBtn: VBtnStub, VIcon: VIconStub },
      },
    })

    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('maps primary variant to flat v-btn variant', () => {
    render(RcSesButtonV2, {
      props: { variant: 'primary' },
      slots: { default: 'Button' },
      global: {
        stubs: { VBtn: VBtnStub, VIcon: VIconStub },
      },
    })

    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'flat')
  })

  it('maps secondary variant to outlined v-btn variant', () => {
    render(RcSesButtonV2, {
      props: { variant: 'secondary' },
      slots: { default: 'Button' },
      global: {
        stubs: { VBtn: VBtnStub, VIcon: VIconStub },
      },
    })

    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'outlined')
  })

  it('uses v-btn loading for text-only loading state', () => {
    render(RcSesButtonV2, {
      props: { loading: true },
      slots: { default: 'Button' },
      global: {
        stubs: { VBtn: VBtnStub, VIcon: VIconStub },
      },
    })

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('data-loading', 'true')
    expect(button.className).toContain('rc-ses-btn-v2--text-loading')
  })

  it('replaces prepend icon with spinner when loading', () => {
    render(RcSesButtonV2, {
      props: { loading: true, prependIcon: '$plus' },
      slots: { default: 'Button' },
      global: {
        stubs: { VBtn: VBtnStub, VIcon: VIconStub },
      },
    })

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('data-loading', 'false')
    expect(button).toHaveAttribute('data-prepend-icon', '$spinner')
    expect(button.className).toContain('rc-ses-btn-v2--loading')
    expect(button.className).not.toContain('rc-ses-btn-v2--text-loading')
  })

  it('treats bare loading attribute as loading state', () => {
    render(RcSesButtonV2, {
      props: { loading: '' as ButtonProps['loading'], prependIcon: '$plus' },
      slots: { default: 'Button' },
      global: {
        stubs: { VBtn: VBtnStub, VIcon: VIconStub },
      },
    })

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('data-prepend-icon', '$spinner')
    expect(button.className).toContain('rc-ses-btn-v2--loading')
  })

  it('renders icon-only button with icon prop', () => {
    render(RcSesButtonV2, {
      props: { icon: '$plus', accessibleLabel: 'Add item' },
      global: {
        stubs: { VBtn: VBtnStub, VIcon: VIconStub },
      },
    })

    const button = screen.getByRole('button', { name: 'Add item' })
    expect(button).toHaveAttribute('data-icon', 'true')
    expect(button).toHaveAttribute('aria-label', 'Add item')
    expect(button.className).toContain('rc-ses-btn-v2--icon-only')
    expect(button.querySelector('.v-icon')).toBeInTheDocument()
  })

  it('sets aria-busy when loading with custom spinner', () => {
    render(RcSesButtonV2, {
      props: { loading: true, prependIcon: '$plus' },
      slots: { default: 'Button' },
      global: {
        stubs: { VBtn: VBtnStub, VIcon: VIconStub },
      },
    })

    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
  })

  it('renders spinner for icon-only loading state', () => {
    render(RcSesButtonV2, {
      props: { icon: '$plus', loading: true, accessibleLabel: 'Add item' },
      slots: { default: 'Button' },
      global: {
        stubs: {
          VBtn: VBtnStub,
          VIcon: defineComponent({
            name: 'VIcon',
            props: { icon: { type: String, default: undefined } },
            setup(iconProps) {
              return () => h('span', { class: 'v-icon', 'data-icon': iconProps.icon })
            },
          }),
        },
      },
    })

    const button = screen.getByRole('button', { name: 'Add item' })
    expect(button).toHaveAttribute('data-loading', 'false')
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(button.querySelector('.v-icon')).toHaveAttribute('data-icon', '$spinner')
    expect(button.className).toContain('rc-ses-btn-v2--loading')
  })

  it('does not apply loading class when loading is undefined', () => {
    render(RcSesButtonV2, {
      slots: { default: 'Button' },
      global: {
        stubs: { VBtn: VBtnStub, VIcon: VIconStub },
      },
    })

    expect(screen.getByRole('button').className).not.toContain('rc-ses-btn-v2--loading')
  })
})
