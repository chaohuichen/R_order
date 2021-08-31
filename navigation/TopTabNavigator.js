import React from 'react'
import { SafeAreaView } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import NavigationTheme from '../constants/NavigationTheme'
import { tabBarOptions, tabOptions } from './tabOptions'

import OrderHomeScreen from '../screens/Orders/OrderHomeScreen'
import OrderHistoryScreen from '../screens/OrderHistory/OrderHistoryHomeScreen'
const TopTab = createMaterialTopTabNavigator()
import { NavigationContainer } from '@react-navigation/native'

const TopTabNavigator = () => {
  return (
    <NavigationContainer theme={NavigationTheme}>
      <SafeAreaView />
      <TopTab.Navigator
        initialRouteName="OrderHomeScreen"
        // tabBar={(props) => <MyTabBar {...props} />}
        screenOptions={tabBarOptions()}
      >
        <TopTab.Screen name="Home" component={OrderHomeScreen} />
        <TopTab.Screen name="Settings" component={OrderHistoryScreen} />
      </TopTab.Navigator>
    </NavigationContainer>
  )
}

export default TopTabNavigator
