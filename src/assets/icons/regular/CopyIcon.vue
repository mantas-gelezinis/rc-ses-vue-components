<template>
  <IconSVG v-bind="$props">
    <path
      d="M 20.25 3 H 8.25 a 0.75 0.75 0 0 0 -0.75 0.75 V 7.5 H 3.75 a 0.75 0.75 0 0 0 -0.75 0.75 V 20.25 a 0.75 0.75 0 0 0 0.75 0.75 H 15.75 a 0.75 0.75 0 0 0 0.75 -0.75 V 16.5 h 3.75 a 0.75 0.75 0 0 0 0.75 -0.75 V 3.75 A 0.75 0.75 0 0 0 20.25 3 Z M 15 19.5 H 4.5 V 9 H 15 Z m 4.5 -4.5 H 16.5 V 8.25 a 0.75 0.75 0 0 0 -0.75 -0.75 H 9 V 4.5 H 19.5 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'CopyIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
