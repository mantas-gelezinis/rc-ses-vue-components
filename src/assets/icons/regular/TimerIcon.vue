<template>
  <IconSVG v-bind="$props">
    <path
      d="M 12 3.75 a 9 9 0 1 0 9 9 A 9.0103 9.0103 0 0 0 12 3.75 Z m 0 16.5 a 7.5 7.5 0 1 1 7.5 -7.5 A 7.5084 7.5084 0 0 1 12 20.25 Z M 16.2806 8.4694 a 0.75 0.75 0 0 1 0 1.0613 l -3.75 3.75 a 0.75 0.75 0 0 1 -1.0613 -1.0613 l 3.75 -3.75 A 0.75 0.75 0 0 1 16.2806 8.4694 Z M 9 1.5 a 0.75 0.75 0 0 1 0.75 -0.75 h 4.5 a 0.75 0.75 0 0 1 0 1.5 H 9.75 A 0.75 0.75 0 0 1 9 1.5 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'TimerIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
