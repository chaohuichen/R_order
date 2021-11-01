import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { tabOptions } from './tabOptions'
import OrderHomeScreen from '../screens/Orders/OrderHomeScreen'
import OrderHistoryPage from '../screens/OrdersHistory/OrderHistoryPage'
import { connect } from 'react-redux'
import AddSupplyPageScreen from '../screens/AddSupply/AddSupplyPageScreen'

const BottomTab = createBottomTabNavigator()
// TODO add Auth Stack Container

const BottomTabNavigator = (props) => {
  return (
    <BottomTab.Navigator
      initialRouteName="OrderHomeScreen"
      // tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="OrderHomeScreen"
        component={OrderHomeScreen}
        options={tabOptions('shopping-cart', 'Orders', 'Feather')}
      />
      {props.user.userType === 'supplier' && (
        <BottomTab.Screen
          name="AddSupplyPageScreen"
          component={AddSupplyPageScreen}
          options={tabOptions('ios-add', 'Add Supply', 'Ionicons')}
        />
      )}

      <BottomTab.Screen
        name="OrderHistoryPage"
        component={OrderHistoryPage}
        options={tabOptions(
          'history',
          'Order History',
          'MaterialCommunityIcons'
        )}
      />
    </BottomTab.Navigator>
  )
}

const mapState = (state) => {
  // console.log('state ', state.user)
  return {
    user: state.user,
  }
}
export default connect(mapState, null)(BottomTabNavigator)
