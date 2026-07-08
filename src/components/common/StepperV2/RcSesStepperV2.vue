<template>
  <div
    :class="[
      'rc-ses-stepper-v2',
      `rc-ses-stepper-v2--${resolvedOrientation}`,
      { 'rc-ses-stepper-v2--mobile': isMobile },
    ]"
  >
    <div
      v-if="isMobile && resolvedOrientation === 'horizontal'"
      class="rc-ses-stepper-v2__mobile"
    >
      <div class="rc-ses-stepper-v2__nav-slot">
        <RcSesButtonV2
          v-if="activeStep > 0"
          variant="secondary"
          size="small"
          icon="$caretLeft"
          :accessible-label="backLabel"
          @click="handleBack"
        />
      </div>

      <ol class="rc-ses-stepper-v2__list">
        <RcSesStepperStepV2
          v-for="(step, index) in steps"
          :key="step.id"
          :label="step.label"
          :state="
            getStepState(
              index,
              activeStep,
              loading,
            )
          "
          :placement="getStepPlacement(index, steps.length)"
          :orientation="resolvedOrientation"
          :clickable="false"
          :show-label="false"
          :leading-connector-completed="
            isLeadingConnectorCompleted(
              index,
              activeStep,
              loading,
            )
          "
          :trailing-connector-completed="
            isTrailingConnectorCompleted(
              index,
              activeStep,
              loading,
            )
          "
        />
      </ol>

      <div class="rc-ses-stepper-v2__nav-slot" />
    </div>

    <ol v-else class="rc-ses-stepper-v2__list">
      <RcSesStepperStepV2
        v-for="(step, index) in steps"
        :key="step.id"
        :label="step.label"
        :state="
          getStepState(index, activeStep, loading)
        "
        :placement="getStepPlacement(index, steps.length)"
        :orientation="resolvedOrientation"
        :clickable="isStepClickable(index, activeStep, true)"
        :show-label="true"
        :leading-connector-completed="
          isLeadingConnectorCompleted(
            index,
            activeStep,
            loading,
          )
        "
        :trailing-connector-completed="
          isTrailingConnectorCompleted(
            index,
            activeStep,
            loading,
          )
        "
        @click="handleStepClick(index)"
      />
    </ol>
  </div>
</template>

<script lang="ts">
/* eslint-disable import/no-duplicates -- dual script block for exported prop types */
import type { DefineComponent } from 'vue'

import type { StepperProps } from '@/components/common/StepperV2/types'

export default {} as DefineComponent<StepperProps>
</script>

<script setup lang="ts">
/* eslint-disable import/first, import/no-duplicates -- dual script block for exported prop types */
import { computed, withDefaults } from 'vue'
import { useDisplay } from 'vuetify'
import { useTranslation } from 'i18next-vue'

import RcSesButtonV2 from '@/components/common/buttonV2/RcSesButtonV2.vue'
import StepperDefaults from '@/components/common/StepperV2/defaults'
import {
  getStepPlacement,
  getStepState,
  isLeadingConnectorCompleted,
  isStepClickable,
  isTrailingConnectorCompleted,
} from '@/components/common/StepperV2/getStepState'
import RcSesStepperStepV2 from '@/components/common/StepperV2/RcSesStepperStepV2.vue'
import type { StepperOwnProps } from '@/components/common/StepperV2/types'

import './style.scss'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<StepperOwnProps>(), StepperDefaults)

const emit = defineEmits<{
  (e: 'step-click', index: number): void
}>()

const { t } = useTranslation()
const { mdAndDown } = useDisplay()

const isMobile = computed(() => mdAndDown.value)

const resolvedOrientation = computed(() =>
  isMobile.value ? 'horizontal' : props.orientation,
)

const backLabel = computed(() => t('RcSesStepperV2.back', { ns: 'components' }))

const handleStepClick = (index: number) => {
  if (index < 0 || index > props.activeStep) {
    return
  }

  emit('step-click', index)
}

const handleBack = () => {
  handleStepClick(props.activeStep - 1)
}
</script>
