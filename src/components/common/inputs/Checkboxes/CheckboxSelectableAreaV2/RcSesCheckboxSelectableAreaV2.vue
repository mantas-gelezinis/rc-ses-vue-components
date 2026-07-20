<template>
  <div
    v-if="props.loading"
    :class="[
      'rc-ses-checkbox-selectable-area-v2',
      'rc-ses-checkbox-selectable-area-v2--loading',
      { 'rc-ses-checkbox-selectable-area-v2--with-heading': hasHeading },
    ]"
    role="status"
    :aria-label="loadingAriaLabel"
  >
    <RcSesCheckboxV2 class="rc-ses-checkbox-selectable-area-v2__checkbox" loading />
    <div class="rc-ses-checkbox-selectable-area-v2__content">
      <span
        v-if="hasHeading"
        class="rc-ses-checkbox-selectable-area-v2__skeleton-line rc-ses-checkbox-selectable-area-v2__skeleton-line--title"
      />
      <span
        class="rc-ses-checkbox-selectable-area-v2__skeleton-line rc-ses-checkbox-selectable-area-v2__skeleton-line--description"
      />
    </div>
    <span
      v-if="props.trailing"
      class="rc-ses-checkbox-selectable-area-v2__skeleton-line rc-ses-checkbox-selectable-area-v2__skeleton-line--trailing"
    />
  </div>

  <div
    v-else
    :class="[
      'rc-ses-checkbox-selectable-area-v2',
      {
        'rc-ses-checkbox-selectable-area-v2--checked': model && !props.indeterminate,
        'rc-ses-checkbox-selectable-area-v2--disabled': props.disabled,
        'rc-ses-checkbox-selectable-area-v2--error': hasError,
        'rc-ses-checkbox-selectable-area-v2--with-heading': hasHeading,
      },
    ]"
    role="button"
    tabindex="0"
    :aria-disabled="props.disabled || undefined"
    :aria-pressed="model"
    :aria-label="checkboxAccessibleLabel"
    @click="handleAreaClick"
    @keydown.enter.prevent="handleAreaClick"
    @keydown.space.prevent="handleAreaClick"
  >
    <RcSesCheckboxV2
      v-model="model"
      class="rc-ses-checkbox-selectable-area-v2__checkbox"
      :show-label="false"
      :disabled="props.disabled"
      :indeterminate="props.indeterminate"
      :error="hasError"
      :accessible-label="checkboxAccessibleLabel"
      @click.stop
    />

    <div class="rc-ses-checkbox-selectable-area-v2__content">
      <p v-if="hasHeading" class="rc-ses-checkbox-selectable-area-v2__title">
        <slot name="title">{{ props.title }}</slot>
      </p>
      <p class="rc-ses-checkbox-selectable-area-v2__description">
        <slot>{{ props.description }}</slot>
      </p>
    </div>

    <span v-if="props.trailing" class="rc-ses-checkbox-selectable-area-v2__trailing">
      <slot name="trailing">{{ props.trailing }}</slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { useTranslation } from 'i18next-vue'
import { computed } from 'vue'

import checkboxSelectableAreaV2Defaults from '@/components/common/inputs/Checkboxes/CheckboxSelectableAreaV2/defaults'
import type { CheckboxSelectableAreaProps } from '@/components/common/inputs/Checkboxes/CheckboxSelectableAreaV2/types'
import RcSesCheckboxV2 from '@/components/common/inputs/Checkboxes/CheckboxV2/RcSesCheckboxV2.vue'

import './style.scss'

const props = withDefaults(
  defineProps<CheckboxSelectableAreaProps>(),
  checkboxSelectableAreaV2Defaults,
)

const model = defineModel<boolean>({ default: false })

const { t } = useTranslation()

const hasHeading = computed(() => Boolean(props.title))

const hasError = computed(() => Boolean(props.error))

const checkboxAccessibleLabel = computed(
  () => props.accessibleLabel ?? props.title ?? props.description,
)

const loadingAriaLabel = computed(
  () =>
    props.accessibleLabel ??
    props.title ??
    props.description ??
    t('RcSesCheckboxV2.loading', { ns: 'components' }),
)

const handleAreaClick = () => {
  if (props.disabled) {
    return
  }

  if (props.indeterminate) {
    model.value = true
    return
  }

  model.value = !model.value
}
</script>
