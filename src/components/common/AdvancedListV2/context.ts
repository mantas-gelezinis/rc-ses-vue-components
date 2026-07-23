import type { ComputedRef, InjectionKey } from 'vue'

export type AdvancedListV2Context = {
  isListbox: ComputedRef<boolean>
}

export const advancedListV2Key: InjectionKey<AdvancedListV2Context> =
  Symbol('RcSesAdvancedListV2')
