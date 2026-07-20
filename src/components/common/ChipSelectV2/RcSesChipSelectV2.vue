<template>
  <div
    class="rc-ses-chip-select-v2"
    role="radiogroup"
    :aria-label="props.accessibleLabel"
  >
    <RcSesBadgeV2
      v-for="option in props.options"
      :key="option.value"
      :type="isSelected(option.value) ? 'brand' : 'neutral'"
      :show-icon="isSelected(option.value) ? selectedIcon : false"
      :disabled="props.disabled"
      :accessible-label="getOptionAccessibleLabel(option)"
      class="rc-ses-chip-select-v2__item"
      @click="selectOption(option.value)"
    >
      {{ option.text }}
    </RcSesBadgeV2>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'

import RcSesBadgeV2 from '@/components/common/BadgeV2/RcSesBadgeV2.vue'
import chipSelectV2Defaults from '@/components/common/ChipSelectV2/defaults'
import type {
  ChipSelectOption,
  ChipSelectProps,
} from '@/components/common/ChipSelectV2/types'

import './style.scss'

const selectedIcon = 'checkPrimary'

const props = withDefaults(defineProps<ChipSelectProps>(), chipSelectV2Defaults)

const model = defineModel<string | number>()

const isSelected = (value: string | number): boolean => model.value === value

const getOptionAccessibleLabel = (option: ChipSelectOption): string => {
  if (isSelected(option.value)) {
    return `${option.text}, selected`
  }

  return option.text
}

const selectOption = (value: string | number) => {
  if (props.disabled || model.value === value) {
    return
  }

  model.value = value
}
</script>
