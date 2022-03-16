import React, { useState } from 'react'
// import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'
// import { HandleError } from './components'
import { Appearance, StatusBar } from 'react-native'
import AppLoading from 'expo-app-loading'
import { NativeBaseProvider } from 'native-base'
import MainNavigation from './navigation/MainNavigation'
import BottomTabNavigator from './navigation/BottomTabNavigator'
import { connect } from 'react-redux'

const AppStart = ({ user }) => {
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
  }
  return (
    <NativeBaseProvider>
      <StatusBar barStyle={'light-content'} />
      {user.name !== undefined ? <BottomTabNavigator /> : <MainNavigation />}
    </NativeBaseProvider>
  )
}

const mapState = (state) => {
  return {
    user: state.user,
  }
}
export default connect(mapState, null)(AppStart)
