import { fireEvent, render, screen } from '@testing-library/vue'
import I18NextVue from 'i18next-vue'
import { describe, expect, it } from 'vitest'

import initI18n from '@/plugins/i18n'

import RcSesReviewCardV2 from './RcSesReviewCardV2.vue'

const { i18next } = initI18n()

const renderReviewCard = (
  props: Record<string, unknown> = {},
  slots: Record<string, string> = {},
) =>
  render(RcSesReviewCardV2, {
    props: {
      heading: 'Review section',
      ...props,
    },
    slots,
    global: {
      plugins: [[I18NextVue, { i18next }]],
      stubs: {
        RcSesButtonV2: {
          props: ['variant', 'size', 'prependIcon'],
          emits: ['click'],
          template: `
            <button
              type="button"
              :data-variant="variant"
              :data-size="size"
              :data-prepend-icon="prependIcon"
              @click="$emit('click')"
            >
              <slot />
            </button>
          `,
        },
      },
    },
  })

describe('RcSesReviewCardV2', () => {
  describe('header', () => {
    it('renders heading as semantic h5 by default', () => {
      renderReviewCard({ heading: 'Section title' })

      const heading = screen.getByRole('heading', { level: 5, name: 'Section title' })
      expect(heading).toHaveClass('rc-ses-review-card-v2__heading')
    })

    it('renders edit action by default', () => {
      renderReviewCard()

      expect(screen.getByRole('button', { name: 'Redaguoti' })).toHaveAttribute(
        'data-prepend-icon',
        '$notePencil',
      )
    })

    it('hides edit action when showEdit is false', () => {
      renderReviewCard({ showEdit: false })

      expect(screen.queryByRole('button', { name: 'Redaguoti' })).not.toBeInTheDocument()
    })

    it('emits edit when default edit action is clicked', async () => {
      const { emitted } = renderReviewCard()

      await fireEvent.click(screen.getByRole('button', { name: 'Redaguoti' }))
      expect(emitted().edit).toHaveLength(1)
    })

    it('renders heading adornment slot content', () => {
      renderReviewCard(
        {},
        {
          'heading-adornment': '<span data-testid="heading-badge">Confirmed</span>',
        },
      )

      expect(screen.getByTestId('heading-badge')).toBeInTheDocument()
    })

    it('renders custom header actions slot content', () => {
      renderReviewCard(
        { showEdit: false },
        {
          'header-actions': '<button type="button">Custom action</button>',
        },
      )

      expect(screen.getByRole('button', { name: 'Custom action' })).toBeInTheDocument()
    })
  })

  describe('content', () => {
    it('renders default slot content', () => {
      renderReviewCard({}, { default: 'Summary content' })

      expect(screen.getByText('Summary content')).toBeInTheDocument()
    })
  })
})
