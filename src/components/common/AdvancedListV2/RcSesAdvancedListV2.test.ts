import { render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

import RcSesAdvancedListItemV2 from '@/components/common/AdvancedListItemV2/RcSesAdvancedListItemV2.vue'

import RcSesAdvancedListV2 from './RcSesAdvancedListV2.vue'

describe('RcSesAdvancedListV2', () => {
  it('renders a labelled list with items', () => {
    render({
      components: { RcSesAdvancedListV2, RcSesAdvancedListItemV2 },
      template: `
        <RcSesAdvancedListV2 accessible-label="Mokėjimo būdai">
          <RcSesAdvancedListItemV2 title="Swedbank" :show-trailing="false" />
          <RcSesAdvancedListItemV2 title="SEB" :show-trailing="false" />
        </RcSesAdvancedListV2>
      `,
    })

    expect(screen.getByRole('list', { name: 'Mokėjimo būdai' })).toBeInTheDocument()
    expect(screen.getByText('Swedbank')).toBeInTheDocument()
    expect(screen.getByText('SEB')).toBeInTheDocument()
  })

  it('sets listbox role and aria-multiselectable when multiselectable', () => {
    render({
      components: { RcSesAdvancedListV2, RcSesAdvancedListItemV2 },
      template: `
        <RcSesAdvancedListV2 multiselectable accessible-label="Objektai">
          <RcSesAdvancedListItemV2 title="Objektas" selectable />
        </RcSesAdvancedListV2>
      `,
    })

    const listbox = screen.getByRole('listbox', { name: 'Objektai' })
    expect(listbox).toHaveAttribute('aria-multiselectable', 'true')
    expect(screen.getByRole('option')).toBeInTheDocument()
  })

  it('sets listbox role when listbox prop is true', () => {
    render({
      components: { RcSesAdvancedListV2, RcSesAdvancedListItemV2 },
      template: `
        <RcSesAdvancedListV2 listbox accessible-label="Single select">
          <RcSesAdvancedListItemV2 title="Option" selectable />
        </RcSesAdvancedListV2>
      `,
    })

    expect(screen.getByRole('listbox', { name: 'Single select' })).toBeInTheDocument()
    expect(screen.getByRole('option')).toBeInTheDocument()
  })

  it('applies framed and scrollable modifiers', () => {
    const { container } = render({
      components: { RcSesAdvancedListV2, RcSesAdvancedListItemV2 },
      template: `
        <RcSesAdvancedListV2 framed :max-height="200" accessible-label="Panel">
          <RcSesAdvancedListItemV2 title="Item" :show-trailing="false" />
        </RcSesAdvancedListV2>
      `,
    })

    const list = container.querySelector('.rc-ses-advanced-list-v2')
    expect(list).toHaveClass('rc-ses-advanced-list-v2--framed')
    expect(list).toHaveClass('rc-ses-advanced-list-v2--scrollable')
    expect(list).toHaveStyle({ maxHeight: '200px' })
  })

  it('does not set option role when selectable without listbox parent', () => {
    render({
      components: { RcSesAdvancedListV2, RcSesAdvancedListItemV2 },
      template: `
        <RcSesAdvancedListV2 accessible-label="Plain list">
          <RcSesAdvancedListItemV2 title="Option" selectable selected />
        </RcSesAdvancedListV2>
      `,
    })

    expect(screen.getByRole('list', { name: 'Plain list' })).toBeInTheDocument()
    expect(screen.queryByRole('option')).not.toBeInTheDocument()
  })
})
