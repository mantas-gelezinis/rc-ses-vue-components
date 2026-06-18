<template>
  <v-chip
    :class="[
      'rc-ses-badge',
      `rc-ses-badge--${props.type}`,
      `rc-ses-badge--${props.size}`,
    ]"
    v-bind="filteredProps"
    :closable="props.showClose"
    :close-label="props.showClose ? closeAriaLabel : undefined"
    :role="chipRole"
    :aria-label="props.accessibleLabel"
    @click:close="handleClose"
  >
    <template #prepend>
      <slot v-if="$slots.icon || props.showIcon" name="icon">
        <v-icon
          :class="[
            'rc-ses-badge__icon',
            `rc-ses-badge__icon--${props.type}`,
            `rc-ses-badge__icon--${props.size}`,
          ]"
          aria-hidden="true"
        >
          {{
            typeof props.showIcon === 'string' ? `$${props.showIcon}` : '$circleFilled'
          }}
        </v-icon>
      </slot>
    </template>
    <template v-if="props.showClose" #close>
      <v-icon
        :class="[
          'rc-ses-badge__close-icon',
          `rc-ses-badge__close-icon--${props.type}`,
          `rc-ses-badge__close-icon--${props.size}`,
        ]"
        aria-hidden="true"
      >
        $close
      </v-icon>
    </template>
    <slot />
  </v-chip>
</template>

<script setup lang="ts">
import { useTranslation } from 'i18next-vue'
import { computed } from 'vue'

import BadgeDefaults from './defaults'
import './style.scss'
import type { BadgeProps, BadgeType } from './types'

const props = withDefaults(defineProps<BadgeProps>(), BadgeDefaults)

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { t } = useTranslation()

const handleClose = () => {
  if (props.disabled) {
    return
  }

  emit('close')
}

const statusTypes: BadgeType[] = ['success', 'warning', 'error', 'info']

const chipRole = computed(() => {
  if (props.showClose || props.accessibleLabel) {
    return undefined
  }

  if (statusTypes.includes(props.type)) {
    return 'status'
  }

  return undefined
})

const closeAriaLabel = computed(() => t('RcSesBadgeV2.remove', { ns: 'components' }))

const filteredProps = computed(() => {
  const { type, size, showIcon, showClose, accessibleLabel, ...vuetifyProps } = props
  return vuetifyProps
})
</script>
