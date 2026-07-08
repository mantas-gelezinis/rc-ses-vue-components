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
      :aria-current="state === 'active' || state === 'loading' ? 'step' : undefined"
      :aria-disabled="state === 'disabled' ? 'true' : undefined"
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
          <CheckCircleFilledIcon
            v-if="state === 'completed'"
            class="rc-ses-stepper-v2__icon-graphic"
            size="20"
          />
          <DotCircleFilledIcon
            v-else-if="state === 'active'"
            class="rc-ses-stepper-v2__icon-graphic"
            size="20"
          />
          <CircleFilledIcon v-else class="rc-ses-stepper-v2__icon-graphic" size="20" />
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
        v-if="showLabel && state !== 'loading'"
        class="rc-ses-stepper-v2__label"
        :class="[
          { 'rc-ses-stepper-v2__label--active': state === 'active' },
          `rc-ses-stepper-v2__label--${placement}`,
        ]"
      >
        {{ label }}
      </span>
      <span
        v-else-if="showLabel && state === 'loading'"
        class="rc-ses-stepper-v2__label-skeleton"
        aria-hidden="true"
      />
    </component>
  </li>
</template>

<script setup lang="ts">
import { useTranslation } from 'i18next-vue'
import { computed } from 'vue'

import CheckCircleFilledIcon from '@/assets/icons/filled/CheckCircleFilledIcon.vue'
import CircleFilledIcon from '@/assets/icons/filled/CircleFilledIcon.vue'
import DotCircleFilledIcon from '@/assets/icons/filled/DotCircleFilledIcon.vue'
import type {
  StepperOrientation,
  StepperStepPlacement,
  StepperStepState,
} from '@/components/common/StepperV2/types'

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
  () => props.placement !== 'first' && props.placement !== 'only',
)

const showTrailingConnector = computed(
  () => props.placement !== 'last' && props.placement !== 'only',
)

const ariaLabel = computed(() => {
  if (props.state === 'completed') {
    return t('RcSesStepperV2.completedStep', {
      ns: 'components',
      step: props.label,
    })
  }

  if (props.state === 'loading') {
    return t('RcSesStepperV2.loadingStep', {
      ns: 'components',
      step: props.label,
    })
  }
  

  if (props.state === 'disabled') {
    return props.label
  }

  return undefined
})

const tabIndex = computed(() => {
  if (props.state === 'disabled') {
    return -1
  }

  if (props.clickable || props.state === 'active' || props.state === 'loading') {
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
