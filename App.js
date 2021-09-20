import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppStart from "./AppStart";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store } from "./redux";
import { persistStore } from "redux-persist";
export default () => {
  const persistedStore = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <AppStart />
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
