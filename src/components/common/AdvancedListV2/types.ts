export type AdvancedListVariant = 'card' | 'row'

export type AdvancedListProps = {
  /** Matches child item container; row lists use 0 gap + dividers on items */
  variant?: AdvancedListVariant
  /**
   * Sets role="listbox" for selectable option children.
   * Also enabled automatically when multiselectable is true.
   */
  listbox?: boolean
  /** Multi-select listbox semantics on the parent list */
  multiselectable?: boolean
  accessibleLabel?: string
  /**
   * Bordered panel surface around the list (bg, border, radius, padding).
   * Use with maxHeight for scrollable result panels.
   */
  framed?: boolean
  /** When set, list becomes vertically scrollable (e.g. 280 or '280px') */
  maxHeight?: number | string
}
