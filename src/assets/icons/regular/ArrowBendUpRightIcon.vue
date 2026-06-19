<template>
  <IconSVG v-bind="$props">
    <path
      d="M 21.5306 10.2806 l -4.5 4.5 a 0.75 0.75 0 0 1 -1.0613 -1.0613 L 19.1897 10.5 H 12 a 8.2594 8.2594 0 0 0 -8.25 8.25 0.75 0.75 0 0 1 -1.5 0 A 9.7603 9.7603 0 0 1 12 9 h 7.1897 L 15.9694 5.7806 a 0.75 0.75 0 0 1 1.0613 -1.0613 l 4.5 4.5 A 0.75 0.75 0 0 1 21.5306 10.2806 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'ArrowBendUpRightIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
