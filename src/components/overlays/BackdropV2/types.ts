import type { VOverlay } from 'vuetify/components'

export interface BackdropProps {
  modelValue?: boolean

  // Extended VOverlay props for Vuetify parity
  absolute?: VOverlay['$props']['absolute']
  attach?: VOverlay['$props']['attach']
  contained?: VOverlay['$props']['contained']
  contentClass?: VOverlay['$props']['contentClass']
  contentProps?: VOverlay['$props']['contentProps']
  disabled?: VOverlay['$props']['disabled']
  eager?: VOverlay['$props']['eager']
  opacity?: VOverlay['$props']['opacity']
  persistent?: VOverlay['$props']['persistent']
  scrim?: VOverlay['$props']['scrim']
  zIndex?: VOverlay['$props']['zIndex']
}
