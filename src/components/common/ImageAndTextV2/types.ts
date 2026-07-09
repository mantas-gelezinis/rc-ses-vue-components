export interface ButtonConfig {
  label: string
  icon?: string
  disabled?: boolean
}

export type ImageAndTextProps = {
  icon?: string
  title: string
  description?: string
  background?: boolean
  action?: ButtonConfig
}
