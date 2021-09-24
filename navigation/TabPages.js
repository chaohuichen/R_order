import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {
  MyScreenOption,
  HeaderTitleOnly,
  HeaderShownNone,
} from './HeaderOptions'
// CoffeeHome
import OrderPage from '../screens/Orders/OrderHomePage'
import HomePage from '../screens/Home/HomePage'
import OrderHistoryPage from '../screens/OrdersHistory/OrderHistoryPage'
import OrderInvoicePage from '../screens/Invoice/OrderInvoicePage'
import SignInPage from '../screens/SignIn/SignInPage'
import ConfirmationPage from '../screens/Confirm/ConfirmationPage'
import PDFpage from '../screens/PDF/PDFpage'
const Stack = createStackNavigator()

export default ({ navigation, tabName }) => {
  const headerTitle = 'Fillup Coffee'
  // if (!useIsFocused()) {
  //   return <></>;
  // }

  return (
    <Stack.Navigator screenOptions={MyScreenOption}>
      {tabName === 'OrderHome' && (
        <Stack.Screen
          name="OrderPage"
          component={OrderPage}
          options={HeaderTitleOnly('Fillup Supply')}
        />
      )}
      {tabName === 'OrderHistoryPage' && (
        <Stack.Screen
          name="OrderHistoryPage"
          component={OrderHistoryPage}
          options={HeaderTitleOnly('Fillup Supply')}
        />
      )}
      <Stack.Screen
        name="SignInPage"
        component={SignInPage}
        options={HeaderShownNone()}
      />
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={HeaderShownNone()}
      />
      <Stack.Screen
        name="OrderInvoicePage"
        component={OrderInvoicePage}
        options={HeaderShownNone()}
      />
      <Stack.Screen
        name="ConfirmationPage"
        component={ConfirmationPage}
        options={HeaderShownNone()}
      />
      <Stack.Screen
        name="PDFpage"
        component={PDFpage}
        options={HeaderShownNone()}
      />
    </Stack.Navigator>
  )
}
