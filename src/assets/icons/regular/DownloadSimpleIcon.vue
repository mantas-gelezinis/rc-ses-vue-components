<template>
  <IconSVG v-bind="$props">
    <path
      d="M 21 13.5 v 6 a 0.75 0.75 0 0 1 -0.75 0.75 H 3.75 a 0.75 0.75 0 0 1 -0.75 -0.75 V 13.5 a 0.75 0.75 0 0 1 1.5 0 v 5.25 H 19.5 V 13.5 a 0.75 0.75 0 0 1 1.5 0 Z m -9.5306 0.5306 a 0.75 0.75 0 0 0 1.0613 0 l 3.75 -3.75 a 0.75 0.75 0 0 0 -1.0613 -1.0613 L 12.75 11.6897 V 3 a 0.75 0.75 0 0 0 -1.5 0 v 8.6897 L 8.7806 9.2194 a 0.75 0.75 0 0 0 -1.0613 1.0613 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'DownloadSimpleIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
