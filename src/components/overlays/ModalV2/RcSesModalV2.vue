<template>
  <v-dialog
    v-model="isOpen"
    :class="['rc-ses-modal-v2-dialog', `rc-ses-modal-v2-dialog--${props.type}`]"
    :max-width="dialogWidth"
    :persistent="props.persistent"
    v-bind="filteredDialogProps"
    @click:outside="handleBackdropClick"
  >
    <div
      :class="['rc-ses-modal-v2', `rc-ses-modal-v2--${props.type}`]"
      role="document"
      :aria-labelledby="titleId"
      :aria-describedby="bodyId"
    >
      <div class="rc-ses-modal-v2__content">
        <component
          :is="typeConfig.icon"
          v-if="props.showIcon"
          :class="['rc-ses-modal-v2__icon', `rc-ses-modal-v2__icon--${props.type}`]"
          :size="36"
          aria-hidden="true"
        />
        <h2 :id="titleId" class="rc-ses-modal-v2__title">
          {{ props.title }}
        </h2>
        <div :id="bodyId" class="rc-ses-modal-v2__body">
          <slot />
        </div>
      </div>

      <div class="rc-ses-modal-v2__footer">
        <slot name="actions">
          <RcSesButtonV2
            v-if="hasSecondaryAction"
            variant="secondary"
            @click="handleSecondary"
          >
            {{ secondaryLabel }}
          </RcSesButtonV2>
          <RcSesButtonV2
            :variant="typeConfig.primaryButtonVariant"
            @click="handlePrimary"
          >
            {{ primaryLabel }}
          </RcSesButtonV2>
        </slot>
      </div>
    </div>
  </v-dialog>
</template>

<script setup lang="ts">
import { useTranslation } from 'i18next-vue'
import { computed, getCurrentInstance } from 'vue'

import RcSesButtonV2 from '@/components/common/buttonV2/RcSesButtonV2.vue'

import ModalDefaults from './defaults'
import './style.scss'
import type { ModalProps } from './types'
import { MODAL_SIZE_MAP, MODAL_TYPE_CONFIG } from './variantConfig'

const props = withDefaults(defineProps<ModalProps>(), ModalDefaults)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'primary'): void
  (e: 'secondary'): void
}>()

const { t } = useTranslation()

const instance = getCurrentInstance()
const uid = instance?.uid ?? 0
const titleId = `rc-ses-modal-v2-title-${uid}`
const bodyId = `rc-ses-modal-v2-body-${uid}`

const isOpen = computed({
  get: () => props.modelValue ?? false,
  set: (value: boolean) => emit('update:modelValue', value),
})

const dialogWidth = computed(() => MODAL_SIZE_MAP[props.size!])
const typeConfig = computed(() => MODAL_TYPE_CONFIG[props.type!])

const hasSecondaryAction = computed(
  () => props.type === 'destructive' || props.type === 'confirm',
)

const primaryLabel = computed(() => {
  if (props.primaryActionLabel) {
    return props.primaryActionLabel
  }

  return t(`RcSesModalV2.actions.${props.type}.primary`, { ns: 'components' })
})

const secondaryLabel = computed(() => {
  if (props.secondaryActionLabel) {
    return props.secondaryActionLabel
  }

  return t('RcSesModalV2.actions.cancel', { ns: 'components' })
})

const filteredDialogProps = computed(() => {
  const {
    title,
    type,
    showIcon,
    size,
    primaryActionLabel,
    secondaryActionLabel,
    modelValue,
    persistent,
    maxWidth,
    ...vuetifyProps
  } = props

  return vuetifyProps
})

const close = () => {
  isOpen.value = false
}

const handlePrimary = () => {
  emit('primary')
  close()
}

const handleSecondary = () => {
  emit('secondary')
  close()
}

const handleBackdropClick = () => {
  if (!props.persistent) {
    close()
  }
}
</script>
