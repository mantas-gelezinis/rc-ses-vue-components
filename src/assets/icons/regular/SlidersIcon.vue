<template>
  <IconSVG v-bind="$props">
    <path
      d="M 6 9.8438 V 3.75 a 0.75 0.75 0 0 0 -1.5 0 v 6.0938 a 3 3 0 0 0 0 5.8125 v 4.5938 a 0.75 0.75 0 0 0 1.5 0 V 15.6563 a 3 3 0 0 0 0 -5.8125 Z m -0.75 4.4063 a 1.5 1.5 0 1 1 1.5 -1.5 A 1.5 1.5 0 0 1 5.25 14.25 Z m 7.5 -8.9063 V 3.75 a 0.75 0.75 0 0 0 -1.5 0 V 5.3438 a 3 3 0 0 0 0 5.8125 v 9.0938 a 0.75 0.75 0 0 0 1.5 0 V 11.1563 a 3 3 0 0 0 0 -5.8125 Z m -0.75 4.4063 a 1.5 1.5 0 1 1 1.5 -1.5 A 1.5 1.5 0 0 1 12 9.75 Z m 9.75 6 a 3.0056 3.0056 0 0 0 -2.25 -2.9063 V 3.75 a 0.75 0.75 0 0 0 -1.5 0 v 9.0938 a 3 3 0 0 0 0 5.8125 v 1.5938 a 0.75 0.75 0 0 0 1.5 0 V 18.6563 A 3.0056 3.0056 0 0 0 21.75 15.75 Z m -3 1.5 a 1.5 1.5 0 1 1 1.5 -1.5 A 1.5 1.5 0 0 1 18.75 17.25 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'SlidersIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
