import MainColors from '../constants/MainColors'
import { CardStyleInterpolators } from '@react-navigation/stack'
export const MyScreenOption = () => ({
  headerTintColor: 'blue',
  headerTitleStyle: { color: MainColors.primary, fontSize: 30 },
})

export const HeaderTitleOnly = (title) => {
  return {
    title,
    headerTitleStyle: {
      fontSize: 25,
      fontFamily: 'Arial-BoldMT',
      color: 'black',
    },

    headerBackTitleVisible: false,
    headerTintColor: MainColors.primary,
  }
}
export const HeaderTitleWithNoBorder = (title) => {
  return {
    title,
    headerTitleStyle: {
      fontSize: 25,
      fontFamily: 'Arial-BoldMT',
      color: 'black',
    },
    headerStyle: {
      shadowColor: 'transparent',
    },
    headerBackTitleVisible: false,
    headerTintColor: MainColors.primary,
  }
}

export const HeaderShownNone = () => {
  return {
    headerShown: false,
  }
}

export const slideUpHeader = (title = '') => {
  return {
    title: title,
    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    headerBackTitle: 'Back',
    headerTintColor: MainColors.primary,
  }
}