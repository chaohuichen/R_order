import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import SignInPage from '../screens/SignIn/SignInPage'
import SignUpPage from '../screens/SignUp/SignUpPage'
import SignInSelectionPage from '../screens/SignIn/SignInSelectionPage'
import { createStackNavigator } from '@react-navigation/stack'
import PhoneVerificationPage from '../auth/PhoneVerificationPage'
import { HeaderShownNone, HeaderShownTrue } from './HeaderOptions'
import BottomTabNavigator from './BottomTabNavigator'
import {
  DefaultTheme,
  DarkTheme,
  NavigationContainer,
} from '@react-navigation/native'
const Stack = createStackNavigator()

const MainNavigation = (props) => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="SignInSelectionPage"
          component={SignInSelectionPage}
          options={HeaderShownNone()}
        />
        <Stack.Screen
          name="SignInPage"
          component={SignInPage}
          options={HeaderShownTrue('')}
        />
        {/* <Stack.Screen
          name="SignUpPage"
          component={SignUpPage}
          options={HeaderShownTrue('')}
        />
        <Stack.Screen
          name="PhoneVerificationPage"
          component={PhoneVerificationPage}
          options={HeaderShownTrue('')}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const mapState = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapState, null)(MainNavigation)
