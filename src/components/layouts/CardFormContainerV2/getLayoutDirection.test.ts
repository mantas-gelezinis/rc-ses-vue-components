import { describe, expect, it } from 'vitest'

import {
  getLayoutDirection,
  getStepperOrientation,
  shouldShowStepper,
} from '@/components/layouts/CardFormContainerV2/getLayoutDirection'

describe('getLayoutDirection', () => {
  it('returns explicit layout when provided', () => {
    expect(getLayoutDirection(3, 'row')).toBe('row')
    expect(getLayoutDirection(5, 'column')).toBe('column')
  })

  it('returns column for up to four steps when layout is not provided', () => {
    expect(getLayoutDirection(2)).toBe('column')
    expect(getLayoutDirection(4)).toBe('column')
  })

  it('returns row for more than four steps when layout is not provided', () => {
    expect(getLayoutDirection(5)).toBe('row')
    expect(getLayoutDirection(6)).toBe('row')
  })
})

describe('shouldShowStepper', () => {
  it('hides the stepper when there are two or fewer steps', () => {
    expect(shouldShowStepper(1)).toBe(false)
    expect(shouldShowStepper(2)).toBe(false)
  })

  it('shows the stepper when there are more than two steps', () => {
    expect(shouldShowStepper(3)).toBe(true)
    expect(shouldShowStepper(5)).toBe(true)
  })
})

describe('getStepperOrientation', () => {
  it('uses horizontal orientation for column layout', () => {
    expect(getStepperOrientation('column')).toBe('horizontal')
  })

  it('uses vertical orientation for row layout', () => {
    expect(getStepperOrientation('row')).toBe('vertical')
  })
})
