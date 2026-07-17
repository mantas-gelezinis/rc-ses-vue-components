<template>
  <v-snackbar
    :model-value="props.modelValue"
    class="rc-ses-snackbar-v2-host"
    :timeout="snackbarTimeout"
    location="bottom"
    :contained="props.contained"
    @update:model-value="handleVisibilityChange"
  >
    <div
      :class="[
        'rc-ses-snackbar-v2',
        `rc-ses-snackbar-v2--${props.state}`,
        { 'rc-ses-snackbar-v2--with-action': showActionButton },
      ]"
      :role="alertRole"
      :aria-live="ariaLive"
      aria-atomic="true"
      @mouseenter="isPaused = true"
      @mouseleave="isPaused = false"
      @focusin="isPaused = true"
      @focusout="handleFocusOut"
      @keydown.esc.prevent="handleClose"
    >
      <div class="rc-ses-snackbar-v2__state">
        <v-icon
          :class="[
            'rc-ses-snackbar-v2__icon',
            `rc-ses-snackbar-v2__icon--${props.state}`,
          ]"
          :icon="statusIcon"
          aria-hidden="true"
        />

        <p class="rc-ses-snackbar-v2__message">
          <slot>{{ displayMessage }}</slot>
        </p>
      </div>

      <div v-if="showActions" class="rc-ses-snackbar-v2__actions">
        <div v-if="showActionButton" class="rc-ses-snackbar-v2__action">
          <slot name="action">
            <RcSesButtonV2 variant="secondary" size="small" @click="handleAction">
              {{ props.actionLabel }}
            </RcSesButtonV2>
          </slot>
        </div>

        <button
          v-if="props.showClose"
          type="button"
          class="rc-ses-snackbar-v2__close"
          :aria-label="closeAriaLabel"
          @click="handleClose"
        >
          <v-icon icon="$close" aria-hidden="true" />
        </button>
      </div>
    </div>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useTranslation } from 'i18next-vue'
import { computed, ref, useSlots } from 'vue'

import {
  SNACKBAR_CHAR_LIMIT_WITH_ACTION,
  assertiveSnackbarStates,
  snackbarIcons,
} from '@/components/common/SnackbarV2/config'
import snackbarV2Defaults from '@/components/common/SnackbarV2/defaults'
import type { SnackbarProps } from '@/components/common/SnackbarV2/types'
import { SnackbarState } from '@/components/common/SnackbarV2/types'
import RcSesButtonV2 from '@/components/common/buttonV2/RcSesButtonV2.vue'

import './style.scss'

const props = withDefaults(defineProps<SnackbarProps>(), snackbarV2Defaults)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
  (e: 'action'): void
}>()

const { t } = useTranslation()
const slots = useSlots()

const isPaused = ref(false)

const isPersisted = computed(
  () => props.persist ?? props.state === SnackbarState.ActionNeeded,
)

const snackbarTimeout = computed(() => {
  if (isPersisted.value || isPaused.value) {
    return -1
  }

  return props.duration
})

const isAssertive = computed(() => assertiveSnackbarStates.has(props.state))

const alertRole = computed(() => (isAssertive.value ? 'alert' : 'status'))

const ariaLive = computed(() => (isAssertive.value ? 'assertive' : 'polite'))

const statusIcon = computed(() => snackbarIcons[props.state])

const showActionButton = computed(
  () => props.showAction && (Boolean(props.actionLabel) || Boolean(slots.action)),
)

const displayMessage = computed(() => {
  if (!showActionButton.value) {
    return props.message
  }

  if (props.message.length <= SNACKBAR_CHAR_LIMIT_WITH_ACTION) {
    return props.message
  }

  return `${props.message.slice(0, SNACKBAR_CHAR_LIMIT_WITH_ACTION)}...`
})

const showActions = computed(() => showActionButton.value || props.showClose)

const closeAriaLabel = computed(() => t('RcSesSnackbarV2.close', { ns: 'components' }))

const handleVisibilityChange = (value: boolean) => {
  if (value || !props.modelValue) {
    return
  }

  emit('update:modelValue', false)
  emit('close')
}

const handleClose = () => {
  handleVisibilityChange(false)
}

const handleFocusOut = (event: FocusEvent) => {
  const root = event.currentTarget

  if (!(root instanceof HTMLElement)) {
    isPaused.value = false
    return
  }

  const next = event.relatedTarget

  if (next instanceof Node && root.contains(next)) {
    return
  }

  isPaused.value = false
}

const handleAction = () => {
  emit('action')

  if (props.dismissOnAction) {
    handleClose()
  }
}
</script>
