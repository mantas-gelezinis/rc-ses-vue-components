import type { ComputedRef, InjectionKey, Ref } from 'vue'

export type RadioGroupValue = string | number | boolean | null

export type RadioGroupV2Context = {
  model: Ref<RadioGroupValue>
  disabled: ComputedRef<boolean>
  hasError: ComputedRef<boolean>
  select: (value: string | number | boolean) => void
}

export const radioGroupV2Key: InjectionKey<RadioGroupV2Context> =
  Symbol('RcSesRadioGroupV2')
