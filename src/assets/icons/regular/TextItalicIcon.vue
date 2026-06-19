<template>
  <IconSVG v-bind="$props">
    <path
      d="M 18.75 5.25 a 0.75 0.75 0 0 1 -0.75 0.75 H 14.7909 L 10.7906 18 H 13.5 a 0.75 0.75 0 0 1 0 1.5 H 6 a 0.75 0.75 0 0 1 0 -1.5 H 9.2091 L 13.2094 6 H 10.5 a 0.75 0.75 0 0 1 0 -1.5 h 7.5 A 0.75 0.75 0 0 1 18.75 5.25 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'TextItalicIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
