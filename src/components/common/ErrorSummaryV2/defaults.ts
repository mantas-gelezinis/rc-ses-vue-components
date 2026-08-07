import type { ErrorSummaryError } from '@/components/common/ErrorSummaryV2/types'

export type ErrorSummaryDefaultsType = {
  errors: () => ErrorSummaryError[]
  autofocus: boolean
}

const errorSummaryV2Defaults = {
  errors: (): ErrorSummaryError[] => [],
  autofocus: true,
} satisfies ErrorSummaryDefaultsType

export default errorSummaryV2Defaults
