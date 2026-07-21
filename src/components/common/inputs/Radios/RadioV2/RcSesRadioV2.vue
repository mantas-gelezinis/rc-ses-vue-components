<template>
  <div
    v-if="props.loading"
    class="rc-ses-radio-v2 rc-ses-radio-v2--loading"
    role="status"
    :aria-label="loadingAriaLabel"
  >
    <span class="rc-ses-radio-v2__skeleton-control" aria-hidden="true" />
    <span
      v-if="props.showLabel && props.label"
      class="rc-ses-radio-v2__skeleton-label"
      aria-hidden="true"
    />
  </div>

  <div
    v-else-if="props.decorative"
    aria-hidden="true"
    :class="[
      'rc-ses-radio-v2',
      'rc-ses-radio-v2--decorative',
      'v-selection-control',
      {
        'rc-ses-radio-v2--checked': isSelected,
        'rc-ses-radio-v2--disabled': isDisabled,
        'rc-ses-radio-v2--error': hasError,
      },
    ]"
  >
    <div class="v-selection-control__wrapper">
      <div class="v-selection-control__input" />
    </div>
  </div>

  <v-radio
    v-else
    :class="[
      'rc-ses-radio-v2',
      {
        'rc-ses-radio-v2--checked': isSelected,
        'rc-ses-radio-v2--disabled': isDisabled,
        'rc-ses-radio-v2--error': hasError,
      },
    ]"
    :model-value="vuetifyModelValue"
    :value="props.value"
    :label="displayLabel"
    :aria-label="ariaLabelValue"
    :aria-checked="isSelected"
    :disabled="isDisabled"
    :true-icon="trueIcon"
    :false-icon="falseIcon"
    density="compact"
    :ripple="false"
    @update:model-value="handleVuetifyUpdate"
  >
    <template v-if="$slots.default" #label>
      <slot />
    </template>
  </v-radio>
</template>

<script setup lang="ts">
import { useTranslation } from 'i18next-vue'
import { computed, inject } from 'vue'

import { radioGroupV2Key } from '@/components/common/inputs/Radios/RadioGroupV2/context'
import radioV2Defaults from '@/components/common/inputs/Radios/RadioV2/defaults'
import type { RadioProps } from '@/components/common/inputs/Radios/RadioV2/types'

import './style.scss'

const props = withDefaults(defineProps<RadioProps>(), radioV2Defaults)

const { t } = useTranslation()

const group = inject(radioGroupV2Key, null)

const trueIcon = '$radioOn'
const falseIcon = '$radioOff'

const isSelected = computed(() => group?.model.value === props.value)

const vuetifyModelValue = computed(() => (isSelected.value ? props.value : null))

const isDisabled = computed(() => props.disabled || Boolean(group?.disabled.value))

const hasError = computed(() => Boolean(group?.hasError.value))

const displayLabel = computed(() => (props.showLabel ? props.label : undefined))

const ariaLabelValue = computed(() => {
  if (props.showLabel && props.label) {
    return undefined
  }

  return props.accessibleLabel ?? props.label
})

const loadingAriaLabel = computed(
  () =>
    props.accessibleLabel ??
    props.label ??
    t('RcSesRadioV2.loading', { ns: 'components' }),
)

const selectValue = () => {
  if (isDisabled.value || props.decorative) {
    return
  }

  group?.select(props.value)
}

const handleVuetifyUpdate = (value: unknown) => {
  if (value === props.value) {
    selectValue()
  }
}
</script>
