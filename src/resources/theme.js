import { DefaultTheme } from 'react-native-paper'
import { primaryColor, lightColor, bgColor, darkColor } from './colors'

export default {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: primaryColor,
    background: bgColor
  }
}
