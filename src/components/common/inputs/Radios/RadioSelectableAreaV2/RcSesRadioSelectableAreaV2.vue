<template>
  <div
    v-if="props.loading"
    :class="[
      'rc-ses-radio-selectable-area-v2',
      'rc-ses-radio-selectable-area-v2--loading',
      { 'rc-ses-radio-selectable-area-v2--with-heading': hasHeading },
    ]"
    role="status"
    :aria-label="loadingAriaLabel"
  >
    <RcSesRadioV2
      class="rc-ses-radio-selectable-area-v2__radio"
      :value="props.value"
      loading
    />
    <div class="rc-ses-radio-selectable-area-v2__content">
      <span
        v-if="hasHeading"
        class="rc-ses-radio-selectable-area-v2__skeleton-line rc-ses-radio-selectable-area-v2__skeleton-line--title"
      />
      <span
        class="rc-ses-radio-selectable-area-v2__skeleton-line rc-ses-radio-selectable-area-v2__skeleton-line--description"
      />
    </div>
    <span
      v-if="props.trailing"
      class="rc-ses-radio-selectable-area-v2__skeleton-line rc-ses-radio-selectable-area-v2__skeleton-line--trailing"
    />
  </div>

  <!-- eslint-disable-next-line vuejs-accessibility/interactive-supports-focus -- :tabindex is 0 when enabled, -1 when disabled -->
  <div
    v-else
    :class="[
      'rc-ses-radio-selectable-area-v2',
      {
        'rc-ses-radio-selectable-area-v2--checked': isSelected,
        'rc-ses-radio-selectable-area-v2--disabled': isDisabled,
        'rc-ses-radio-selectable-area-v2--error': hasError,
        'rc-ses-radio-selectable-area-v2--with-heading': hasHeading,
      },
    ]"
    role="radio"
    :tabindex="isDisabled ? -1 : 0"
    :aria-checked="isSelected"
    :aria-disabled="isDisabled || undefined"
    :aria-label="radioAccessibleLabel"
    @click="handleAreaClick"
    @keydown.enter.prevent="handleAreaClick"
    @keydown.space.prevent="handleAreaClick"
  >
    <RcSesRadioV2
      class="rc-ses-radio-selectable-area-v2__radio"
      :value="props.value"
      decorative
      :show-label="false"
      :disabled="props.disabled"
    />

    <div class="rc-ses-radio-selectable-area-v2__content">
      <p v-if="hasHeading" class="rc-ses-radio-selectable-area-v2__title">
        <slot name="title">{{ props.title }}</slot>
      </p>
      <p class="rc-ses-radio-selectable-area-v2__description">
        <slot>{{ props.description }}</slot>
      </p>
    </div>

    <span v-if="props.trailing" class="rc-ses-radio-selectable-area-v2__trailing">
      <slot name="trailing">{{ props.trailing }}</slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { useTranslation } from 'i18next-vue'
import { computed, inject } from 'vue'

import { radioGroupV2Key } from '@/components/common/inputs/Radios/RadioGroupV2/context'
import radioSelectableAreaV2Defaults from '@/components/common/inputs/Radios/RadioSelectableAreaV2/defaults'
import type { RadioSelectableAreaProps } from '@/components/common/inputs/Radios/RadioSelectableAreaV2/types'
import RcSesRadioV2 from '@/components/common/inputs/Radios/RadioV2/RcSesRadioV2.vue'

import './style.scss'

const props = withDefaults(
  defineProps<RadioSelectableAreaProps>(),
  radioSelectableAreaV2Defaults,
)

const { t } = useTranslation()

const group = inject(radioGroupV2Key, null)

const hasHeading = computed(() => Boolean(props.title))

const isSelected = computed(() => group?.model.value === props.value)

const isDisabled = computed(() => props.disabled || Boolean(group?.disabled.value))

const hasError = computed(() => Boolean(group?.hasError.value))

const radioAccessibleLabel = computed(
  () => props.accessibleLabel ?? props.title ?? props.description,
)

const loadingAriaLabel = computed(
  () =>
    props.accessibleLabel ??
    props.title ??
    props.description ??
    t('RcSesRadioV2.loading', { ns: 'components' }),
)

const handleAreaClick = () => {
  if (isDisabled.value) {
    return
  }

  group?.select(props.value)
}
</script>
