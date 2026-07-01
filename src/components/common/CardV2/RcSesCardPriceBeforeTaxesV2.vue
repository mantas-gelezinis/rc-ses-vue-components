<template>
  <div class="rc-ses-card-price-before-taxes-v2">
    <span class="rc-ses-card-price-before-taxes-v2__label">{{ resolvedLabel }}</span>
    <span class="rc-ses-card-price-before-taxes-v2__amount">{{ formattedPrice }}</span>
  </div>
</template>

<script setup lang="ts">
import { useTranslation } from 'i18next-vue'
import { computed } from 'vue'

import formatCardPrice from '@/components/common/CardV2/formatPrice'
import type { CardPriceBeforeTaxesProps } from '@/components/common/CardV2/types'

const props = defineProps<CardPriceBeforeTaxesProps>()

const { t } = useTranslation()

const resolvedLabel = computed(
  () => props.label ?? t('RcSesCardV2.priceBeforeTaxes', { ns: 'components' }),
)

const formattedPrice = computed(() => formatCardPrice(props.price))
</script>
