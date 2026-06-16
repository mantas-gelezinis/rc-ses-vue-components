<template>
  <IconSVG v-bind="$props">
    <path
      d="M 12.375 2.25 A 9.3853 9.3853 0 0 0 3 11.625 v 7.875 a 1.5 1.5 0 0 0 1.5 1.5 h 7.875 a 9.375 9.375 0 0 0 0 -18.75 Z m 0 17.25 H 4.5 V 11.625 a 7.875 7.875 0 1 1 7.875 7.875 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'ChatTeardropIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
