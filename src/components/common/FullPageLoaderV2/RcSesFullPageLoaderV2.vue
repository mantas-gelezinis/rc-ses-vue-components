<template>
  <v-overlay
    :class="[
      'rc-ses-full-page-loader-v2',
      `rc-ses-full-page-loader-v2--${props.backdrop}`,
    ]"
    :model-value="isVisible"
    :contained="props.contained"
    persistent
    scrim
    @update:model-value="(value) => (isVisible = value)"
  >
    <div class="rc-ses-full-page-loader-v2__card">
      <RcSesLoaderV2 size="large" :show-label="props.showLabel" :label="props.label" />
    </div>
  </v-overlay>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue'

import fullPageLoaderV2Defaults from '@/components/common/FullPageLoaderV2/defaults'
import type { FullPageLoaderProps } from '@/components/common/FullPageLoaderV2/types'
import RcSesLoaderV2 from '@/components/common/LoaderV2/RcSesLoaderV2.vue'

import './style.scss'

const props = withDefaults(defineProps<FullPageLoaderProps>(), fullPageLoaderV2Defaults)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const isVisible = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
})
</script>
