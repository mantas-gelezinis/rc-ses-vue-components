export enum LoaderSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export type LoaderProps = {
  size?: `${LoaderSize}`
  showLabel?: boolean
  label?: string
}
