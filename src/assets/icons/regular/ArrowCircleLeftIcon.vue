<template>
  <IconSVG v-bind="$props">
    <path
      d="M 12 2.25 A 9.75 9.75 0 1 0 21.75 12 9.7603 9.7603 0 0 0 12 2.25 Z m 0 18 a 8.25 8.25 0 1 1 8.25 -8.25 A 8.2594 8.2594 0 0 1 12 20.25 Z m 4.5 -8.25 a 0.75 0.75 0 0 1 -0.75 0.75 H 10.0603 l 1.7203 1.7194 a 0.75 0.75 0 0 1 -1.0613 1.0613 l -3 -3 a 0.75 0.75 0 0 1 0 -1.0613 l 3 -3 a 0.75 0.75 0 0 1 1.0613 1.0613 L 10.0603 11.25 H 15.75 A 0.75 0.75 0 0 1 16.5 12 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'ArrowCircleLeftIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
