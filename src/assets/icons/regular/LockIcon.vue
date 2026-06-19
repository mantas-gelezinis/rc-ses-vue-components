<template>
  <IconSVG v-bind="$props">
    <path
      d="M 19.5 7.5 H 16.5 V 5.25 a 4.5 4.5 0 0 0 -9 0 V 7.5 H 4.5 A 1.5 1.5 0 0 0 3 9 V 19.5 a 1.5 1.5 0 0 0 1.5 1.5 H 19.5 a 1.5 1.5 0 0 0 1.5 -1.5 V 9 A 1.5 1.5 0 0 0 19.5 7.5 Z M 9 5.25 a 3 3 0 0 1 6 0 V 7.5 H 9 Z M 19.5 19.5 H 4.5 V 9 H 19.5 V 19.5 Z m -6.375 -5.25 a 1.125 1.125 0 1 1 -1.125 -1.125 A 1.125 1.125 0 0 1 13.125 14.25 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'LockIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
