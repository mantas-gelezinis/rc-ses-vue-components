<template>
  <div class="vertical-wizard-form rc-container-wide-v2">
    <RcSesCardFormContainerV2
      heading="Test"
      description="Test description"
      :steps="steps"
      :active-step="activeStep"
      layout="row"
      @step-click="handleStepClick"
    >
      <p>Current Step: {{ activeStep + 1 }}</p>

      <template #footer>
        <RcSesCardFooterV2
          variant="step-n"
          :show-back-action="activeStep !== 0"
          :show-secondary-action="true"
          :primary-disabled="activeStep === steps.length - 1"
          @back="handleBack"
          @primary="handleNext"
        />
      </template>
    </RcSesCardFormContainerV2>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import RcSesCardFooterV2 from '@/components/common/CardV2/RcSesCardFooterV2.vue'
import RcSesCardFormContainerV2 from '@/components/layouts/CardFormContainerV2/RcSesCardFormContainerV2.vue'

const steps = [
  { id: '1', label: '1-2 žodžių tekstas' },
  { id: '2', label: '1-2 žodžių tekstas' },
  { id: '3', label: '1-2 žodžių tekstas' },
  { id: '4', label: '1-2 žodžių tekstas' },
  { id: '5', label: '1-2 žodžių tekstas' },
]

const activeStep = ref(0)

const handleStepClick = (index: number) => {
  if (index > activeStep.value) {
    return
  }

  activeStep.value = index
}

const handleBack = () => {
  activeStep.value = Math.max(activeStep.value - 1, 0)
}

const handleNext = () => {
  activeStep.value = Math.min(activeStep.value + 1, steps.length - 1)
}
</script>

<style scoped>
@use '/src/styles/vuetify/spacing-v2' as spacing-v2;

.vertical-wizard-form {
  padding-top: spacing-v2.rc-spacing-v2('page-h1-to-stepper-v2');
}
</style>
