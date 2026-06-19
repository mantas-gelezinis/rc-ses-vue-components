<template>
  <IconSVG v-bind="$props">
    <path
      d="M 19.5 5.25 H 16.9013 L 15.6234 3.3338 A 0.75 0.75 0 0 0 15 3 H 9 a 0.75 0.75 0 0 0 -0.6234 0.3337 L 7.0978 5.25 H 4.5 A 2.25 2.25 0 0 0 2.25 7.5 V 18 a 2.25 2.25 0 0 0 2.25 2.25 H 19.5 a 2.25 2.25 0 0 0 2.25 -2.25 V 7.5 A 2.25 2.25 0 0 0 19.5 5.25 Z m 0.75 12.75 a 0.75 0.75 0 0 1 -0.75 0.75 H 4.5 a 0.75 0.75 0 0 1 -0.75 -0.75 V 7.5 a 0.75 0.75 0 0 1 0.75 -0.75 H 7.5 a 0.75 0.75 0 0 0 0.6244 -0.3337 L 9.4013 4.5 h 5.1966 l 1.2778 1.9163 A 0.75 0.75 0 0 0 16.5 6.75 h 3 a 0.75 0.75 0 0 1 0.75 0.75 Z M 12 8.25 a 4.125 4.125 0 1 0 4.125 4.125 A 4.1297 4.1297 0 0 0 12 8.25 Z m 0 6.75 a 2.625 2.625 0 1 1 2.625 -2.625 A 2.625 2.625 0 0 1 12 15 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'CameraIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
