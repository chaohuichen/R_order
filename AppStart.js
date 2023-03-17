import React, { useState, useCallback, useEffect } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { Appearance, StatusBar, View } from 'react-native'
import { NativeBaseProvider } from 'native-base'
import BottomTabNavigator from './navigation/BottomTabNavigator'
import { connect } from 'react-redux'

const AppStart = () => {
  const [isLoadingComplete, setLoadingComplete] = useState(false)
  const [styleStatusBar, setStyleStatusBar] = useState('default')
  // Load any resources or data that we need prior to rendering the app
  // React.useEffect(() => {
  const onLayoutRootView = useCallback(async () => {
    if (isLoadingComplete) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.

      await SplashScreen.hideAsync()
    }
  }, [isLoadingComplete])
  useEffect(() => {
    loadResourcesAndDataAsync()
  }, [])
  async function loadResourcesAndDataAsync() {
    try {
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
      return new Promise((resolve) => setTimeout(resolve, 500))
    } catch (err) {
      console.log(err)
    } finally {
      // Tell the application to render
      setLoadingComplete(true)
    }
  }

  if (!isLoadingComplete) {
    return null
  }

  return (
    <NativeBaseProvider>
      <View
        style={{
          flexGrow: 1,
        }}
        onLayout={onLayoutRootView}
      >
        <StatusBar barStyle={'light-content'} />
        <BottomTabNavigator />
      </View>
    </NativeBaseProvider>
  )
}

const mapState = (state) => {
  return {
    user: state.user,
  }
}
export default connect(mapState, null)(AppStart)
