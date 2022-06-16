import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { tabOptions } from './tabOptions'
import OrderHomeScreen from '../screens/Orders/OrderHomeScreen'
// PayHome

const BottomTab = createBottomTabNavigator()

const BottomTabRoot = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="OrderHomeScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="OrderHomeScreen"
        component={OrderHomeScreen}
        options={tabOptions('coffee', 'Coffee', 'MaterialCommunityIcons', 30)}
      />
    </BottomTab.Navigator>
  )
}

export default BottomTabRoot
