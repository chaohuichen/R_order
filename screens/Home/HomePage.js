import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SignInPage from "../SignIn/SignInPage";

export default function HomePage(props) {
  return (
    <View style={styles.container}>
      <SignInPage navigation={props.navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
