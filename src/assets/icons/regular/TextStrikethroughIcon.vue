<template>
  <IconSVG v-bind="$props">
    <path
      d="M 21 12 a 0.75 0.75 0 0 1 -0.75 0.75 H 16.4934 c 0.8616 0.6666 1.5066 1.6125 1.5066 3 0 1.2506 -0.6563 2.4094 -1.8516 3.2616 C 15.0309 19.8103 13.5572 20.25 12 20.25 s -3.0309 -0.4397 -4.1484 -1.2384 C 6.6563 18.1594 6 17.0006 6 15.75 a 0.75 0.75 0 0 1 1.5 0 c 0 1.6266 2.0625 3 4.5 3 s 4.5 -1.3734 4.5 -3 c 0 -1.3922 -0.9881 -2.2106 -3.6347 -3 H 3.75 a 0.75 0.75 0 0 1 0 -1.5 H 20.25 A 0.75 0.75 0 0 1 21 12 Z M 7.1559 9.75 a 0.75 0.75 0 0 0 0.7134 -0.9834 A 1.6219 1.6219 0 0 1 7.7916 8.25 c 0 -1.71 1.8094 -3 4.2084 -3 1.7662 0 3.2025 0.6956 3.8438 1.8609 a 0.75 0.75 0 0 0 1.3125 -0.7219 C 16.2497 4.7363 14.3222 3.75 12 3.75 8.7459 3.75 6.2916 5.6841 6.2916 8.25 a 3.1622 3.1622 0 0 0 0.1519 0.9834 A 0.75 0.75 0 0 0 7.1559 9.75 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'TextStrikethroughIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
