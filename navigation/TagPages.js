import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {
  MyScreenOption,
  HeaderTitleOnly,
} from './HeaderOptions'
// CoffeeHome
import OrderPage from '../screens/Orders/OrderHomePage'
import OrderHistoryPage from '../screens/OrderHistory/OrderHistoryPage'
const Stack = createStackNavigator()

export default ({ navigation, tabName }) => {
  const headerTitle = 'Fillup Coffee'
  // if (!useIsFocused()) {
  //   return <></>;
  // }

  return (
    <Stack.Navigator screenOptions={MyScreenOption}>
   
        {tabName === 'OrderHome' && <Stack.Screen
          name='OrderPage'
          component={OrderPage}
          options={HeaderTitleOnly(headerTitle)}
        />}
          {tabName === 'OrderHistoryPage' && <Stack.Screen
          name='OrderHistoryPage'
          component={OrderHistoryPage}
          options={HeaderTitleOnly(headerTitle)}
        />}
      
    </Stack.Navigator>
  )
}