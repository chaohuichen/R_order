import React, { useState } from 'react'
// import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'
// import { HandleError } from './components'
import { Appearance, StatusBar } from 'react-native'
import AppLoading from 'expo-app-loading'
import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import NavigationTheme from './constants/NavigationTheme'
import MainNavigation from './navigation/MainNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DefaultTheme, DarkTheme } from '@react-navigation/native'

export default () => {
  const [isLoadingComplete, setLoadingComplete] = useState(false)
  const [styleStatusBar, setStyleStatusBar] = useState('default')
  // Load any resources or data that we need prior to rendering the app
  // React.useEffect(() => {
  async function loadResourcesAndDataAsync() {
    // Load fonts
    await Promise.all([
      Font.loadAsync({
        ...Ionicons.font,
        ...FontAwesome5.font,

        'CrimsonText-Bold': require('./assets/fonts/CrimsonText-Bold.ttf'),
        'CrimsonText-BoldItalic': require('./assets/fonts/CrimsonText-BoldItalic.ttf'),
      }),
    ])
    const colorScheme = Appearance.getColorScheme()

    if (colorScheme === 'dark') {
      setStyleStatusBar('dark-content')
    }
  }

  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={loadResourcesAndDataAsync}
        onFinish={() => {
          setLoadingComplete(true)
          //  SplashScreen.hideAsync()
        }}
        onError={(error) => console.log(error)}
      />
    )
  } else {
    return (
      <NativeBaseProvider>
        <StatusBar barStyle={'light-content'} />
        <NavigationContainer theme={DarkTheme}>
          <MainNavigation />
        </NavigationContainer>
      </NativeBaseProvider>
    )
  }
}
