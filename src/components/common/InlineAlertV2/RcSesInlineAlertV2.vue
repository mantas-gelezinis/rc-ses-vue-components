<template>
  <div
    :class="['rc-ses-inline-alert-v2', `rc-ses-inline-alert-v2--${props.type}`]"
    :role="alertRole"
    :aria-live="ariaLive"
  >
    <slot v-if="props.showIcon" name="icon">
      <v-icon
        class="rc-ses-inline-alert-v2__icon"
        :icon="statusIcon"
        aria-hidden="true"
      />
    </slot>

    <p class="rc-ses-inline-alert-v2__message">
      <slot>{{ props.message }}</slot>
    </p>

    <div v-if="props.showAction" class="rc-ses-inline-alert-v2__action">
      <slot name="action">
        <RcSesButtonV2 variant="link" size="small" @click="emit('action')">
          {{ props.actionLabel }}
        </RcSesButtonV2>
      </slot>
    </div>

    <button
      v-if="props.showClose"
      type="button"
      class="rc-ses-inline-alert-v2__close"
      :aria-label="closeAriaLabel"
      @click="emit('close')"
    >
      <v-icon icon="$close" aria-hidden="true" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useTranslation } from 'i18next-vue'
import { computed, withDefaults } from 'vue'

import inlineAlertV2Defaults from '@/components/common/InlineAlertV2/defaults'
import {
  assertiveInlineAlertTypes,
  inlineAlertIcons,
} from '@/components/common/InlineAlertV2/iconConfig'
import type { InlineAlertProps } from '@/components/common/InlineAlertV2/types'
import RcSesButtonV2 from '@/components/common/buttonV2/RcSesButtonV2.vue'

import './style.scss'

const props = withDefaults(defineProps<InlineAlertProps>(), inlineAlertV2Defaults)

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'action'): void
}>()

const { t } = useTranslation()

const isAssertive = computed(() => assertiveInlineAlertTypes.has(props.type))

const alertRole = computed(() => (isAssertive.value ? 'alert' : 'status'))

const ariaLive = computed(() => (isAssertive.value ? 'assertive' : 'polite'))

const statusIcon = computed(() => inlineAlertIcons[props.type])

const closeAriaLabel = computed(() => t('RcSesInlineAlertV2.close', { ns: 'components' }))
</script>
