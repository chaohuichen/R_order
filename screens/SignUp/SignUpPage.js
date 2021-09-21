import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { connect } from "react-redux";
import { getUser } from "../../redux";
import ExpoFastImage from "expo-fast-image";
import DismissKeyboard from "../../components/DismissKeyboard";
import AppIcons from "../../components/AppIcons";
export default function SignUpPage(props) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const handleOnSignUp = () => {
    props.navigation.navigate("PhoneVerificationPage", {
      phoneNumber,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <AppIcons
        type="Ionicons"
        name="chevron-back"
        style={{ alignSelf: "left", margin: 10 }}
        size={30}
        onPress={() => props.navigation.pop()}
      />
      <DismissKeyboard>
        <KeyboardAvoidingView
          style={{ flex: 1, justifyContent: "center" }}
          behavior="position"
        >
          <Image
            source={require("../../assets/upblack.png")}
            style={{
              height: 180,
              resizeMode: "contain",
              marginBottom: 30,
              alignSelf: "center",
            }}
            alt="app logo"
          />

          <TextInput
            style={{ width: 300, alignSelf: "center" }}
            theme={{
              colors: { underlineColor: "transparent", primary: "black" },
            }}
            mode="outlined"
            label="Mobile"
            autoCapitalize="none"
            keyboardType="phone-pad"
            onChangeText={(number) => setPhoneNumber(number)}
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleOnSignUp}>
            <Text style={styles.loginText}>Sign up</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 12, alignSelf: "center" }}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => props.navigation.pop()}>
              <Text
                style={{
                  textDecorationLine: "underline",
                  fontSize: 12,
                }}
              >
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f3f3",
  },
  loginButton: {
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    backgroundColor: "black",
    opacity: 0.8,
    width: 300,
    alignSelf: "center",
    marginTop: 10,
  },
  loginText: {
    color: "white",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 20,
  },
});
