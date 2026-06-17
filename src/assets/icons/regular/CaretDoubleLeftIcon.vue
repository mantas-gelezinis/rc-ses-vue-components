<template>
  <IconSVG v-bind="$props">
    <path
      d="M 19.2806 18.9694 a 0.75 0.75 0 0 1 -1.0613 1.0613 l -7.5 -7.5 a 0.75 0.75 0 0 1 0 -1.0613 l 7.5 -7.5 a 0.75 0.75 0 0 1 1.0613 1.0613 L 12.3103 12 Z M 4.8103 12 l 6.9703 -6.9694 a 0.75 0.75 0 0 0 -1.0613 -1.0613 l -7.5 7.5 a 0.75 0.75 0 0 0 0 1.0613 l 7.5 7.5 a 0.75 0.75 0 0 0 1.0613 -1.0613 Z"
    />
  </IconSVG>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSVG from '../IconSVG.vue'
import useIconProps from '../useIconProps'

export default defineComponent({
  name: 'CaretDoubleLeftIcon',
  components: { IconSVG },
  props: useIconProps,
})
</script>
