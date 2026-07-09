<template>
  <li
    :class="[
      'rc-ses-stepper-v2__step',
      `rc-ses-stepper-v2__step--${state}`,
      `rc-ses-stepper-v2__step--${placement}`,
      `rc-ses-stepper-v2__step--${orientation}`,
    ]"
  >
    <component
      :is="clickable ? 'button' : 'span'"
      :type="clickable ? 'button' : undefined"
      class="rc-ses-stepper-v2__step-control"
      :aria-current="
        state === StepperStepState.Active || state === StepperStepState.Loading
          ? 'step'
          : undefined
      "
      :aria-disabled="state === StepperStepState.Disabled ? 'true' : undefined"
      :aria-label="ariaLabel"
      :tabindex="tabIndex"
      :disabled="clickable ? false : undefined"
      @click="handleClick"
    >
      <span class="rc-ses-stepper-v2__indicator-row" aria-hidden="true">
        <span
          v-if="showLeadingConnector"
          class="rc-ses-stepper-v2__connector rc-ses-stepper-v2__connector--leading"
        >
          <span
            class="rc-ses-stepper-v2__connector-line"
            :class="{
              'rc-ses-stepper-v2__connector-line--completed': leadingConnectorCompleted,
            }"
          />
        </span>
        <span
          class="rc-ses-stepper-v2__icon"
          :class="`rc-ses-stepper-v2__icon--${state}`"
        >
          <component
            :is="stepIcon"
            class="rc-ses-stepper-v2__icon-graphic"
            :size="stepIconSize"
          />
        </span>
        <span
          v-if="showTrailingConnector"
          class="rc-ses-stepper-v2__connector rc-ses-stepper-v2__connector--trailing"
        >
          <span
            class="rc-ses-stepper-v2__connector-line"
            :class="{
              'rc-ses-stepper-v2__connector-line--completed': trailingConnectorCompleted,
            }"
          />
        </span>
      </span>

      <span
        v-if="showLabel && state !== StepperStepState.Loading"
        class="rc-ses-stepper-v2__label"
        :class="[
          { 'rc-ses-stepper-v2__label--active': state === StepperStepState.Active },
          `rc-ses-stepper-v2__label--${placement}`,
        ]"
      >
        {{ label }}
      </span>
      <span
        v-else-if="showLabel && state === StepperStepState.Loading"
        class="rc-ses-stepper-v2__label-skeleton"
        aria-hidden="true"
      />
    </component>
  </li>
</template>

<script setup lang="ts">
import { useTranslation } from 'i18next-vue'
import { type Component, computed } from 'vue'

import CheckCircleFilledIcon from '@/assets/icons/filled/CheckCircleFilledIcon.vue'
import CircleFilledIcon from '@/assets/icons/filled/CircleFilledIcon.vue'
import DotCircleFilledIcon from '@/assets/icons/filled/DotCircleFilledIcon.vue'
import {
  StepperOrientation,
  StepperStepPlacement,
  StepperStepState,
} from '@/components/common/StepperV2/types'
import { RC_SIZES_V2 } from '@/constants/sizesV2'

const stepIconSize = RC_SIZES_V2['icon-medium-v2']

const props = defineProps<{
  label: string
  state: StepperStepState
  placement: StepperStepPlacement
  orientation: StepperOrientation
  clickable: boolean
  showLabel: boolean
  leadingConnectorCompleted: boolean
  trailingConnectorCompleted: boolean
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const { t } = useTranslation()

const showLeadingConnector = computed(
  () =>
    props.placement !== StepperStepPlacement.First &&
    props.placement !== StepperStepPlacement.Only,
)

const showTrailingConnector = computed(
  () =>
    props.placement !== StepperStepPlacement.Last &&
    props.placement !== StepperStepPlacement.Only,
)

const stepIcon = computed<Component>(() => {
  switch (props.state) {
    case StepperStepState.Completed:
      return CheckCircleFilledIcon
    case StepperStepState.Active:
      return DotCircleFilledIcon
    default:
      return CircleFilledIcon
  }
})

const ariaLabel = computed(() => {
  if (props.state === StepperStepState.Completed) {
    return t('RcSesStepperV2.completedStep', {
      ns: 'components',
      step: props.label,
    })
  }

  if (props.state === StepperStepState.Loading) {
    return t('RcSesStepperV2.loadingStep', {
      ns: 'components',
      step: props.label,
    })
  }

  if (props.state === StepperStepState.Active) {
    if (props.showLabel) {
      return undefined
    }

    return t('RcSesStepperV2.activeStep', {
      ns: 'components',
      step: props.label,
    })
  }

  if (props.state === StepperStepState.Disabled) {
    return props.label
  }

  return undefined
})

const tabIndex = computed(() => {
  if (props.state === StepperStepState.Disabled) {
    return -1
  }

  if (
    props.clickable ||
    props.state === StepperStepState.Active ||
    props.state === StepperStepState.Loading
  ) {
    return 0
  }

  return -1
})

const handleClick = () => {
  if (!props.clickable) {
    return
  }

  emit('click')
}
</script>
