<template>
  <IconSVG v-bind="$props">
    <path
      d="M 21.75 11.625 A 9.3853 9.3853 0 0 1 12.375 21 H 4.5 a 1.5 1.5 0 0 1 -1.5 -1.5 V 11.625 a 9.375 9.375 0 0 1 18.75 0 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'ChatTeardropFilledIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
