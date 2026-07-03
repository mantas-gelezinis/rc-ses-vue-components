<template>
  <v-switch
    v-model="model"
    class="rc-ses-toggle-v2"
    v-bind="vuetifyProps"
    :label="displayLabel"
    :aria-label="ariaLabelValue"
    :aria-checked="model"
    role="switch"
    density="compact"
    inset
    flat
    hide-details
    :ripple="false"
  />
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import toggleDefaults from '@/components/common/toggleV2/defaults'
import type { ToggleProps } from '@/components/common/toggleV2/types'

import './style.scss'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ToggleProps>(), toggleDefaults)
const attrs = useAttrs()

const model = defineModel<boolean>({ default: false })

const displayLabel = computed(() => (props.showLabel ? props.label : undefined))

const ariaLabelValue = computed(() => {
  if (props.showLabel && props.label) {
    return undefined
  }

  return props.ariaLabel ?? props.label
})

const vuetifyProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { label, showLabel, ariaLabel, ...switchProps } = props

  return {
    ...switchProps,
    ...attrs,
  }
})
</script>
