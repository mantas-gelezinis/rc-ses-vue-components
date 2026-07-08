<template>
  <v-card class="rc-ses-card-v2" variant="flat" :elevation="0">
    <header class="rc-ses-card-v2__header">
      <component :is="headingTag" class="rc-ses-card-v2__heading">
        {{ props.heading }}
      </component>
      <p
        v-if="props.showDescription && props.description"
        class="rc-ses-card-v2__description"
      >
        {{ props.description }}
      </p>
    </header>

    <div class="rc-ses-card-v2__content" :class="contentClass">
      <slot />
    </div>

    <footer v-if="$slots.footer" class="rc-ses-card-v2__footer">
      <slot name="footer" />
    </footer>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { cardDefaults } from '@/components/common/CardV2/defaults'
import type { CardProps } from '@/components/common/CardV2/types'

import './style.scss'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<CardProps>(), cardDefaults)

const headingTag = computed(() => `h${props.headingLevel}`)

const contentClass = computed(() =>
  props.contentVariant === 'default'
    ? undefined
    : `rc-ses-card-v2__content--${props.contentVariant}`,
)
</script>
