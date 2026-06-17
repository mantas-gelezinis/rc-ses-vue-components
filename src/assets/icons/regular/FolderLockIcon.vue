<template>
  <IconSVG v-bind="$props">
    <path
      d="M 21 15 h -0.75 v -0.375 a 2.625 2.625 0 0 0 -5.25 0 v 0.375 h -0.75 a 0.75 0.75 0 0 0 -0.75 0.75 v 3.75 a 0.75 0.75 0 0 0 0.75 0.75 h 6.75 a 0.75 0.75 0 0 0 0.75 -0.75 V 15.75 A 0.75 0.75 0 0 0 21 15 Z m -4.5 -0.375 a 1.125 1.125 0 0 1 2.25 0 v 0.375 H 16.5 Z m 3.75 4.125 H 15 V 16.5 h 5.25 Z m 0 -12 H 12.3103 L 9.75 4.1897 A 1.4869 1.4869 0 0 0 8.6897 3.75 H 3.75 A 1.5 1.5 0 0 0 2.25 5.25 V 18.8081 A 1.4438 1.4438 0 0 0 3.6919 20.25 h 6.8606 a 0.75 0.75 0 0 0 0 -1.5 H 3.75 V 8.25 H 20.25 v 1.5 a 0.75 0.75 0 0 0 1.5 0 V 8.25 A 1.5 1.5 0 0 0 20.25 6.75 Z M 8.6897 5.25 l 1.5 1.5 H 3.75 V 5.25 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'FolderLockIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
