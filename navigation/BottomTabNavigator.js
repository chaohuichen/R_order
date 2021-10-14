import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { tabOptions } from './tabOptions'
import OrderHomeScreen from '../screens/Orders/OrderHomeScreen'
import OrderHistoryPage from '../screens/OrdersHistory/OrderHistoryPage'
import AddSupplyPageScreen from '../screens/AddSupply/AddSupplyPageScreen'
const BottomTab = createBottomTabNavigator()
// TODO add Auth Stack Container

const BottomTabNavigator = ({}) => {
  return (
    <BottomTab.Navigator
      initialRouteName=""
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
      <BottomTab.Screen
        name="AddSupplyPageScreen"
        component={AddSupplyPageScreen}
        options={tabOptions('ios-add', 'Add Supply', 'Ionicons')}
      />
      {/* <BottomTab.Screen
        name="OrderHistoryPage"
        component={OrderHistoryPage}
        options={tabOptions(
          "history",
          "Order History",
          "MaterialCommunityIcons"
        )}
      /> */}
    </BottomTab.Navigator>
  )
}

export default BottomTabNavigator
