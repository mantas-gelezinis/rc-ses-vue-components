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
          onClick: () => emit('click'),
        },
        slots.default?.(),
      )
  },
})

const renderImageAndText = (props: Partial<ImageAndTextProps> = {}) =>
  render(RcSesImageAndTextV2, {
    props: {
      title: 'Place heading text here',
      description:
        'Additional description text elaborating on situation and what to do next.',
      buttonLabel: 'Button',
      ...props,
    },
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
    const { emitted } = renderImageAndText({ buttonLabel: 'Retry' })

    await fireEvent.click(screen.getByRole('button', { name: 'Retry' }))

    expect(emitted().action).toEqual([[]])
  })

  it('hides action button when buttonLabel is omitted', () => {
    renderImageAndText({ buttonLabel: undefined })

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('passes buttonIcon to the action button', () => {
    renderImageAndText({ buttonLabel: 'Add item', buttonIcon: '$plus' })

    expect(screen.getByRole('button', { name: 'Add item' })).toHaveAttribute(
      'data-prepend-icon',
      '$plus',
    )
  })
})

/* eslint-enable vue/one-component-per-file */
