import React from 'react'
import { Alert } from 'react-native'
import MainColors from '../constants/MainColors'
import { CardStyleInterpolators } from '@react-navigation/stack'
import AppIcons from '../components/AppIcons'
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
// removeUser={props.removeUserData}

export const HeaderTitleAndIcon = (title, props) => {
  return {
    title,
    headerTitleStyle: {
      fontSize: 25,
      fontFamily: 'Arial-BoldMT',
      color: 'black',
    },
    headerRight: () => (
      <AppIcons
        type="FontAwesome"
        name="user-circle-o"
        size={30}
        color="black"
        style={{ marginRight: 20 }}
        onPress={() => {
          Alert.alert('Logging Out?', 'Press ok to logout', [{ text: 'OK' }])
        }}
      />
    ),
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
export const HeaderShownTrue = () => {
  return {
    title: '',
    headerBackTitleVisible: false,
    headerTransparent: true,
    // headerStyle: { backgroundColor: 'transparent', position: 'absolute' },
    headerTintColor: 'black',
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
