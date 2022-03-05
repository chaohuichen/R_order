import React from 'react'
import { connect } from 'react-redux'
import SignInPage from '../screens/SignIn/SignInPage'
import SignUpPage from '../screens/SignUp/SignUpPage'
import SignInSelectionPage from '../screens/SignIn/SignInSelectionPage'
import { createStackNavigator } from '@react-navigation/stack'
import PhoneVerificationPage from '../auth/PhoneVerificationPage'
import { HeaderShownNone, HeaderShownTrue } from './HeaderOptions'
import BottomTabNavigator from './BottomTabNavigator'
const Stack = createStackNavigator()
const MainNavigation = (props) => {
  const { user } = props

  return (
    <Stack.Navigator>
      {user.uid ? (
        <Stack.Group>
          <Stack.Screen
            name="BottomTabNavigator"
            component={BottomTabNavigator}
            options={HeaderShownNone()}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
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
        </Stack.Group>
      )}
    </Stack.Navigator>
  )
}

const mapState = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapState, null)(MainNavigation)
