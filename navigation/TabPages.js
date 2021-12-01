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
import OrderHistoryPage from '../screens/OrdersHistory/OrderHistoryPage'
import ConfirmationPage from '../screens/Confirm/ConfirmationPage'
import AddSupplyPage from '../screens/AddSupply/AddSupplyPage'
import UserProfileHomePage from '../screens/UserProfile/UserProfileHomePage'
import PdfViewer from '../screens/PdfViewer/PdfView'
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
          options={({ navigation }) =>
            HeaderTitleAndIcon('Fillup Supply', navigation)
          }
        />
      )}
      {tabName === 'OrderHistoryPage' && (
        <Stack.Screen
          name="OrderHistoryPage"
          component={OrderHistoryPage}
          options={HeaderTitleOnly('Order Invoices')}
        />
      )}
      {tabName === 'AddSupplyPage' && (
        <Stack.Screen
          name="AddSupplyPage"
          component={AddSupplyPage}
          options={HeaderTitleOnly('Fillup Supply')}
        />
      )}

      <Stack.Screen
        name="ConfirmationPage"
        component={ConfirmationPage}
        options={HeaderTitleOnlyStyleChange('Invoice')}
      />

      <Stack.Screen
        name="UserProfile"
        component={UserProfileHomePage}
        options={HeaderTitleOnly('Profile')}
      />

      <Stack.Screen
        name="PdfView"
        component={PdfViewer}
        options={HeaderTitleOnly('Pdf Viewer')}
      />
    </Stack.Navigator>
  )
}
