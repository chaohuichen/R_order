import React, { useState } from 'react'
// import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'
// import { HandleError } from './components'
import { Appearance, StatusBar } from 'react-native'
import BottomTabNavigator from './navigation/BottomTabNavigator'
import AppLoading from 'expo-app-loading'
import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import NavigationTheme from './constants/NavigationTheme'
import {
  HeaderShownNone,
  MyScreenOption,
  HeaderTitleOnly,
  HeaderShownTrue,
} from './navigation/HeaderOptions'
import HomePage from './screens/Home/HomePage'
import { connect } from 'react-redux'
import SignUpPage from './screens/SignUp/SignUpPage'
import PhoneVerificationPage from './auth/PhoneVerificationPage'
import SignInPage from './screens/SignIn/SignInPage'
const Stack = createStackNavigator()

const AppStart = (props) => {
  const [isLoadingComplete, setLoadingComplete] = useState(false)
  const [styleStatusBar, setStyleStatusBar] = useState('default')
  const { user } = props
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
      <NativeBaseProvider>
        <StatusBar barStyle={styleStatusBar} />
        <NavigationContainer theme={NavigationTheme}>
          <Stack.Navigator screenOptions={MyScreenOption}>
            {user.uid ? (
              <Stack.Screen
                name="BottomTabNavigator"
                component={BottomTabNavigator}
                options={HeaderShownNone()}
              />
            ) : (
              <>
                <Stack.Screen
                  name="SignInPage"
                  component={SignInPage}
                  options={HeaderShownNone()}
                />
                <Stack.Screen
                  name="SignUpPage"
                  component={SignUpPage}
                  options={HeaderShownTrue('')}
                />
                <Stack.Screen
                  name="PhoneVerificationPage"
                  component={PhoneVerificationPage}
                  options={HeaderShownTrue('')}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapState, null)(AppStart)
