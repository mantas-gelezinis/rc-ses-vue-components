<template>
  <ul
    :class="rootClasses"
    :style="rootStyle"
    :role="listRole"
    :aria-label="props.accessibleLabel"
    :aria-multiselectable="props.multiselectable || undefined"
  >
    <slot />
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import advancedListV2Defaults from '@/components/common/AdvancedListV2/defaults'
import type { AdvancedListProps } from '@/components/common/AdvancedListV2/types'

import './style.scss'

const props = withDefaults(defineProps<AdvancedListProps>(), advancedListV2Defaults)

const isListbox = computed(() => props.listbox || props.multiselectable)

const listRole = computed(() => (isListbox.value ? 'listbox' : undefined))

const rootClasses = computed(() => [
  'rc-ses-advanced-list-v2',
  `rc-ses-advanced-list-v2--${props.variant}`,
  {
    'rc-ses-advanced-list-v2--framed': props.framed,
    'rc-ses-advanced-list-v2--scrollable':
      props.maxHeight != null && props.maxHeight !== '',
  },
])

const rootStyle = computed(() => {
  if (props.maxHeight == null || props.maxHeight === '') {
    return undefined
  }

  const maxHeight =
    typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight

  return { maxHeight }
})
</script>
