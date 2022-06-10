import React from 'react'
import { tabOptions } from './tabOptions'
import OrderHomeScreen from '../screens/Orders/OrderHomeScreen'
import { connect } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import { DarkTheme, NavigationContainer } from '@react-navigation/native'
import ConfirmationPage from '../screens/Confirm/ConfirmationPage'
import UserProfileHomePage from '../screens/UserProfile/UserProfileHomePage'
import OrderSuccessPage from '../screens/OrderSuccess/OrderSuccessPage'
import { HeaderTitleOnly } from './HeaderOptions'
// TODO add Auth Stack Container
const Stack = createStackNavigator()

const BottomTabNavigator = (props) => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator
        initialRouteName="OrderHomeScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="OrderHomeScreen"
          component={OrderHomeScreen}
          options={tabOptions('shopping-cart', 'Orders', 'Feather')}
        />
        <Stack.Screen
          name="OrderSuccessPage"
          component={OrderSuccessPage}
          options={tabOptions('shopping-cart', 'Orders', 'Feather')}
        />
        <Stack.Screen
          name="ConfirmationPage"
          component={ConfirmationPage}
          options={HeaderTitleOnly('Invoice')}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfileHomePage}
          options={HeaderTitleOnly('Profile')}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const mapState = (state) => {
  return {
    user: state.user,
  }
}
export default connect(mapState, null)(BottomTabNavigator)
