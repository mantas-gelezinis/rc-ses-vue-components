import { render, screen } from '@testing-library/vue'
import I18NextVue from 'i18next-vue'
import { describe, expect, it } from 'vitest'

import initI18n from '@/plugins/i18n'

import RcSesStepperStepV2 from './RcSesStepperStepV2.vue'
import { StepperOrientation, StepperStepPlacement, StepperStepState } from './types'

const { i18next } = initI18n()

const renderStep = (
  state: StepperStepState,
  options: { showLabel?: boolean; label?: string } = {},
) =>
  render(RcSesStepperStepV2, {
    props: {
      label: options.label ?? 'Step one',
      state,
      placement: StepperStepPlacement.Middle,
      orientation: StepperOrientation.Horizontal,
      clickable: false,
      showLabel: options.showLabel ?? true,
      leadingConnectorCompleted: false,
      trailingConnectorCompleted: false,
    },
    global: {
      plugins: [[I18NextVue, { i18next }]],
    },
  })

describe('RcSesStepperStepV2 aria labels', () => {
  it('uses the visible label for the active step when showLabel is true', () => {
    renderStep(StepperStepState.Active)

    expect(screen.getByText('Step one')).toBeInTheDocument()
    expect(
      screen.getByText('Step one').closest('.rc-ses-stepper-v2__step-control'),
    ).toHaveAttribute('aria-current', 'step')
  })

  it('uses a localized aria-label for the active step when showLabel is false', () => {
    renderStep(StepperStepState.Active, { showLabel: false })

    expect(screen.queryByText('Step one')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Dabartinis žingsnis: Step one')).toHaveAttribute(
      'aria-current',
      'step',
    )
  })

  it('uses a localized aria-label for completed steps', () => {
    renderStep(StepperStepState.Completed, { showLabel: false })

    expect(screen.getByLabelText('Užbaigta: Step one')).toBeInTheDocument()
  })
})
