<template>
  <div class="rc-ses-card-footer-v2" :class="`rc-ses-card-footer-v2--${props.variant}`">
    <template v-if="props.variant === 'custom'">
      <slot />
    </template>

    <template v-else>
      <div class="rc-ses-card-footer-v2__start">
        <slot name="start">
          <RcSesButtonV2
            v-if="showLeftButton"
            variant="secondary"
            :size="leftButtonSize"
            :prepend-icon="leftButtonIcon"
            :disabled="leftButtonDisabled"
            @click="handleLeftClick"
          >
            {{ leftButtonLabel }}
          </RcSesButtonV2>
        </slot>
      </div>

      <div class="rc-ses-card-footer-v2__end">
        <slot name="end">
          <RcSesButtonV2
            v-if="showSecondaryButton"
            variant="secondary"
            size="regular"
            :disabled="props.secondaryDisabled"
            @click="emit('secondary')"
          >
            {{ secondaryButtonLabel }}
          </RcSesButtonV2>

          <RcSesCardPriceBeforeTaxesV2
            v-if="showPriceBlock"
            :price="props.price ?? 0"
            :label="props.priceLabel"
          />

          <RcSesButtonV2
            variant="primary"
            :size="primaryButtonSize"
            :prepend-icon="primaryPrependIcon"
            :append-icon="primaryAppendIcon"
            :disabled="props.primaryDisabled"
            @click="emit('primary')"
          >
            {{ primaryButtonLabel }}
          </RcSesButtonV2>
        </slot>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useTranslation } from 'i18next-vue'
import { computed } from 'vue'

import RcSesCardPriceBeforeTaxesV2 from '@/components/common/CardV2/RcSesCardPriceBeforeTaxesV2.vue'
import { cardFooterDefaults } from '@/components/common/CardV2/defaults'
import type { CardFooterProps } from '@/components/common/CardV2/types'
import RcSesButtonV2 from '@/components/common/buttonV2/RcSesButtonV2.vue'

const props = withDefaults(defineProps<CardFooterProps>(), cardFooterDefaults)

const emit = defineEmits<{
  back: []
  primary: []
  secondary: []
  cancel: []
}>()

const { t } = useTranslation()

const backLabel = computed(
  () => props.backLabel ?? t('RcSesCardV2.back', { ns: 'components' }),
)

const cancelLabel = computed(
  () => props.cancelLabel ?? t('RcSesCardV2.cancel', { ns: 'components' }),
)

const secondaryButtonLabel = computed(
  () => props.secondaryLabel ?? t('RcSesCardV2.cancel', { ns: 'components' }),
)

const primaryButtonLabel = computed(() => {
  if (props.variant === 'final') {
    return props.primaryLabel ?? t('RcSesCardV2.pay', { ns: 'components' })
  }

  return props.primaryLabel ?? t('RcSesCardV2.continue', { ns: 'components' })
})

const showLeftButton = computed(() => {
  if (props.variant === 'step-1') {
    return props.showSecondaryAction
  }

  return props.showBackAction
})

const leftButtonSize = computed(() =>
  props.variant === 'final' || props.variant === 'step-1' ? 'small' : 'regular',
)

const leftButtonIcon = computed(() => {
  if (props.variant === 'step-1') {
    return undefined
  }

  return props.variant === 'final' ? '$arrowLeft' : '$caretLeft'
})

const leftButtonLabel = computed(() =>
  props.variant === 'step-1' ? cancelLabel.value : backLabel.value,
)

const leftButtonDisabled = computed(() =>
  props.variant === 'step-1' ? props.secondaryDisabled : props.backDisabled,
)

const showSecondaryButton = computed(
  () => props.variant === 'step-n' && props.showSecondaryAction,
)

const showPriceBlock = computed(() => props.variant === 'final' && props.showPrice)

const primaryButtonSize = computed(() => 'regular' as const)

const primaryAppendIcon = computed(() => {
  if (props.variant === 'final') {
    return undefined
  }

  return '$caretRight'
})

const primaryPrependIcon = computed(() =>
  props.variant === 'final' ? '$shoppingCart' : undefined,
)

const handleLeftClick = () => {
  if (props.variant === 'step-1') {
    emit('cancel')
    emit('secondary')
    return
  }

  emit('back')
}
</script>
