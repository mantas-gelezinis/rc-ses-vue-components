<template>
  <IconSVG v-bind="$props" viewBox="0 0 256 256">
    <path
      d="M232,128A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'ChatCircleFilledIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
