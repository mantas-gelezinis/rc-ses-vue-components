<template>
  <IconSVG v-bind="$props">
    <path
      d="M 21 12 a 0.75 0.75 0 0 1 -0.75 0.75 H 10.5 a 0.75 0.75 0 0 1 0 -1.5 H 20.25 A 0.75 0.75 0 0 1 21 12 Z M 10.5 6.75 H 20.25 a 0.75 0.75 0 0 0 0 -1.5 H 10.5 a 0.75 0.75 0 0 0 0 1.5 Z M 20.25 17.25 H 3.75 a 0.75 0.75 0 0 0 0 1.5 H 20.25 a 0.75 0.75 0 0 0 0 -1.5 Z M 6.75 13.5 a 0.75 0.75 0 0 0 0.5306 -1.2806 L 4.0603 9 7.2806 5.7806 A 0.75 0.75 0 0 0 6.2194 4.7194 l -3.75 3.75 a 0.75 0.75 0 0 0 0 1.0613 l 3.75 3.75 A 0.75 0.75 0 0 0 6.75 13.5 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'TextOutdentIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
