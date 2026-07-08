<template>
  <div
    :class="[
      'rc-ses-card-form-container-v2',
      `rc-ses-card-form-container-v2--${layoutDirection}`,
    ]"
  >
    <RcSesStepperV2
      v-if="showStepper"
      :steps="props.steps"
      :active-step="props.activeStep"
      :orientation="stepperOrientation"
      :loading="props.loading"
      @step-click="handleStepClick"
    />

    <RcSesCardV2
      class="rc-ses-card-form-container-v2__card"
      :heading="props.heading"
      :show-description="props.showDescription"
      :description="props.description"
      :content-variant="props.contentVariant"
      :heading-level="props.headingLevel"
    >
      <slot />

      <template v-if="$slots.footer" #footer>
        <slot name="footer" />
      </template>
    </RcSesCardV2>
  </div>
</template>

<script lang="ts">
/* eslint-disable import/no-duplicates -- dual script block for exported prop types */
import type { DefineComponent } from 'vue'

import type { CardFormContainerProps } from '@/components/layouts/CardFormContainerV2/types'

export default {} as DefineComponent<CardFormContainerProps>
</script>

<script setup lang="ts">
/* eslint-disable import/first, import/no-duplicates -- dual script block for exported prop types */
import { computed, withDefaults } from 'vue'

import RcSesCardV2 from '@/components/common/CardV2/RcSesCardV2.vue'
import RcSesStepperV2 from '@/components/common/StepperV2/RcSesStepperV2.vue'
import { cardFormContainerDefaults } from '@/components/layouts/CardFormContainerV2/defaults'
import {
  getLayoutDirection,
  getStepperOrientation,
  shouldShowStepper,
} from '@/components/layouts/CardFormContainerV2/getLayoutDirection'
import type { CardFormContainerOwnProps } from '@/components/layouts/CardFormContainerV2/types'

import './style.scss'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<CardFormContainerOwnProps>(),
  cardFormContainerDefaults,
)

const emit = defineEmits<{
  (e: 'step-click', index: number): void
}>()

const layoutDirection = computed(() =>
  getLayoutDirection(props.steps.length, props.layout),
)

const showStepper = computed(() => shouldShowStepper(props.steps.length))

const stepperOrientation = computed(() => getStepperOrientation(layoutDirection.value))

const handleStepClick = (index: number) => {
  emit('step-click', index)
}
</script>
