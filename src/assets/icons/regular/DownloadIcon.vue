<template>
  <IconSVG v-bind="$props">
    <path
      d="M 22.5 12.75 v 6 a 1.5 1.5 0 0 1 -1.5 1.5 H 3 a 1.5 1.5 0 0 1 -1.5 -1.5 V 12.75 a 1.5 1.5 0 0 1 1.5 -1.5 H 6.75 a 0.75 0.75 0 0 1 0 1.5 H 3 v 6 H 21 V 12.75 H 17.25 a 0.75 0.75 0 0 1 0 -1.5 h 3.75 A 1.5 1.5 0 0 1 22.5 12.75 Z m -11.0306 -0.2194 a 0.75 0.75 0 0 0 1.0613 0 l 4.5 -4.5 a 0.75 0.75 0 0 0 -1.0613 -1.0613 L 12.75 10.1897 V 2.25 a 0.75 0.75 0 0 0 -1.5 0 v 7.9397 L 8.0306 6.9694 A 0.75 0.75 0 0 0 6.9694 8.0306 Z M 18.75 15.75 a 1.125 1.125 0 1 0 -1.125 1.125 A 1.125 1.125 0 0 0 18.75 15.75 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'DownloadIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
