<template>
  <v-btn
    :class="buttonClasses"
    v-bind="vuetifyProps"
    :aria-label="props.accessibleLabel"
    :aria-busy="iconState.loading || undefined"
  >
    <v-icon v-if="iconState.iconOnly" :icon="iconState.buttonIcon" aria-hidden="true" />
    <slot v-else />

    <template v-if="!iconState.iconOnly && $slots.append" #append>
      <slot name="append" />
    </template>

    <template v-if="!iconState.iconOnly && $slots.prepend" #prepend>
      <slot name="prepend" />
    </template>

    <template v-if="$slots.loader" #loader>
      <slot name="loader" />
    </template>
  </v-btn>
</template>

<script lang="ts">
/* eslint-disable import/no-duplicates -- dual script block for exported prop types */
import type { DefineComponent } from 'vue'

import type { ButtonProps } from '@/components/common/buttonV2/types'

export default {} as DefineComponent<ButtonProps>
</script>

<script setup lang="ts">
/* eslint-disable import/first, import/no-duplicates -- dual script block for exported prop types */
import { computed, useAttrs, withDefaults } from 'vue'

import ButtonDefaults from '@/components/common/buttonV2/defaults'
import type { ButtonOwnProps } from '@/components/common/buttonV2/types'

import './style.scss'

defineOptions({ inheritAttrs: false })

const variantMap = {
  primary: 'flat',
  secondary: 'outlined',
  error: 'flat',
  link: 'text',
} as const

const props = withDefaults(defineProps<ButtonOwnProps>(), ButtonDefaults)
const attrs = useAttrs()

const iconState = computed(() => {
  const loading = props.loading != null && props.loading !== false
  const iconOnly = !!props.icon && props.icon !== true
  const useCustomSpinner =
    loading && (iconOnly || !!props.prependIcon || !!props.appendIcon)

  const withSpinner = (icon?: ButtonOwnProps['prependIcon']) =>
    loading && icon ? '$spinner' : icon

  return {
    loading,
    iconOnly,
    useCustomSpinner,
    buttonIcon:
      iconOnly && typeof props.icon === 'string' ? withSpinner(props.icon) : undefined,
    prependIcon: withSpinner(props.prependIcon),
    appendIcon: withSpinner(props.appendIcon),
  }
})

const buttonClasses = computed(() => [
  'rc-ses-btn-v2',
  `rc-ses-btn-v2--${props.variant}`,
  `rc-ses-btn-v2--${props.size}`,
  {
    'rc-ses-btn-v2--loading': iconState.value.loading,
    'rc-ses-btn-v2--icon-only': iconState.value.iconOnly,
    'rc-ses-btn-v2--text-loading':
      iconState.value.loading && !iconState.value.useCustomSpinner,
  },
])

const vuetifyProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { color, ...passthroughAttrs } = attrs

  return {
    ...passthroughAttrs,
    disabled: props.disabled,
    density: props.density,
    flat: props.flat,
    variant: variantMap[(props.variant ?? 'primary') as keyof typeof variantMap],
    size: props.size === 'small' ? 'small' : 'default',
    loading: iconState.value.loading && !iconState.value.useCustomSpinner,
    prependIcon: iconState.value.prependIcon,
    appendIcon: iconState.value.appendIcon,
    icon: iconState.value.iconOnly ? true : undefined,
  }
})
</script>
