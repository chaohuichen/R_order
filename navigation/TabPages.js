import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {
  MyScreenOption,
  HeaderTitleOnly,
  HeaderShownNone,
  HeaderTitleAndIcon,
} from './HeaderOptions'
// CoffeeHome
import OrderPage from '../screens/Orders/OrderHomePage'
import OrderHistoryPage from '../screens/OrdersHistory/OrderHistoryPage'
import ConfirmationPage from '../screens/Confirm/ConfirmationPage'
import PDFpage from '../screens/PDF/PDFpage'
import AddSupplyPage from '../screens/AddSupply/AddSupplyPage'

const Stack = createStackNavigator()

export default ({ navigation, tabName }, props) => {
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
          options={HeaderTitleAndIcon('Fillup Supply')}
        />
      )}
      {tabName === 'OrderHistoryPage' && (
        <Stack.Screen
          name="OrderHistoryPage"
          component={OrderHistoryPage}
          options={HeaderTitleOnly('Fillup Supply')}
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
        options={HeaderTitleOnly('Invoice')}
      />
      <Stack.Screen
        name="PDFpage"
        component={PDFpage}
        options={HeaderShownNone()}
      />
    </Stack.Navigator>
  )
}
const mapDispatch = (dispatch) => {
  return {
    removeUserData: () => dispatch(removeUser()),
  }
}
