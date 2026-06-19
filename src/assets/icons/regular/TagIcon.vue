<template>
  <IconSVG v-bind="$props">
    <path
      d="M 22.8103 12.75 13.5 3.4397 A 1.4869 1.4869 0 0 0 12.4397 3 H 3.75 a 0.75 0.75 0 0 0 -0.75 0.75 v 8.6897 A 1.4869 1.4869 0 0 0 3.4397 13.5 L 12.75 22.8103 a 1.5 1.5 0 0 0 2.1216 0 l 7.9388 -7.9388 a 1.5 1.5 0 0 0 0 -2.1216 Z m -9 9 L 4.5 12.4397 V 4.5 h 7.9397 L 21.75 13.8103 Z M 9 7.875 A 1.125 1.125 0 1 1 7.875 6.75 1.125 1.125 0 0 1 9 7.875 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'TagIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
