/* eslint-disable vue/one-component-per-file */
import { fireEvent, render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'

import RcSesImageAndTextV2 from './RcSesImageAndTextV2.vue'
import type { ImageAndTextProps } from './types'

const VIconStub = defineComponent({
  name: 'VIcon',
  props: {
    icon: { type: String, default: undefined },
    size: { type: [Number, String], default: undefined },
  },
  setup(iconProps) {
    return () =>
      h('i', {
        class: 'v-icon',
        'data-icon': iconProps.icon,
        'data-size': iconProps.size,
      })
  },
})

const RcSesButtonV2Stub = defineComponent({
  name: 'RcSesButtonV2',
  inheritAttrs: false,
  props: {
    variant: { type: String, default: undefined },
    prependIcon: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
  },
  emits: ['click'],
  setup(buttonProps, { slots, emit }) {
    return () =>
      h(
        'button',
        {
          type: 'button',
          disabled: buttonProps.disabled,
          'data-variant': buttonProps.variant,
          'data-prepend-icon': buttonProps.prependIcon,
          onClick: () => {
            if (buttonProps.disabled) {
              return
            }

            emit('click')
          },
        },
        slots.default?.(),
      )
  },
})

const renderImageAndText = (
  props: Partial<ImageAndTextProps> = {},
  slots: Record<string, string> = {},
) =>
  render(RcSesImageAndTextV2, {
    props: {
      title: 'Place heading text here',
      description:
        'Additional description text elaborating on situation and what to do next.',
      action: { label: 'Button' },
      ...props,
    },
    slots,
    global: {
      stubs: { VIcon: VIconStub, RcSesButtonV2: RcSesButtonV2Stub },
    },
  })

describe('RcSesImageAndTextV2', () => {
  it('renders title and description', () => {
    renderImageAndText()

    expect(
      screen.getByRole('heading', { name: 'Place heading text here' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Additional description text elaborating on situation and what to do next.',
      ),
    ).toBeInTheDocument()
  })

  it('renders the default $infoRegular icon', () => {
    const { container } = renderImageAndText()

    expect(container.querySelector('.v-icon')).toHaveAttribute(
      'data-icon',
      '$infoRegular',
    )
  })

  it('renders a custom icon alias', () => {
    const { container } = renderImageAndText({ icon: '$magnifyingGlass' })

    expect(container.querySelector('.v-icon')).toHaveAttribute(
      'data-icon',
      '$magnifyingGlass',
    )
  })

  it('applies the background modifier when background is true', () => {
    const { container } = renderImageAndText({ background: true })

    expect(container.querySelector('.rc-ses-image-and-text-v2')).toHaveClass(
      'rc-ses-image-and-text-v2--background',
    )
  })

  it('renders action button and emits action on click', async () => {
    const { emitted } = renderImageAndText({ action: { label: 'Retry' } })

    await fireEvent.click(screen.getByRole('button', { name: 'Retry' }))

    expect(emitted().action).toEqual([[]])
  })

  it('hides action button when action is omitted', () => {
    renderImageAndText({ action: undefined })

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('passes action icon to the action button', () => {
    renderImageAndText({ action: { label: 'Add item', icon: '$plus' } })

    expect(screen.getByRole('button', { name: 'Add item' })).toHaveAttribute(
      'data-prepend-icon',
      '$plus',
    )
  })

  it('disables the action button when action.disabled is true', () => {
    renderImageAndText({ action: { label: 'Retry', disabled: true } })

    expect(screen.getByRole('button', { name: 'Retry' })).toBeDisabled()
  })

  it('does not emit action when the button is disabled', async () => {
    const { emitted } = renderImageAndText({
      action: { label: 'Retry', disabled: true },
    })

    await fireEvent.click(screen.getByRole('button', { name: 'Retry' }))

    expect(emitted().action).toBeUndefined()
  })

  it('renders title slot content instead of the title prop', () => {
    renderImageAndText({ title: 'Prop title' }, { title: 'Slot title' })

    expect(screen.getByRole('heading', { name: 'Slot title' })).toBeInTheDocument()
    expect(screen.queryByText('Prop title')).not.toBeInTheDocument()
  })

  it('renders description slot content', () => {
    renderImageAndText({ description: undefined }, { description: 'Slot description' })

    expect(screen.getByText('Slot description')).toBeInTheDocument()
  })

  it('renders image slot content instead of the default icon', () => {
    const { container } = renderImageAndText(
      {},
      { image: '<img data-testid="custom-image" alt="" />' },
    )

    expect(screen.getByTestId('custom-image')).toBeInTheDocument()
    expect(container.querySelector('.v-icon')).not.toBeInTheDocument()
  })

  it('renders action slot content instead of the default button', () => {
    renderImageAndText(
      { action: undefined },
      { action: '<button type="button">Custom action</button>' },
    )

    expect(screen.getByRole('button', { name: 'Custom action' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Button' })).not.toBeInTheDocument()
  })
})

/* eslint-enable vue/one-component-per-file */
