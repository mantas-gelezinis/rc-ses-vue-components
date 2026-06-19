<template>
  <IconSVG v-bind="$props">
    <path
      d="M 20.25 6.75 H 12.3103 L 9.75 4.1897 A 1.4869 1.4869 0 0 0 8.6897 3.75 H 3.75 A 1.5 1.5 0 0 0 2.25 5.25 V 18.8081 A 1.4438 1.4438 0 0 0 3.6919 20.25 H 20.3334 A 1.4184 1.4184 0 0 0 21.75 18.8334 V 8.25 A 1.5 1.5 0 0 0 20.25 6.75 Z M 8.6897 5.25 l 1.5 1.5 H 3.75 V 5.25 Z M 20.25 18.75 H 3.75 V 8.25 H 20.25 Z M 9.75 12.75 h 4.5 a 0.75 0.75 0 0 1 0 1.5 H 9.75 a 0.75 0.75 0 0 1 0 -1.5 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'FolderMinusIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
