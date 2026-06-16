<template>
  <IconSVG v-bind="$props">
    <path
      d="M 17.25 3 H 6.75 A 1.5 1.5 0 0 0 5.25 4.5 V 21 a 0.75 0.75 0 0 0 1.1475 0.6356 L 12 18.1341 l 5.6034 3.5016 A 0.75 0.75 0 0 0 18.75 21 V 4.5 A 1.5 1.5 0 0 0 17.25 3 Z m 0 1.5 V 15.1472 l -4.8534 -3.0328 a 0.75 0.75 0 0 0 -0.795 0 L 6.75 15.1463 V 4.5 Z M 12.3966 16.6144 a 0.75 0.75 0 0 0 -0.795 0 L 6.75 19.6472 V 16.9153 l 5.25 -3.2813 5.25 3.2813 v 2.7319 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'BookmarkIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
