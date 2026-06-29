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

const VIconWithDataIconStub = defineComponent({
  name: 'VIcon',
  props: { icon: { type: String, default: undefined } },
  setup(iconProps) {
    return () => h('span', { class: 'v-icon', 'data-icon': iconProps.icon })
  },
})

const renderButton = (
  props: Partial<ButtonProps> = {},
  slots: Record<string, string> = {},
  iconStub = VIconStub,
) =>
  render(RcSesButtonV2, {
    props,
    slots,
    global: {
      stubs: { VBtn: VBtnStub, VIcon: iconStub },
    },
  })

describe('RcSesButtonV2', () => {
  describe('render basics', () => {
    it('renders slot content', () => {
      renderButton({}, { default: 'Click me' })

      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
    })

    describe('variant mapping', () => {
      it.each([
        ['primary', 'flat'],
        ['secondary', 'outlined'],
        ['error', 'flat'],
        ['link', 'text'],
      ] as const)('maps %s to %s v-btn variant', (variant, expected) => {
        renderButton({ variant }, { default: 'Button' })

        expect(screen.getByRole('button')).toHaveAttribute('data-variant', expected)
      })
    })
  })

  describe('loading states', () => {
    it('uses v-btn loading for text-only loading state', () => {
      renderButton({ loading: true }, { default: 'Button' })

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('data-loading', 'true')
      expect(button.className).toContain('rc-ses-btn-v2--text-loading')
    })

    it('replaces prepend icon with spinner when loading', () => {
      renderButton({ loading: true, prependIcon: '$plus' }, { default: 'Button' })

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('data-loading', 'false')
      expect(button).toHaveAttribute('data-prepend-icon', '$spinner')
      expect(button.className).toContain('rc-ses-btn-v2--loading')
      expect(button.className).not.toContain('rc-ses-btn-v2--text-loading')
    })

    it('treats bare loading attribute as loading state', () => {
      renderButton(
        { loading: '' as ButtonProps['loading'], prependIcon: '$plus' },
        { default: 'Button' },
      )

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('data-prepend-icon', '$spinner')
      expect(button.className).toContain('rc-ses-btn-v2--loading')
    })

    it('sets aria-busy when loading with custom spinner', () => {
      renderButton({ loading: true, prependIcon: '$plus' }, { default: 'Button' })

      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
    })

    it('does not apply loading class when loading is undefined', () => {
      renderButton({}, { default: 'Button' })

      expect(screen.getByRole('button').className).not.toContain('rc-ses-btn-v2--loading')
    })
  })

  describe('icon-only mode', () => {
    it('renders icon-only button with icon prop', () => {
      renderButton({ icon: '$plus', accessibleLabel: 'Add item' })

      const button = screen.getByRole('button', { name: 'Add item' })
      expect(button).toHaveAttribute('data-icon', 'true')
      expect(button).toHaveAttribute('aria-label', 'Add item')
      expect(button.className).toContain('rc-ses-btn-v2--icon-only')
      expect(button.querySelector('.v-icon')).toBeInTheDocument()
    })

    it('renders spinner for icon-only loading state', () => {
      renderButton(
        { icon: '$plus', loading: true, accessibleLabel: 'Add item' },
        { default: 'Button' },
        VIconWithDataIconStub,
      )

      const button = screen.getByRole('button', { name: 'Add item' })
      expect(button).toHaveAttribute('data-loading', 'false')
      expect(button).toHaveAttribute('aria-busy', 'true')
      expect(button.querySelector('.v-icon')).toHaveAttribute('data-icon', '$spinner')
      expect(button.className).toContain('rc-ses-btn-v2--loading')
    })
  })
})
