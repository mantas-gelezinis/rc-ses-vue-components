<template>
  <IconSVG v-bind="$props">
    <path
      d="M 12 2.25 A 9.75 9.75 0 1 0 21.75 12 9.7603 9.7603 0 0 0 12 2.25 Z m 0 18 a 8.25 8.25 0 1 1 8.25 -8.25 A 8.2594 8.2594 0 0 1 12 20.25 Z m 6 -8.25 a 0.75 0.75 0 0 1 -0.75 0.75 H 12 a 0.75 0.75 0 0 1 -0.75 -0.75 V 6.75 a 0.75 0.75 0 0 1 1.5 0 v 4.5 h 4.5 A 0.75 0.75 0 0 1 18 12 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'ClockIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
