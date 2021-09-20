import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  MyScreenOption,
  HeaderTitleOnly,
  HeaderShownNone,
} from "./HeaderOptions";
// CoffeeHome
import OrderPage from "../screens/Orders/OrderHomePage";
import SignInPage from "../screens/SignIn/SignInPage";
import HomePage from "../screens/Home/HomePage";
import OrderHistoryPage from "../screens/OrdersHistory/OrderHistoryPage";
const Stack = createStackNavigator();

export default ({ navigation, tabName }) => {
  const headerTitle = "Fillup Coffee";
  // if (!useIsFocused()) {
  //   return <></>;
  // }

  return (
    <Stack.Navigator screenOptions={MyScreenOption}>
      {tabName === "OrderHome" && (
        <Stack.Screen
          name="OrderPage"
          component={OrderPage}
          options={HeaderTitleOnly("Fillup Supply")}
        />
      )}
      {tabName === "OrderHistoryPage" && (
        <Stack.Screen
          name="OrderHistoryPage"
          component={OrderHistoryPage}
          options={HeaderTitleOnly("Fillup Supply")}
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
    </Stack.Navigator>
  );
};
