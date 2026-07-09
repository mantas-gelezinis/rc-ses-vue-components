/* eslint-disable vue/one-component-per-file -- test stubs are colocated intentionally */
import { fireEvent, render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'

import RcSesCardFormContainerV2 from '@/components/layouts/CardFormContainerV2/RcSesCardFormContainerV2.vue'

const RcSesStepperV2Stub = defineComponent({
  name: 'RcSesStepperV2',
  props: {
    steps: { type: Array, required: true },
    activeStep: { type: Number, required: true },
    orientation: { type: String, default: 'horizontal' },
    loading: { type: Boolean, default: false },
  },
  emits: ['step-click'],
  setup(props, { emit }) {
    return () =>
      h(
        'div',
        {
          'data-testid': 'stepper',
          'data-orientation': props.orientation,
          'data-loading': String(props.loading),
        },
        (props.steps as { label: string }[]).map((step, index) =>
          h(
            'button',
            {
              type: 'button',
              onClick: () => emit('step-click', index),
            },
            step.label,
          ),
        ),
      )
  },
})

const RcSesCardV2Stub = defineComponent({
  name: 'RcSesCardV2',
  props: {
    heading: { type: String, required: true },
    showDescription: { type: Boolean, default: true },
    description: { type: String, default: undefined },
    contentVariant: { type: String, default: 'default' },
    headingLevel: { type: Number, default: 2 },
  },
  setup(props, { slots }) {
    return () =>
      h('section', { 'data-testid': 'card' }, [
        h(`h${props.headingLevel}`, props.heading),
        props.showDescription && props.description ? h('p', props.description) : null,
        slots.default?.(),
        slots.footer ? h('footer', slots.footer()) : null,
      ])
  },
})

const shortSteps = [
  { id: '1', label: 'Service' },
  { id: '2', label: 'Details' },
  { id: '3', label: 'Confirmation' },
]

const longSteps = [
  { id: '1', label: 'Service' },
  { id: '2', label: 'Details' },
  { id: '3', label: 'Documents' },
  { id: '4', label: 'Payment' },
  { id: '5', label: 'Confirmation' },
]

const renderContainer = (
  props: Record<string, unknown> = {},
  slots: Record<string, string> = {},
) =>
  render(RcSesCardFormContainerV2, {
    props: {
      heading: 'Form title',
      steps: shortSteps,
      activeStep: 0,
      ...props,
    },
    slots,
    global: {
      stubs: {
        RcSesStepperV2: RcSesStepperV2Stub,
        RcSesCardV2: RcSesCardV2Stub,
      },
    },
  })

describe('RcSesCardFormContainerV2', () => {
  it('renders card heading and slot content', () => {
    renderContainer({}, { default: 'Step content' })

    expect(screen.getByRole('heading', { name: 'Form title' })).toBeInTheDocument()
    expect(screen.getByText('Step content')).toBeInTheDocument()
  })

  it('renders the stepper when there are more than two steps', () => {
    renderContainer()

    expect(screen.getByTestId('stepper')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Details' })).toBeInTheDocument()
  })

  it('hides the stepper when there are two or fewer steps', () => {
    renderContainer({
      steps: [
        { id: '1', label: 'Only step' },
        { id: '2', label: 'Second step' },
      ],
    })

    expect(screen.queryByTestId('stepper')).not.toBeInTheDocument()
  })

  it('uses horizontal stepper orientation for column layout', () => {
    renderContainer({ layout: 'column' })

    expect(screen.getByTestId('stepper')).toHaveAttribute(
      'data-orientation',
      'horizontal',
    )
  })

  it('uses vertical stepper orientation for row layout', () => {
    renderContainer({ steps: longSteps, layout: 'row' })

    expect(screen.getByTestId('stepper')).toHaveAttribute('data-orientation', 'vertical')
  })

  it('auto-selects row layout for more than four steps', () => {
    const { container } = renderContainer({ steps: longSteps })

    expect(container.firstElementChild).toHaveClass('rc-ses-card-form-container-v2--row')
  })

  it('auto-selects column layout for up to four steps', () => {
    const { container } = renderContainer({ steps: shortSteps })

    expect(container.firstElementChild).toHaveClass(
      'rc-ses-card-form-container-v2--column',
    )
  })

  it('forwards loading state to the stepper', () => {
    renderContainer({ loading: true })

    expect(screen.getByTestId('stepper')).toHaveAttribute('data-loading', 'true')
  })

  it('emits step-click when a step is clicked', async () => {
    const { emitted } = renderContainer({ activeStep: 1 })

    await fireEvent.click(screen.getByRole('button', { name: 'Service' }))

    expect(emitted()['step-click']).toEqual([[0]])
  })

  it('renders footer slot inside the card', () => {
    renderContainer({}, { footer: 'Footer actions' })

    expect(screen.getByText('Footer actions')).toBeInTheDocument()
  })
})
