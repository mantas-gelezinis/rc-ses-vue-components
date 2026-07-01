<template>
  <v-card class="rc-ses-card-v2" variant="flat" :elevation="0">
    <header class="rc-ses-card-v2__header">
      <component :is="headingTag" class="rc-ses-card-v2__heading">
        {{ props.heading }}
      </component>
      <p
        v-if="props.showDescription && props.description"
        class="rc-ses-card-v2__description"
      >
        {{ props.description }}
      </p>
    </header>

    <div class="rc-ses-card-v2__content" :class="contentClass">
      <slot />
    </div>

    <footer v-if="props.showFooter || $slots.footer" class="rc-ses-card-v2__footer">
      <slot name="footer" :footer-props="footerSlotProps">
        <RcSesCardFooterV2
          v-bind="footerSlotProps"
          @back="emit('back')"
          @primary="emit('primary')"
          @secondary="emit('secondary')"
          @cancel="emit('cancel')"
        />
      </slot>
    </footer>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import RcSesCardFooterV2 from '@/components/common/CardV2/RcSesCardFooterV2.vue'
import CardDefaults from '@/components/common/CardV2/defaults'
import type { CardFooterProps, CardProps } from '@/components/common/CardV2/types'

import './style.scss'

defineOptions({ inheritAttrs: false })

type CardOwnProps = CardProps &
  Pick<
    CardFooterProps,
    | 'showBackAction'
    | 'showSecondaryAction'
    | 'showPrice'
    | 'price'
    | 'priceLabel'
    | 'backLabel'
    | 'primaryLabel'
    | 'secondaryLabel'
    | 'cancelLabel'
    | 'primaryDisabled'
    | 'secondaryDisabled'
    | 'backDisabled'
  >

const props = withDefaults(defineProps<CardOwnProps>(), {
  ...CardDefaults,
  showBackAction: true,
  showSecondaryAction: true,
  showPrice: true,
  price: 0,
  primaryDisabled: false,
  secondaryDisabled: false,
  backDisabled: false,
})

const emit = defineEmits<{
  back: []
  primary: []
  secondary: []
  cancel: []
}>()

const headingTag = computed(() => `h${props.headingLevel}`)

const contentClass = computed(() =>
  props.contentVariant === 'default'
    ? undefined
    : `rc-ses-card-v2__content--${props.contentVariant}`,
)

const footerSlotProps = computed(() => ({
  variant: props.variant,
  showBackAction: props.showBackAction,
  showSecondaryAction: props.showSecondaryAction,
  showPrice: props.showPrice,
  price: props.price,
  priceLabel: props.priceLabel,
  backLabel: props.backLabel,
  primaryLabel: props.primaryLabel,
  secondaryLabel: props.secondaryLabel,
  cancelLabel: props.cancelLabel,
  primaryDisabled: props.primaryDisabled,
  secondaryDisabled: props.secondaryDisabled,
  backDisabled: props.backDisabled,
}))
</script>
