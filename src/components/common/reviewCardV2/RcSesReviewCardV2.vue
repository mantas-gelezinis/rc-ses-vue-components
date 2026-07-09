<template>
  <section class="rc-ses-review-card-v2">
    <header class="rc-ses-review-card-v2__header">
      <div class="rc-ses-review-card-v2__header-row">
        <div class="rc-ses-review-card-v2__title-group">
          <component :is="headingTag" class="rc-ses-review-card-v2__heading">
            {{ props.heading }}
          </component>
          <slot name="heading-adornment" />
        </div>
        <div v-if="hasHeaderActions" class="rc-ses-review-card-v2__header-actions">
          <slot name="header-actions">
            <RcSesButtonV2
              v-if="props.showEdit"
              variant="link"
              size="small"
              prepend-icon="$notePencil"
              @click="emit('edit')"
            >
              {{ editLabel }}
            </RcSesButtonV2>
          </slot>
        </div>
      </div>
    </header>

    <div class="rc-ses-review-card-v2__content">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useTranslation } from 'i18next-vue'
import { computed, useSlots } from 'vue'

import RcSesButtonV2 from '@/components/common/buttonV2/RcSesButtonV2.vue'
import ReviewCardV2Defaults from '@/components/common/reviewCardV2/defaults'
import type { ReviewCardProps } from '@/components/common/reviewCardV2/types'

import './style.scss'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ReviewCardProps>(), ReviewCardV2Defaults)

const emit = defineEmits<{
  edit: []
}>()

const slots = useSlots()
const { t } = useTranslation()

const headingTag = computed(() => `h${props.headingLevel}`)

const editLabel = computed(
  () => props.editLabel ?? t('RcSesReviewCardV2.edit', { ns: 'components' }),
)

const hasHeaderActions = computed(
  () => props.showEdit || Boolean(slots['header-actions']),
)
</script>
