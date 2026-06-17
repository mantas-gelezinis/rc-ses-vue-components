<template>
  <IconSVG v-bind="$props">
    <path
      d="M 13.2806 12.5306 l -7.5 7.5 a 0.75 0.75 0 0 1 -1.0613 -1.0613 L 11.6897 12 4.7194 5.0306 A 0.75 0.75 0 0 1 5.7806 3.9694 l 7.5 7.5 A 0.75 0.75 0 0 1 13.2806 12.5306 Z m 7.5 -1.0613 -7.5 -7.5 a 0.75 0.75 0 0 0 -1.0613 1.0613 L 19.1897 12 l -6.9703 6.9694 a 0.75 0.75 0 0 0 1.0613 1.0613 l 7.5 -7.5 A 0.75 0.75 0 0 0 20.7806 11.4694 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'CaretDoubleRightIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
