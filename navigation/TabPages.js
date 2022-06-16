import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {
  MyScreenOption,
  HeaderTitleOnly,
  HeaderTitleAndIcon,
  HeaderTitleOnlyStyleChange,
} from './HeaderOptions'
// CoffeeHome
import OrderPage from '../screens/Orders/OrderHomePage'
import ConfirmationPage from '../screens/Confirm/ConfirmationPage'
import UserProfileHomePage from '../screens/UserProfile/UserProfileHomePage'
const Stack = createStackNavigator()

export default ({ navigation, tabName }, props) => {
  // if (!useIsFocused()) {
  //   return <></>;
  // }

  return (
    <Stack.Navigator screenOptions={MyScreenOption}>
      {tabName === 'OrderHome' && (
        <Stack.Screen
          name="OrderPage"
          component={OrderPage}
          options={({ navigation }) => HeaderTitleAndIcon('TG GHQ', navigation)}
        />
      )}

      <Stack.Screen
        name="ConfirmationPage"
        component={ConfirmationPage}
        options={HeaderTitleOnly('')}
      />

      <Stack.Screen
        name="UserProfile"
        component={UserProfileHomePage}
        options={HeaderTitleOnly('Profile')}
      />
    </Stack.Navigator>
  )
}
