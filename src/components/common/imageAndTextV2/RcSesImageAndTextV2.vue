<template>
  <section
    :class="[
      'rc-ses-image-and-text-v2',
      { 'rc-ses-image-and-text-v2--background': props.background },
    ]"
    :aria-labelledby="titleId"
  >
    <div class="rc-ses-image-and-text-v2__image-text">
      <div class="rc-ses-image-and-text-v2__image">
        <slot name="image">
          <v-icon
            class="rc-ses-image-and-text-v2__icon"
            :icon="props.icon"
            aria-hidden="true"
          />
        </slot>
      </div>

      <div class="rc-ses-image-and-text-v2__copy">
        <h3 :id="titleId" class="rc-ses-image-and-text-v2__title">
          <slot name="title">{{ props.title }}</slot>
        </h3>
        <p v-if="hasDescription" class="rc-ses-image-and-text-v2__description">
          <slot name="description">{{ props.description }}</slot>
        </p>
      </div>
    </div>

    <div v-if="showAction" class="rc-ses-image-and-text-v2__action">
      <slot name="action">
        <RcSesButtonV2
          variant="primary"
          :prepend-icon="props.action?.icon"
          :disabled="props.action?.disabled"
          @click="emit('action')"
        >
          {{ props.action?.label }}
        </RcSesButtonV2>
      </slot>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, useSlots } from 'vue'

import RcSesButtonV2 from '@/components/common/buttonV2/RcSesButtonV2.vue'
import ImageAndTextV2Defaults from '@/components/common/imageAndTextV2/defaults'
import type { ImageAndTextProps } from '@/components/common/imageAndTextV2/types'

import './style.scss'

const props = withDefaults(defineProps<ImageAndTextProps>(), ImageAndTextV2Defaults)

const emit = defineEmits<{
  (e: 'action'): void
}>()

const slots = useSlots()

const instance = getCurrentInstance()
const titleId = `rc-ses-image-and-text-v2-title-${instance?.uid ?? 0}`

const hasDescription = computed(
  () => Boolean(props.description) || Boolean(slots.description),
)

const showAction = computed(() => Boolean(props.action) || Boolean(slots.action))
</script>
