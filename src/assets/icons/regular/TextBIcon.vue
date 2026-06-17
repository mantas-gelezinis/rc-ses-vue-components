<template>
  <IconSVG v-bind="$props">
    <path
      d="M 16.7325 10.8469 A 4.125 4.125 0 0 0 13.875 3.75 H 7.5 a 0.75 0.75 0 0 0 -0.75 0.75 V 18.75 a 0.75 0.75 0 0 0 0.75 0.75 h 7.5 a 4.5 4.5 0 0 0 1.7325 -8.6531 Z M 8.25 5.25 h 5.625 a 2.625 2.625 0 0 1 0 5.25 H 8.25 Z m 6.75 12.75 H 8.25 V 12 h 6.75 a 3 3 0 0 1 0 6 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'TextBIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
