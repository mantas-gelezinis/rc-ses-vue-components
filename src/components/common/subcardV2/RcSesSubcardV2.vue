<template>
  <section class="rc-ses-subcard-v2">
    <header class="rc-ses-subcard-v2__header">
      <div class="rc-ses-subcard-v2__header-row">
        <div class="rc-ses-subcard-v2__title-group">
          <component :is="headingTag" class="rc-ses-subcard-v2__heading">
            {{ props.heading }}
          </component>
          <slot name="heading-adornment" />
        </div>
        <div v-if="$slots['header-actions']" class="rc-ses-subcard-v2__header-actions">
          <slot name="header-actions" />
        </div>
      </div>
      <p
        v-if="props.showDescription && props.description"
        class="rc-ses-subcard-v2__description"
      >
        {{ props.description }}
      </p>
    </header>

    <div class="rc-ses-subcard-v2__content">
      <slot />
    </div>

    <footer v-if="props.showFooter && $slots.footer" class="rc-ses-subcard-v2__footer">
      <slot name="footer" />
    </footer>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import SubcardV2Defaults from '@/components/common/subcardV2/defaults'
import type { SubcardProps } from '@/components/common/subcardV2/types'

import './style.scss'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SubcardProps>(), SubcardV2Defaults)

const headingTag = computed(() => `h${props.headingLevel}`)
</script>
