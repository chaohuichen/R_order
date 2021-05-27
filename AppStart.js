import React, { useState } from 'react'
// import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'
// import { HandleError } from './components'
import { Appearance, StatusBar } from 'react-native'
import BottomTabNavigator from './navigation/BottomTabNavigator'
import AppLoading from 'expo-app-loading'
import OrderHomeScreen from './screens/Orders/OrderHomeScreen'

const AppStart = (props) => {
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
        onError={(error) => HandleError(error)}
      />
    )
  } else {
    return (
      <>
        <StatusBar barStyle={styleStatusBar} />
        <BottomTabNavigator />
      </>
    )
  }
}

export default AppStart
