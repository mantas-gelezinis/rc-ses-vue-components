<template>
  <v-switch
    v-model="model"
    :class="['rc-ses-toggle-v2']"
    v-bind="vuetifyProps"
    :label="displayLabel"
    :aria-label="ariaLabel"
    :aria-checked="ariaChecked"
    role="switch"
    density="compact"
    inset
    flat
    hide-details
    :ripple="false"
  />
</template>

<script lang="ts">
/* eslint-disable import/no-duplicates -- dual script block for exported prop types */
import type { DefineComponent } from 'vue'

import type { ToggleProps } from '@/components/common/toggleV2/types'

export default {} as DefineComponent<ToggleProps>
</script>

<script setup lang="ts">
/* eslint-disable import/first, import/no-duplicates -- dual script block for exported prop types */
import { computed, useAttrs, withDefaults } from 'vue'

import ToggleDefaults from '@/components/common/toggleV2/defaults'
import type { ToggleOwnProps } from '@/components/common/toggleV2/types'

import './style.scss'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ToggleOwnProps>(), ToggleDefaults)
const attrs = useAttrs()

const model = defineModel<boolean>({ default: false })

const displayLabel = computed(() => (props.showLabel ? props.label : undefined))

const ariaLabel = computed(() => {
  if (props.showLabel) {
    return undefined
  }

  return props.accessibleLabel ?? props.label
})

const ariaChecked = computed(() => (model.value ? 'true' : 'false'))

const vuetifyProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { color, label, ...passthroughAttrs } = attrs

  return {
    ...passthroughAttrs,
    disabled: props.disabled,
    readonly: props.readonly,
  }
})
</script>
