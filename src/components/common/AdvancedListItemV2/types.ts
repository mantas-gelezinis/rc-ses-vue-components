export type AdvancedListItemContainer = 'card' | 'row'

export type AdvancedListItemProps = {
  /** Card = bordered tile; Row = divider list row */
  container?: AdvancedListItemContainer
  title: string
  subtitle?: string
  showLeading?: boolean
  showLeadingMedia?: boolean
  showTrailing?: boolean
  showSubtitle?: boolean
  showMeta?: boolean
  showBadge?: boolean
  showExpanded?: boolean
  /** Nesting depth for indented sub-items (0 = root) */
  level?: number
  selectable?: boolean
  selected?: boolean
  disabled?: boolean
  error?: boolean
}
