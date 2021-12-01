import { DefaultTheme } from '@react-navigation/native'
import { background } from 'styled-system'
import MainColors from './MainColors'

export default {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    // primary: MainColors.primary,
    primary: 'rgb(255, 45, 85)',
  },
}
