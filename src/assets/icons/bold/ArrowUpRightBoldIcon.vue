<template>
  <IconSVG v-bind="$props" viewBox="0 0 256 256">
    <path
      d="M204,64V168a12,12,0,0,1-24,0V93L72.49,200.49a12,12,0,0,1-17-17L163,76H88a12,12,0,0,1,0-24H192A12,12,0,0,1,204,64Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'ArrowUpRightBoldIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
