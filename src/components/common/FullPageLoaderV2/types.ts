export enum FullPageLoaderBackdrop {
  Dark = 'dark',
  Light = 'light',
}

export type FullPageLoaderProps = {
  backdrop?: `${FullPageLoaderBackdrop}`
  showLabel?: boolean
  label?: string
  modelValue?: boolean
  contained?: boolean
}
