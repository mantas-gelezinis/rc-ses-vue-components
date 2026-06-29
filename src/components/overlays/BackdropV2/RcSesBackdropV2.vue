<template>
  <v-overlay
    :class="['rc-ses-backdrop-v2']"
    :model-value="isVisible"
    v-bind="filteredProps"
    @update:model-value="handleUpdate"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

import BackdropDefaults from './defaults'
import './style.scss'
import type { BackdropProps } from './types'

const props = withDefaults(defineProps<BackdropProps>(), BackdropDefaults)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const isVisible = computed({
  get: () => props.modelValue ?? true,
  set: (value: boolean) => emit('update:modelValue', value),
})

const handleUpdate = (value: boolean) => {
  isVisible.value = value
}

const filteredProps = computed(() => {
  const { modelValue, ...vuetifyProps } = props
  return vuetifyProps
})
</script>
