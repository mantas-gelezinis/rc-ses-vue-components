<template>
  <IconSVG v-bind="$props">
    <path
      d="M 18.75 10.5 a 0.75 0.75 0 0 1 -0.75 0.75 H 14.25 a 0.75 0.75 0 0 1 0 -1.5 h 3.75 A 0.75 0.75 0 0 1 18.75 10.5 Z m -0.75 2.25 H 14.25 a 0.75 0.75 0 0 0 0 1.5 h 3.75 a 0.75 0.75 0 0 0 0 -1.5 Z m 3.75 -7.5 V 18.75 a 1.5 1.5 0 0 1 -1.5 1.5 H 3.75 a 1.5 1.5 0 0 1 -1.5 -1.5 V 5.25 A 1.5 1.5 0 0 1 3.75 3.75 H 20.25 A 1.5 1.5 0 0 1 21.75 5.25 Z M 20.25 18.75 V 5.25 H 3.75 V 18.75 H 20.25 Z m -7.5244 -3.1875 a 0.75 0.75 0 1 1 -1.4531 0.375 c -0.2466 -0.9619 -1.2244 -1.6875 -2.2734 -1.6875 s -2.0259 0.7256 -2.2734 1.6875 a 0.75 0.75 0 1 1 -1.4531 -0.375 3.735 3.735 0 0 1 1.6116 -2.1881 3 3 0 1 1 4.23 0 A 3.7275 3.7275 0 0 1 12.7266 15.5625 Z M 9 12.75 a 1.5 1.5 0 1 0 -1.5 -1.5 A 1.5 1.5 0 0 0 9 12.75 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'IdentificationCardIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
