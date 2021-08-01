import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { tabBarOptions, tabOptions } from './tabOptions'

import NavigationTheme from '../constants/NavigationTheme'

import OrderHomeScreen from '../screens/Orders/OrderHomeScreen'
import OrderHistoryScreen from '../screens/OrderHistory/OrderHistoryHomeScreen'
const BottomTab = createBottomTabNavigator()
// TODO add Auth Stack Container

const BottomTabNavigator = ({}) => {
  return (
    <NavigationContainer theme={NavigationTheme}>
      <BottomTab.Navigator
        initialRouteName="OrderHomeScreen"
        // tabBar={(props) => <MyTabBar {...props} />}
        tabBarOptions={tabBarOptions()}
      >
        <BottomTab.Screen
          name="OrderHomeScreen"
          component={OrderHomeScreen}
          options={tabOptions('shopping-cart', 'Orders', 'Feather')}
        />
        <BottomTab.Screen
          name="OrderHistoryScreen"
          component={OrderHistoryScreen}
          options={tabOptions(
            'history',
            'OrderHistory',
            'MaterialCommunityIcons'
          )}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  )
}

export default BottomTabNavigator
