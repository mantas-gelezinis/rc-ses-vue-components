<template>
  <IconSVG v-bind="$props">
    <path
      d="M 18.75 21 a 0.75 0.75 0 0 1 -0.75 0.75 H 6 a 0.75 0.75 0 0 1 0 -1.5 H 18 A 0.75 0.75 0 0 1 18.75 21 Z m -6.75 -2.25 a 6.0066 6.0066 0 0 0 6 -6 V 5.25 a 0.75 0.75 0 0 0 -1.5 0 v 7.5 a 4.5 4.5 0 0 1 -9 0 V 5.25 a 0.75 0.75 0 0 0 -1.5 0 v 7.5 A 6.0066 6.0066 0 0 0 12 18.75 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'TextUnderlineIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
