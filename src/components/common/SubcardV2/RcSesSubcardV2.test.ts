import { render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

import RcSesSubcardV2 from './RcSesSubcardV2.vue'

describe('RcSesSubcardV2', () => {
  const renderSubcard = (
    props: Record<string, unknown> = {},
    slots: Record<string, string> = {},
  ) =>
    render(RcSesSubcardV2, {
      props: {
        heading: 'Subcard heading',
        ...props,
      },
      slots,
    })

  describe('header', () => {
    it('renders heading as semantic h3 by default', () => {
      renderSubcard({ heading: 'Section title' })

      const heading = screen.getByRole('heading', { level: 3, name: 'Section title' })
      expect(heading).toHaveClass('rc-ses-subcard-v2__heading')
    })

    it('renders heading with the requested heading level', () => {
      renderSubcard({ heading: 'Nested title', headingLevel: 4 })

      expect(
        screen.getByRole('heading', { level: 4, name: 'Nested title' }),
      ).toBeInTheDocument()
    })

    it('renders description when showDescription is true', () => {
      renderSubcard({
        description: 'Additional context',
        showDescription: true,
      })

      expect(screen.getByText('Additional context')).toHaveClass(
        'rc-ses-subcard-v2__description',
      )
    })

    it('hides description when showDescription is false', () => {
      renderSubcard({
        description: 'Hidden description',
        showDescription: false,
      })

      expect(screen.queryByText('Hidden description')).not.toBeInTheDocument()
    })

    it('renders header actions slot content', () => {
      renderSubcard(
        {},
        {
          'header-actions':
            '<button type="button">Add item</button><button type="button">Add me</button>',
        },
      )

      expect(screen.getByRole('button', { name: 'Add item' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Add me' })).toBeInTheDocument()
    })

    it('renders heading adornment slot content', () => {
      renderSubcard(
        {},
        {
          'heading-adornment': '<span data-testid="heading-badge">Confirmed</span>',
        },
      )

      expect(screen.getByTestId('heading-badge')).toBeInTheDocument()
    })
  })

  describe('content', () => {
    it('renders default slot content', () => {
      renderSubcard({}, { default: 'Subcard content' })

      expect(screen.getByText('Subcard content')).toBeInTheDocument()
    })

    it('always renders content wrapper like CardV2', () => {
      const { container } = renderSubcard()

      expect(container.querySelector('.rc-ses-subcard-v2__content')).toBeInTheDocument()
    })
  })

  describe('footer slot', () => {
    it('renders footer wrapper when footer slot is provided', () => {
      const { container } = renderSubcard({}, { footer: 'Footer actions' })

      expect(container.querySelector('.rc-ses-subcard-v2__footer')).toBeInTheDocument()
      expect(screen.getByText('Footer actions')).toBeInTheDocument()
    })

    it('does not render footer wrapper without a footer slot', () => {
      const { container } = renderSubcard()

      expect(
        container.querySelector('.rc-ses-subcard-v2__footer'),
      ).not.toBeInTheDocument()
    })

    it('hides footer when showFooter is false', () => {
      const { container } = renderSubcard(
        { showFooter: false },
        { footer: 'Footer actions' },
      )

      expect(
        container.querySelector('.rc-ses-subcard-v2__footer'),
      ).not.toBeInTheDocument()
    })
  })
})
