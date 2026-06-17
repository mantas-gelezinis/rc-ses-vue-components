<template>
  <IconSVG v-bind="$props">
    <path
      d="M 4.0088 4.6875 A 0.75 0.75 0 0 0 3.75 5.25 V 21 a 0.75 0.75 0 0 0 1.5 0 V 16.8534 c 2.5116 -1.9838 4.6753 -0.9141 7.1672 0.3197 1.5375 0.7603 3.1931 1.5797 4.9688 1.5797 1.3059 0 2.6756 -0.4453 4.1081 -1.6875 a 0.75 0.75 0 0 0 0.2587 -0.5625 V 5.25 A 0.75 0.75 0 0 0 20.5087 4.6875 c -2.625 2.2716 -4.8487 1.1709 -7.4259 -0.105 C 10.4128 3.2588 7.3856 1.7616 4.0088 4.6875 Z M 20.25 16.1484 c -2.5116 1.9838 -4.6753 0.9131 -7.1672 -0.3197 -2.3438 -1.1578 -4.9509 -2.4497 -7.8328 -0.7875 V 5.6053 c 2.5116 -1.9838 4.6753 -0.9141 7.1672 0.3187 2.3438 1.1578 4.9519 2.4497 7.8328 0.7875 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'FlagIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
