<template>
  <IconSVG v-bind="$props">
    <path
      d="M 16.5 15 a 3.7397 3.7397 0 0 0 -2.6831 1.1334 l -4.3219 -2.7778 a 3.7312 3.7312 0 0 0 0 -2.7113 l 4.3219 -2.7778 a 3.75 3.75 0 1 0 -0.8119 -1.2609 l -4.3219 2.7778 a 3.75 3.75 0 1 0 0 5.2331 l 4.3219 2.7778 A 3.75 3.75 0 1 0 16.5 15 Z m 0 -12 a 2.25 2.25 0 1 1 -2.25 2.25 A 2.25 2.25 0 0 1 16.5 3 Z M 6 14.25 a 2.25 2.25 0 1 1 2.25 -2.25 A 2.25 2.25 0 0 1 6 14.25 Z m 10.5 6.75 a 2.25 2.25 0 1 1 2.25 -2.25 A 2.25 2.25 0 0 1 16.5 21 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'ShareNetworkIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
