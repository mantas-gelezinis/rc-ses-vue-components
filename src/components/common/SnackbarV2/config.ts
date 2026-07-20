import { SnackbarState } from '@/components/common/SnackbarV2/types'

export const SNACKBAR_DURATION = 10_000

export const SNACKBAR_CHAR_LIMIT_WITH_ACTION = 120

export const snackbarIcons: Record<`${SnackbarState}`, string> = {
  [SnackbarState.Success]: '$checkCircleFilled',
  [SnackbarState.Error]: '$xCircleFilled',
  [SnackbarState.Warning]: '$warningFilled',
  [SnackbarState.Info]: '$infoFilled',
  [SnackbarState.ActionNeeded]: '$scroll',
}

export const assertiveSnackbarStates = new Set<`${SnackbarState}`>([
  SnackbarState.Error,
  SnackbarState.ActionNeeded,
])
