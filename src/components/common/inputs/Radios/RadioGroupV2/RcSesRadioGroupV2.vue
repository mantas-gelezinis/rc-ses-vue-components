<template>
  <fieldset
    :class="[
      'rc-ses-radio-group-v2',
      {
        'rc-ses-radio-group-v2--disabled': props.disabled,
        'rc-ses-radio-group-v2--error': hasError,
      },
    ]"
    role="radiogroup"
    :disabled="props.disabled || undefined"
    :aria-label="props.accessibleLabel"
    :aria-invalid="hasError || undefined"
    :aria-describedby="errorDescribedBy"
  >
    <div class="rc-ses-radio-group-v2__options">
      <slot />
    </div>

    <p v-if="errorMessage" :id="errorId" class="rc-ses-radio-group-v2__error">
      {{ errorMessage }}
    </p>
  </fieldset>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, provide } from 'vue'

import {
  type RadioGroupValue,
  radioGroupV2Key,
} from '@/components/common/inputs/Radios/RadioGroupV2/context'
import radioGroupV2Defaults from '@/components/common/inputs/Radios/RadioGroupV2/defaults'
import type { RadioGroupProps } from '@/components/common/inputs/Radios/RadioGroupV2/types'

import './style.scss'

const props = withDefaults(defineProps<RadioGroupProps>(), radioGroupV2Defaults)

const model = defineModel<RadioGroupValue>({ default: null })

const errorId = `rc-ses-radio-group-error-${getCurrentInstance()?.uid ?? '0'}`

const hasError = computed(() => Boolean(props.error))

const errorMessage = computed(() =>
  typeof props.error === 'string' ? props.error : undefined,
)

const errorDescribedBy = computed(() => (errorMessage.value ? errorId : undefined))

const select = (value: string | number | boolean) => {
  if (props.disabled) {
    return
  }

  model.value = value
}

provide(radioGroupV2Key, {
  model,
  disabled: computed(() => props.disabled),
  hasError,
  select,
})
</script>
