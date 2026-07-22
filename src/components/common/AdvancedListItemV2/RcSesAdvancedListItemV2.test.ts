import { fireEvent, render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

import RcSesAdvancedListItemV2 from './RcSesAdvancedListItemV2.vue'

describe('RcSesAdvancedListItemV2', () => {
  const renderItem = (
    props: Record<string, unknown> = {},
    slots: Record<string, string> = {},
  ) =>
    render(RcSesAdvancedListItemV2, {
      props: {
        title: 'Jonas Jonaitis',
        ...props,
      },
      slots,
    })

  it('renders title and subtitle', () => {
    renderItem({ subtitle: 'a.k. 3850********', showSubtitle: true })

    expect(screen.getByText('Jonas Jonaitis')).toHaveClass(
      'rc-ses-advanced-list-item-v2__title',
    )
    expect(screen.getByText('a.k. 3850********')).toHaveClass(
      'rc-ses-advanced-list-item-v2__subtitle',
    )
  })

  it('hides subtitle when showSubtitle is false', () => {
    renderItem({ subtitle: 'Hidden', showSubtitle: false })

    expect(screen.queryByText('Hidden')).not.toBeInTheDocument()
  })

  it('applies card container class by default', () => {
    const { container } = renderItem()

    expect(container.querySelector('.rc-ses-advanced-list-item-v2')).toHaveClass(
      'rc-ses-advanced-list-item-v2--card',
    )
  })

  it('applies row container class', () => {
    const { container } = renderItem({ container: 'row' })

    expect(container.querySelector('.rc-ses-advanced-list-item-v2')).toHaveClass(
      'rc-ses-advanced-list-item-v2--row',
    )
  })

  it('applies selected, disabled and error modifiers', () => {
    const { container } = renderItem({
      selected: true,
      disabled: true,
      error: true,
    })

    const item = container.querySelector('.rc-ses-advanced-list-item-v2')
    expect(item).toHaveClass('rc-ses-advanced-list-item-v2--selected')
    expect(item).toHaveClass('rc-ses-advanced-list-item-v2--disabled')
    expect(item).toHaveClass('rc-ses-advanced-list-item-v2--error')
  })

  it('sets option semantics when selectable', () => {
    renderItem({ selectable: true, selected: true })

    const option = screen.getByRole('option')
    expect(option).toHaveAttribute('aria-selected', 'true')
    expect(option).toHaveAttribute('tabindex', '0')
  })

  it('emits select when selectable item is clicked', async () => {
    const { emitted } = renderItem({ selectable: true })

    await fireEvent.click(screen.getByRole('option'))

    expect(emitted().select).toHaveLength(1)
  })

  it('does not emit select when disabled', async () => {
    const { emitted } = renderItem({ selectable: true, disabled: true })

    await fireEvent.click(screen.getByRole('option'))

    expect(emitted().select).toBeUndefined()
  })

  it('does not emit select from trailing actions', async () => {
    const { emitted } = renderItem(
      { selectable: true, showTrailing: true },
      { trailing: '<button type="button">Pašalinti</button>' },
    )

    await fireEvent.click(screen.getByRole('button', { name: 'Pašalinti' }))

    expect(emitted().select).toBeUndefined()
  })

  it('emits select via keyboard Enter', async () => {
    const { emitted } = renderItem({ selectable: true })

    await fireEvent.keyDown(screen.getByRole('option'), { key: 'Enter' })

    expect(emitted().select).toHaveLength(1)
  })

  it('renders leading, trailing, meta, badge and expanded slots', () => {
    renderItem(
      {
        showLeading: true,
        showTrailing: true,
        showMeta: true,
        showBadge: true,
        showExpanded: true,
        showLeadingMedia: true,
      },
      {
        leading: '<span data-testid="leading">L</span>',
        'leading-media': '<span data-testid="leading-media">M</span>',
        trailing: '<span data-testid="trailing">T</span>',
        meta: '<span data-testid="meta">Meta</span>',
        badge: '<span data-testid="badge">Badge</span>',
        expanded: '<span data-testid="expanded">More</span>',
      },
    )

    expect(screen.getByTestId('leading')).toBeInTheDocument()
    expect(screen.getByTestId('leading-media')).toBeInTheDocument()
    expect(screen.getByTestId('trailing')).toBeInTheDocument()
    expect(screen.getByTestId('meta')).toBeInTheDocument()
    expect(screen.getByTestId('badge')).toBeInTheDocument()
    expect(screen.getByTestId('expanded')).toBeInTheDocument()
  })

  it('hides leading when showLeading is false', () => {
    renderItem(
      { showLeading: false },
      { leading: '<span data-testid="leading">L</span>' },
    )

    expect(screen.queryByTestId('leading')).not.toBeInTheDocument()
  })

  it('does not render leading-media when showLeadingMedia is false by default', () => {
    renderItem({}, { 'leading-media': '<span data-testid="leading-media">M</span>' })

    expect(screen.queryByTestId('leading-media')).not.toBeInTheDocument()
  })

  it('does not render meta, badge or expanded when show flags are false by default', () => {
    renderItem(
      {},
      {
        meta: '<span data-testid="meta">Meta</span>',
        badge: '<span data-testid="badge">Badge</span>',
        expanded: '<span data-testid="expanded">More</span>',
      },
    )

    expect(screen.queryByTestId('meta')).not.toBeInTheDocument()
    expect(screen.queryByTestId('badge')).not.toBeInTheDocument()
    expect(screen.queryByTestId('expanded')).not.toBeInTheDocument()
  })

  it('applies nesting level via CSS variable', () => {
    const { container } = renderItem({ level: 2 })

    expect(container.querySelector('.rc-ses-advanced-list-item-v2')).toHaveStyle({
      '--rc-ses-list-item-level': '2',
    })
  })
})
