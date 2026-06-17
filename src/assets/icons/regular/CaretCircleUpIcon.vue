<template>
  <IconSVG v-bind="$props">
    <path
      d="M 12 2.25 A 9.75 9.75 0 1 0 21.75 12 9.7603 9.7603 0 0 0 12 2.25 Z m 0 18 a 8.25 8.25 0 1 1 8.25 -8.25 A 8.2594 8.2594 0 0 1 12 20.25 Z m 4.2806 -7.2806 a 0.75 0.75 0 0 1 -1.0613 1.0613 L 12 10.8103 8.7806 14.0306 a 0.75 0.75 0 0 1 -1.0613 -1.0613 l 3.75 -3.75 a 0.75 0.75 0 0 1 1.0613 0 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'CaretCircleUpIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
