<template>
  <IconSVG v-bind="$props">
    <path
      d="M 3 6 a 0.75 0.75 0 0 1 0.75 -0.75 H 20.25 a 0.75 0.75 0 0 1 0 1.5 H 3.75 A 0.75 0.75 0 0 1 3 6 Z m 0.75 6.75 H 20.25 a 0.75 0.75 0 0 0 0 -1.5 H 3.75 a 0.75 0.75 0 0 0 0 1.5 Z m 9.75 4.5 H 3.75 a 0.75 0.75 0 0 0 0 1.5 H 13.5 a 0.75 0.75 0 0 0 0 -1.5 Z m 8.25 0 H 20.25 V 15.75 a 0.75 0.75 0 0 0 -1.5 0 v 1.5 H 17.25 a 0.75 0.75 0 0 0 0 1.5 h 1.5 v 1.5 a 0.75 0.75 0 0 0 1.5 0 V 18.75 h 1.5 a 0.75 0.75 0 0 0 0 -1.5 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'ListPlusIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
