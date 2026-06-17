<template>
  <IconSVG v-bind="$props">
    <path
      d="M 21 12 a 0.75 0.75 0 0 1 -0.75 0.75 H 12 a 0.75 0.75 0 0 1 0 -1.5 h 8.25 A 0.75 0.75 0 0 1 21 12 Z M 12 6.75 h 8.25 a 0.75 0.75 0 0 0 0 -1.5 H 12 a 0.75 0.75 0 0 0 0 1.5 Z m 8.25 10.5 H 12 a 0.75 0.75 0 0 0 0 1.5 h 8.25 a 0.75 0.75 0 0 0 0 -1.5 Z M 7.7194 3.9694 5.25 6.4397 4.2806 5.4694 A 0.75 0.75 0 0 0 3.2194 6.5306 l 1.5 1.5 a 0.75 0.75 0 0 0 1.0613 0 l 3 -3 A 0.75 0.75 0 0 0 7.7194 3.9694 Z m 0 6 L 5.25 12.4397 4.2806 11.4694 a 0.75 0.75 0 0 0 -1.0613 1.0613 l 1.5 1.5 a 0.75 0.75 0 0 0 1.0613 0 l 3 -3 a 0.75 0.75 0 0 0 -1.0613 -1.0613 Z m 0 6 L 5.25 18.4397 4.2806 17.4694 a 0.75 0.75 0 0 0 -1.0613 1.0613 l 1.5 1.5 a 0.75 0.75 0 0 0 1.0613 0 l 3 -3 a 0.75 0.75 0 0 0 -1.0613 -1.0613 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'ListChecksIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
