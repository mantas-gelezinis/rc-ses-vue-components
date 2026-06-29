import type { Component } from 'vue'

import {
  CheckCircleIcon,
  InfoIcon,
  QuestionIcon,
  WarningIcon,
} from '@/assets/icons/regular'
import type { ButtonVariants } from '@/components/common/buttonV2/types'

import type { ModalType } from './types'

export interface ModalTypeConfig {
  icon: Component
  primaryButtonVariant: ButtonVariants
}

export const MODAL_TYPE_CONFIG: Record<ModalType, ModalTypeConfig> = {
  destructive: {
    icon: WarningIcon,
    primaryButtonVariant: 'error',
  },
  confirm: {
    icon: QuestionIcon,
    primaryButtonVariant: 'primary',
  },
  success: {
    icon: CheckCircleIcon,
    primaryButtonVariant: 'primary',
  },
  info: {
    icon: InfoIcon,
    primaryButtonVariant: 'primary',
  },
}

export const MODAL_SIZE_MAP: Record<string, string> = {
  sm: '480px',
  md: '600px',
  lg: '800px',
}
