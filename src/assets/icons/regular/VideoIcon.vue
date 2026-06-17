<template>
  <IconSVG v-bind="$props">
    <path
      d="M 15.4162 9.8756 l -4.5 -3 A 0.75 0.75 0 0 0 9.75 7.5 v 6 a 0.75 0.75 0 0 0 1.1663 0.6244 l 4.5 -3 a 0.75 0.75 0 0 0 0 -1.2488 Z M 11.25 12.0984 V 8.9063 l 2.3981 1.5938 Z M 20.25 3.75 H 3.75 A 1.5 1.5 0 0 0 2.25 5.25 V 15.75 a 1.5 1.5 0 0 0 1.5 1.5 H 20.25 a 1.5 1.5 0 0 0 1.5 -1.5 V 5.25 A 1.5 1.5 0 0 0 20.25 3.75 Z m 0 12 H 3.75 V 5.25 H 20.25 V 15.75 Z m 1.5 3.75 a 0.75 0.75 0 0 1 -0.75 0.75 H 3 a 0.75 0.75 0 0 1 0 -1.5 H 21 A 0.75 0.75 0 0 1 21.75 19.5 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'VideoIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
