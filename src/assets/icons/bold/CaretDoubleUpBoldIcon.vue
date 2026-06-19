<template>
  <IconSVG v-bind="$props">
    <path
      d="M 20.2959 17.9541 a 1.125 1.125 0 0 1 -1.5938 1.5938 L 12 12.8438 5.2959 19.5459 a 1.125 1.125 0 0 1 -1.5938 -1.5938 l 7.5 -7.5 a 1.125 1.125 0 0 1 1.5938 0 Z m -15 -5.9063 L 12 5.3438 l 6.7041 6.705 a 1.125 1.125 0 0 0 1.5938 -1.5938 l -7.5 -7.5 a 1.125 1.125 0 0 0 -1.5938 0 l -7.5 7.5 a 1.125 1.125 0 0 0 1.5938 1.5938 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'CaretDoubleUpBoldIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
