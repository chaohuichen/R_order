import React, { useState, useRef, useEffect } from 'react'
// import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'
// import { HandleError } from './components'
import { Appearance, StatusBar, StyleSheet, View } from 'react-native'
import AppLoading from 'expo-app-loading'
import { NativeBaseProvider } from 'native-base'
import MainNavigation from './navigation/MainNavigation'
import BottomTabNavigator from './navigation/BottomTabNavigator'
import { connect } from 'react-redux'
import LottieView from 'lottie-react-native'

const AppStart = ({ user }) => {
  const [isLoadingComplete, setLoadingComplete] = useState(false)
  const [styleStatusBar, setStyleStatusBar] = useState('default')
  const [animationLoading, setAnimationLoading] = useState(true)
  // Load any resources or data that we need prior to rendering the app
  // React.useEffect(() => {
  const animation = useRef(null)
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
  const onPress = () => {
    animation.current.play()
  }
  useEffect(() => {
    if (isLoadingComplete) {
      animation.current.play()
      setTimeout(() => {
        setAnimationLoading(false)
      }, 4000)
    }
  }, [isLoadingComplete])
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
  if (isLoadingComplete && animationLoading) {
    return (
      <View style={styles.animationContainer}>
        <LottieView
          ref={animation}
          style={{
            width: '90%',
            height: '100%',
            backgroundColor: '#eee',
          }}
          source={require('./assets/FDM.json')}
          loop={false}
          // OR find more Lottie files @ https://lottiefiles.com/featured
          // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        />
        {/* <View style={styles.buttonContainer}>
        <Button title="Restart Animation" onPress={this.resetAnimation} />
      </View> */}
      </View>
    )
  }

  return (
    <NativeBaseProvider>
      <StatusBar barStyle={'light-content'} />
      {user.name !== undefined ? <BottomTabNavigator /> : <MainNavigation />}
    </NativeBaseProvider>
  )
}
const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
})
const mapState = (state) => {
  return {
    user: state.user,
  }
}
export default connect(mapState, null)(AppStart)
