<template>
  <div
    v-if="props.loading"
    class="rc-ses-checkbox-v2 rc-ses-checkbox-v2--loading"
    role="status"
    :aria-label="loadingAriaLabel"
  >
    <span class="rc-ses-checkbox-v2__skeleton-control" aria-hidden="true" />
    <span
      v-if="props.showLabel && props.label"
      class="rc-ses-checkbox-v2__skeleton-label"
      aria-hidden="true"
    />
  </div>

  <v-checkbox
    v-else
    v-model="model"
    :class="[
      'rc-ses-checkbox-v2',
      {
        'rc-ses-checkbox-v2--checked': model && !props.indeterminate,
        'rc-ses-checkbox-v2--indeterminate': props.indeterminate,
        'rc-ses-checkbox-v2--disabled': props.disabled,
        'rc-ses-checkbox-v2--error': hasError,
      },
    ]"
    :label="displayLabel"
    :aria-label="ariaLabelValue"
    :disabled="props.disabled"
    :indeterminate="props.indeterminate"
    :error="hasError"
    :error-messages="errorMessage"
    :hide-details="!errorMessage"
    :true-icon="trueIcon"
    :false-icon="falseIcon"
    :indeterminate-icon="indeterminateIcon"
    density="compact"
    :ripple="false"
    @click="handleClick"
  >
    <template v-if="$slots.default" #label>
      <slot />
    </template>
  </v-checkbox>
</template>

<script setup lang="ts">
import { useTranslation } from 'i18next-vue'
import { computed } from 'vue'

import checkboxV2Defaults from '@/components/common/inputs/Checkboxes/CheckboxV2/defaults'
import type { CheckboxProps } from '@/components/common/inputs/Checkboxes/CheckboxV2/types'

import './style.scss'

const props = withDefaults(defineProps<CheckboxProps>(), checkboxV2Defaults)

const model = defineModel<boolean>({ default: false })

const { t } = useTranslation()

const trueIcon = '$checkBold'
const falseIcon = '$checkboxOff'
const indeterminateIcon = '$minusBold'

const hasError = computed(() => Boolean(props.error))

const errorMessage = computed(() =>
  typeof props.error === 'string' ? props.error : undefined,
)

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
    t('RcSesCheckboxV2.loading', { ns: 'components' }),
)

const handleClick = () => {
  if (props.indeterminate && !props.disabled) {
    model.value = true
  }
}
</script>
