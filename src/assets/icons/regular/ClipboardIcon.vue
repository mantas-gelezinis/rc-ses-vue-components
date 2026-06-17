<template>
  <IconSVG v-bind="$props">
    <path
      d="M 18.75 3 H 15.3506 a 4.4925 4.4925 0 0 0 -6.7012 0 H 5.25 A 1.5 1.5 0 0 0 3.75 4.5 V 20.25 a 1.5 1.5 0 0 0 1.5 1.5 H 18.75 a 1.5 1.5 0 0 0 1.5 -1.5 V 4.5 A 1.5 1.5 0 0 0 18.75 3 Z m -6.75 0 a 3 3 0 0 1 3 3 H 9 A 3 3 0 0 1 12 3 Z m 6.75 17.25 H 5.25 V 4.5 H 7.7578 A 4.4934 4.4934 0 0 0 7.5 6 v 0.75 a 0.75 0.75 0 0 0 0.75 0.75 h 7.5 a 0.75 0.75 0 0 0 0.75 -0.75 V 6 a 4.4934 4.4934 0 0 0 -0.2578 -1.5 H 18.75 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'ClipboardIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
