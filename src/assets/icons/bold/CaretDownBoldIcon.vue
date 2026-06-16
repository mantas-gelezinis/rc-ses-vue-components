<template>
  <IconSVG v-bind="$props" viewBox="0 0 256 256">
    <path
      d="M216.49,104.49l-80,80a12,12,0,0,1-17,0l-80-80a12,12,0,0,1,17-17L128,159l71.51-71.52a12,12,0,0,1,17,17Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'CaretDownBoldIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
