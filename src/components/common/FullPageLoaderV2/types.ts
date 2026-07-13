export enum FullPageLoaderBackdrop {
  Dark = 'dark',
  Light = 'light',
}

export type FullPageLoaderProps = {
  backdrop?: `${FullPageLoaderBackdrop}`
  showLabel?: boolean
  label?: string
  /** Controls overlay visibility. Use with `v-model`. */
  modelValue?: boolean
  contained?: boolean
}
