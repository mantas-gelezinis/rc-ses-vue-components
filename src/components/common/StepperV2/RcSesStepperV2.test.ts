import { fireEvent, render, screen } from '@testing-library/vue'
import I18NextVue from 'i18next-vue'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, ref } from 'vue'

import initI18n from '@/plugins/i18n'

import RcSesStepperV2 from './RcSesStepperV2.vue'

vi.mock('vuetify', async (importOriginal) => {
  const actual = await importOriginal<typeof import('vuetify')>()

  return {
    ...actual,
    useDisplay: () => ({
      width: ref(1200),
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

const renderStepper = (props = {}) =>
  render(RcSesStepperV2, {
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

describe('RcSesStepperV2', () => {
  it('renders step labels', () => {
    renderStepper()

    expect(screen.getByText('Step one')).toBeInTheDocument()
    expect(screen.getByText('Step two')).toBeInTheDocument()
    expect(screen.getByText('Step three')).toBeInTheDocument()
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

/* eslint-enable vue/one-component-per-file */
