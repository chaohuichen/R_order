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
        // Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        // 'inter-regular': require('./assets/fonts/Inter-Regular.otf'),
        // 'inter-italic': require('./assets/fonts/Inter-Italic.otf'),
        // 'inter-bold': require('./assets/fonts/Inter-Bold.ttf')
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
        <StatusBar barStyle={styleStatusBar} />
        <NavigationContainer theme={NavigationTheme}>
          <MainNavigation />
        </NavigationContainer>
      </NativeBaseProvider>
    )
  }
}
