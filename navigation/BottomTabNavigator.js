import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {tabBarOptions } from './tabOptions'
// import CoffeeHomeScreen from '../screens/CoffeeHome/CoffeeHomeScreen'
// import ProfileHomeScreen from '../screens/ProfileHome/ProfileHomeScreen'
// import PayHomeScreen from '../screens/PayHome/PayHomeScreen'
// import BeanHomeScreen from '../screens/BeanHome/BeanHomeScreen'
// import StoreHomeScreen from '../screens/StoreHome/StoreHomeScreen'
// import MyTabBar from '../components/MyTabBar'
// import NavigationTheme from '../constants/NavigationTheme'
// import CoffeeHome from '../screens/CoffeeHome'
// import CoffeeTopTab from './CoffeeTopTab'
import OrderHomeScreen from '../screens/Orders/OrderHomeScreen'
const BottomTab = createBottomTabNavigator()
// TODO add Auth Stack Container

const BottomTabNavigator = ({ }) => {
  return (
    <NavigationContainer theme={NavigationTheme}>
      <BottomTab.Navigator
        initialRouteName='OrderHomeScreen'
        // tabBar={(props) => <MyTabBar {...props} />}
        // tabBarOptions={tabBarOptions()}
      >
        <BottomTab.Screen
          name='OrderHomeScreen'
          component={OrderHomeScreen}
          // options={tabOptions('coffee', 'Coffee', 'MaterialCommunityIcons')}
        />
        {/* <BottomTab.Screen
          name='BeanHomeScreen'
          component={BeanHomeScreen}
          options={tabOptions('shopping-bag', 'Shop', 'Fontisto')}
        />
        <BottomTab.Screen
          name='PayHomeScreen'
          component={PayHomeScreen}
          options={{
            ...paymentTabOptions(),
            ...(cartItemSize > 0 ? { tabBarBadge: cartItemSize } : {})
          }}
        />
        <BottomTab.Screen
          name='StoreHomeScreen'
          component={StoreHomeScreen}
          options={tabOptions('location', 'stores', 'Entypo')}
        />
        <BottomTab.Screen
          name='ProfileHomeScreen'
          component={ProfileHomeScreen}
          options={tabOptions(
            'account-circle',
            'Profile',
            'MaterialCommunityIcons'
          )}
        /> */}
      </BottomTab.Navigator>
    </NavigationContainer>
  )
}


export default BottomTabNavigator 