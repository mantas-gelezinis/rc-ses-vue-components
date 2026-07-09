/**
 * JS mirror of `$rc-breakpoints-v2` in `_layout-v2.scss`.
 * Keep in sync when design breakpoints change.
 */
export const RC_BREAKPOINTS_V2 = {
  'sm-v2': 600,
  'md-v2': 900,
  'lg-v2': 1200,
} as const

export type RcBreakpointV2 = keyof typeof RC_BREAKPOINTS_V2

export const isBelowBreakpointV2 = (width: number, breakpoint: RcBreakpointV2): boolean =>
  width < RC_BREAKPOINTS_V2[breakpoint]
