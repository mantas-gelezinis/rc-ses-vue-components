import { ThemeDefinition } from 'vuetify'

import Colors from './colors'
import ColorsV2 from './colorsV2'

export const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    ...Colors.primary,
    ...Colors.secondary,
    ...Colors.warning,
    ...Colors.error,
    ...Colors.grey,
    ...Colors.success,
    ...Colors.info,
    ...ColorsV2,
    background: '#ffffff',
  },
  variables: {},
}

export const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#d35400',
    secondary: '#8e44ad',
    background: '#2f3640',
    error: '#c0392b',
    info: '#2980b9',
    success: '#27ae60',
    warning: '#f1c40f',
  },
}
