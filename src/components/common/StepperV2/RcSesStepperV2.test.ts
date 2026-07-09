import { fireEvent, render, screen } from '@testing-library/vue'
import I18NextVue from 'i18next-vue'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, ref } from 'vue'

import initI18n from '@/plugins/i18n'

import RcSesStepperV2 from './RcSesStepperV2.vue'
import { StepperOrientation } from './types'

const widthRef = ref(1200)

vi.mock('vuetify', async (importOriginal) => {
  const actual = await importOriginal<typeof import('vuetify')>()

  return {
    ...actual,
    useDisplay: () => ({
      width: widthRef,
    }),
  }
})

const RcSesButtonV2Stub = defineComponent({
  name: 'RcSesButtonV2',
  emits: ['click'],
  setup(_, { emit, attrs }) {
    return () =>
      h(
        'button',
        {
          type: 'button',
          'aria-label': attrs['accessible-label'],
          onClick: () => emit('click'),
        },
        'Back',
      )
  },
})

const { i18next } = initI18n()

const steps = [
  { id: '1', label: 'Step one' },
  { id: '2', label: 'Step two' },
  { id: '3', label: 'Step three' },
]

const renderStepper = (props = {}, options: { width?: number } = {}) => {
  widthRef.value = options.width ?? 1200

  return render(RcSesStepperV2, {
    props: {
      steps,
      activeStep: 1,
      ...props,
    },
    global: {
      plugins: [[I18NextVue, { i18next }]],
      stubs: {
        RcSesButtonV2: RcSesButtonV2Stub,
      },
    },
  })
}

describe('RcSesStepperV2', () => {
  it('renders step labels', () => {
    renderStepper()

    expect(screen.getByText('Step one')).toBeInTheDocument()
    expect(screen.getByText('Step two')).toBeInTheDocument()
    expect(screen.getByText('Step three')).toBeInTheDocument()
  })

  it('applies orientation classes on desktop', () => {
    const { container } = renderStepper({ orientation: StepperOrientation.Vertical })

    expect(container.firstElementChild).toHaveClass('rc-ses-stepper-v2--vertical')
    expect(container.firstElementChild).not.toHaveClass('rc-ses-stepper-v2--mobile')
  })

  it('marks the active step with aria-current="step"', () => {
    renderStepper({ activeStep: 1 })

    expect(screen.getByRole('button', { name: 'Step two' })).toHaveAttribute(
      'aria-current',
      'step',
    )
  })

  it('marks completed steps with localized aria-label', () => {
    renderStepper({ activeStep: 2 })

    expect(screen.getByRole('button', { name: 'Užbaigta: Step one' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Užbaigta: Step two' })).toBeInTheDocument()
  })

  it('renders mobile horizontal layout at md-v2 and below', () => {
    const { container } = renderStepper({ activeStep: 1 }, { width: 800 })

    expect(container.firstElementChild).toHaveClass('rc-ses-stepper-v2--horizontal')
    expect(container.firstElementChild).toHaveClass('rc-ses-stepper-v2--mobile')

    // mobile layout hides step labels (icons only)
    expect(screen.queryByText('Step one')).not.toBeInTheDocument()
    expect(screen.queryByText('Step two')).not.toBeInTheDocument()
    expect(screen.queryByText('Step three')).not.toBeInTheDocument()

    // active step still has an accessible name via aria-label (localized)
    expect(screen.getByLabelText('Dabartinis žingsnis: Step two')).toHaveAttribute(
      'aria-current',
      'step',
    )
  })

  it('emits step-click when tapping mobile back button', async () => {
    const { emitted } = renderStepper({ activeStep: 1 }, { width: 800 })

    await fireEvent.click(screen.getByRole('button', { name: 'Grįžti' }))
    expect(emitted()['step-click']).toEqual([[0]])
  })

  it('emits step-click for completed steps', async () => {
    const { emitted } = renderStepper({ activeStep: 2 })

    await fireEvent.click(screen.getByRole('button', { name: 'Užbaigta: Step one' }))
    expect(emitted()['step-click']).toEqual([[0]])
  })

  it('does not emit step-click for disabled steps', async () => {
    const { emitted } = renderStepper({ activeStep: 0 })

    await fireEvent.click(screen.getByText('Step three'))
    expect(emitted()['step-click']).toBeUndefined()
  })
})
