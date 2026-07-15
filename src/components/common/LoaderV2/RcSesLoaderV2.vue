<template>
  <div
    :class="['rc-ses-loader-v2', `rc-ses-loader-v2--${props.size}`]"
    role="status"
    aria-live="polite"
    :aria-label="accessibleLabel"
  >
    <svg
      class="rc-ses-loader-v2__spinner"
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <circle class="rc-ses-loader-v2__track" cx="24" cy="24" r="20" />
      <circle class="rc-ses-loader-v2__arc" cx="24" cy="24" r="20" />
    </svg>

    <p v-if="props.showLabel" class="rc-ses-loader-v2__label">
      {{ labelText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useTranslation } from 'i18next-vue'
import { computed, withDefaults } from 'vue'

import loaderV2Defaults from '@/components/common/LoaderV2/defaults'
import type { LoaderProps } from '@/components/common/LoaderV2/types'

import './style.scss'

const props = withDefaults(defineProps<LoaderProps>(), loaderV2Defaults)

const { t } = useTranslation()

const labelText = computed(
  () => props.label ?? t('RcSesLoaderV2.label', { ns: 'components' }),
)

const accessibleLabel = computed(() => (props.showLabel ? undefined : labelText.value))
</script>
