<template>
  <IconSVG v-bind="$props">
    <path
      d="M 12 16.5 a 4.5047 4.5047 0 0 0 4.5 -4.5 V 6 a 4.5 4.5 0 0 0 -9 0 v 6 A 4.5047 4.5047 0 0 0 12 16.5 Z M 9 6 a 3 3 0 0 1 6 0 v 6 a 3 3 0 0 1 -6 0 Z m 3.75 13.4625 V 22.5 a 0.75 0.75 0 0 1 -1.5 0 V 19.4625 A 7.5103 7.5103 0 0 1 4.5 12 a 0.75 0.75 0 0 1 1.5 0 6 6 0 0 0 12 0 0.75 0.75 0 0 1 1.5 0 A 7.5103 7.5103 0 0 1 12.75 19.4625 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'MicrophoneIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
