<template>
  <IconSVG v-bind="$props" viewBox="0 0 256 256">
    <path d="M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128Z" />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'MinusBoldIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
