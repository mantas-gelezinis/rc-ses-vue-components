<template>
  <div class="rc-ses-price-display-v2">
    <span v-if="props.label" class="rc-ses-price-display-v2__label">
      {{ props.label }}
    </span>
    <span class="rc-ses-price-display-v2__amount">{{ props.price }}</span>
  </div>
</template>

<script setup lang="ts">
import type { PriceDisplayProps } from '@/components/common/PriceDisplayV2/types'

import './style.scss'

const props = defineProps<PriceDisplayProps>()
</script>
