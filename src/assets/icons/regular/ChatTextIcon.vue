<template>
  <IconSVG v-bind="$props">
    <path
      d="M 20.25 4.5 H 3.75 A 1.5 1.5 0 0 0 2.25 6 V 21 a 1.4859 1.4859 0 0 0 0.8662 1.3594 A 1.5122 1.5122 0 0 0 3.75 22.5 a 1.4897 1.4897 0 0 0 0.9609 -0.3544 l 0.0084 -0.0066 L 7.7813 19.5 H 20.25 a 1.5 1.5 0 0 0 1.5 -1.5 V 6 A 1.5 1.5 0 0 0 20.25 4.5 Z M 3.75 21 h 0 Z M 20.25 18 H 7.5 a 0.75 0.75 0 0 0 -0.4903 0.1828 L 3.75 21 V 6 H 20.25 Z M 8.25 10.5 a 0.75 0.75 0 0 1 0.75 -0.75 h 6 a 0.75 0.75 0 0 1 0 1.5 H 9 A 0.75 0.75 0 0 1 8.25 10.5 Z m 0 3 a 0.75 0.75 0 0 1 0.75 -0.75 h 6 a 0.75 0.75 0 1 1 0 1.5 H 9 A 0.75 0.75 0 0 1 8.25 13.5 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'ChatTextIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
