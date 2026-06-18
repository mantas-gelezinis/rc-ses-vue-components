<template>
  <v-btn
    :class="buttonClasses"
    v-bind="vuetifyProps"
    :aria-label="props.accessibleLabel"
    :aria-busy="isLoading || undefined"
  >
    <v-icon v-if="isIconOnly" :icon="iconButtonIcon" aria-hidden="true" />
    <slot v-else />

    <template v-if="!isIconOnly && $slots.append" #append>
      <slot name="append" />
    </template>

    <template v-if="!isIconOnly && $slots.prepend" #prepend>
      <slot name="prepend" />
    </template>

    <template v-if="$slots.loader" #loader>
      <slot name="loader" />
    </template>
  </v-btn>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue'

import ButtonDefaults from '@/components/common/buttonV2/defaults'
import type { ButtonProps } from '@/components/common/buttonV2/types'

import './style.scss'

const props = withDefaults(defineProps<ButtonProps>(), ButtonDefaults)

const isLoading = computed(() => props.loading != null && props.loading !== false)
const isIconOnly = computed(() => !!props.icon && props.icon !== true)
const hasIconSlot = computed(
  () => isIconOnly.value || !!(props.prependIcon || props.appendIcon),
)

const iconButtonIcon = computed(() => {
  if (!isIconOnly.value || !props.icon || props.icon === true) return undefined
  return isLoading.value ? '$spinner' : props.icon
})

const buttonClasses = computed(() => [
  'rc-ses-btn-v2',
  `rc-ses-btn-v2--${props.variant}`,
  `rc-ses-btn-v2--${props.size}`,
  {
    'rc-ses-btn-v2--loading': isLoading.value,
    'rc-ses-btn-v2--icon-only': isIconOnly.value,
    'rc-ses-btn-v2--text-loading': isLoading.value && !hasIconSlot.value,
  },
])

const vuetifyProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    variant: buttonVariant,
    size: buttonSize,
    color,
    icon,
    accessibleLabel,
    ...vBtnProps
  } = props

  const loading = isLoading.value
  const useCustomSpinner = loading && hasIconSlot.value

  let variantValue: 'flat' | 'outlined' | 'text' = 'flat'
  if (buttonVariant === 'secondary') variantValue = 'outlined'
  if (buttonVariant === 'link') variantValue = 'text'

  const resolveIcon = (iconValue: ButtonProps['prependIcon']) => {
    if (!iconValue) return undefined
    return loading ? '$spinner' : iconValue
  }

  return {
    ...vBtnProps,
    variant: variantValue,
    size: buttonSize === 'small' ? 'small' : 'default',
    loading: loading && !useCustomSpinner,
    prependIcon: resolveIcon(props.prependIcon),
    appendIcon: resolveIcon(props.appendIcon),
    icon: isIconOnly.value ? true : undefined,
  }
})
</script>
