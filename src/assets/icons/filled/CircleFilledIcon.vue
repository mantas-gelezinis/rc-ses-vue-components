<template>
  <IconSVG v-bind="$props" viewBox="0 0 256 256">
    <path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z" />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'CircleFilledIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
