<template>
  <IconSVG v-bind="$props">
    <path
      d="M 20.2959 11.9541 a 1.125 1.125 0 0 1 0 1.5938 l -7.5 7.5 a 1.125 1.125 0 0 1 -1.5938 0 l -7.5 -7.5 a 1.125 1.125 0 1 1 1.5938 -1.5938 L 12 18.6563 l 6.7041 -6.705 A 1.125 1.125 0 0 1 20.2959 11.9541 Z m -9.0938 1.5938 a 1.125 1.125 0 0 0 1.5938 0 l 7.5 -7.5 a 1.125 1.125 0 0 0 -1.5938 -1.5938 L 12 11.1563 5.2959 4.4541 a 1.125 1.125 0 0 0 -1.5938 1.5938 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'CaretDoubleDownBoldIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
