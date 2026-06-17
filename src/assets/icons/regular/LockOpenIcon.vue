<template>
  <IconSVG v-bind="$props">
    <path
      d="M 19.5 7.5 H 9 V 5.25 a 3 3 0 0 1 3 -3 c 1.4409 0 2.7375 1.0313 3.015 2.3991 a 0.75 0.75 0 0 0 1.47 -0.2981 C 16.0613 2.2641 14.175 0.75 12 0.75 A 4.5047 4.5047 0 0 0 7.5 5.25 V 7.5 H 4.5 A 1.5 1.5 0 0 0 3 9 V 19.5 a 1.5 1.5 0 0 0 1.5 1.5 H 19.5 a 1.5 1.5 0 0 0 1.5 -1.5 V 9 A 1.5 1.5 0 0 0 19.5 7.5 Z m 0 12 H 4.5 V 9 H 19.5 V 19.5 Z m -6.375 -5.25 a 1.125 1.125 0 1 1 -1.125 -1.125 A 1.125 1.125 0 0 1 13.125 14.25 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'LockOpenIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
