import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { tabOptions } from './tabOptions'
import OrderHomeScreen from '../screens/Orders/OrderHomeScreen'
import OrderHistoryScreen from '../screens/OrdersHistory/OrderHistoryScreen'
import { connect } from 'react-redux'
import AddSupplyPageScreen from '../screens/AddSupply/AddSupplyPageScreen'
import BottomTabRoot from './BottomTabRoot'
const BottomTab = createBottomTabNavigator()
// TODO add Auth Stack Container
const Stack = createStackNavigator()
import { createStackNavigator } from '@react-navigation/stack'
import { DarkTheme, NavigationContainer } from '@react-navigation/native'

import OrderPage from '../screens/Orders/OrderHomePage'
import OrderHistoryPage from '../screens/OrdersHistory/OrderHistoryPage'
import ConfirmationPage from '../screens/Confirm/ConfirmationPage'
import AddSupplyPage from '../screens/AddSupply/AddSupplyPage'
import UserProfileHomePage from '../screens/UserProfile/UserProfileHomePage'
import PdfViewer from '../screens/PdfViewer/PdfView'
import { HeaderTitleOnly } from './HeaderOptions'

const BottomTabNavigator = (props) => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator
        initialRouteName="OrderHomeScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* <Stack.Screen
          name="BottomTabRoot"
          component={BottomTabRoot}
          options={tabOptions('shopping-cart', 'Orders', 'Feather')}
        /> */}
        <Stack.Screen
          name="OrderHomeScreen"
          component={OrderHomeScreen}
          options={tabOptions('shopping-cart', 'Orders', 'Feather')}
        />
        {/* {props.user.userType === 'supplier' && (
        <Stack.Screen
          name="AddSupplyPageScreen"
          component={AddSupplyPageScreen}
          options={tabOptions('ios-add', 'Add Supply', 'Ionicons')}
        />
      )} */}
        <Stack.Screen
          name="OrderHistoryScreen"
          component={OrderHistoryScreen}
          options={tabOptions(
            'history',
            'Order History',
            'MaterialCommunityIcons'
          )}
        />
        <Stack.Screen
          name="OrderHistoryPage"
          component={OrderHistoryPage}
          options={HeaderTitleOnly('Order Invoices')}
        />
        <Stack.Screen
          name="AddSupplyPage"
          component={AddSupplyPage}
          options={HeaderTitleOnly('Flor De Mayo Supply')}
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
        <Stack.Screen
          name="PdfView"
          component={PdfViewer}
          options={HeaderTitleOnly('PDF View')}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const mapState = (state) => {
  // console.log('state ', state.user)
  return {
    user: state.user,
  }
}
export default connect(mapState, null)(BottomTabNavigator)
