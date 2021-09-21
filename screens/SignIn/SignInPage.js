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
const SignInPage = (props) => {
  const [phoneNumber, setPhoneNumber] = useState();
  const handleOnLogin = () => {
    const user = {
      userId: 1,
    };
    props.fetchData(user);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <DismissKeyboard>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          behavior="position"
        >
          <Image
            source={require("../../assets/upblack.png")}
            style={{
              width: 300,
              height: 200,
              resizeMode: "contain",
              marginBottom: 10,
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

          <TouchableOpacity style={styles.loginButton} onPress={handleOnLogin}>
            <Text style={styles.loginText}>Sign In</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    </SafeAreaView>
  );
};

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

const mapDispatch = (dispatch) => {
  return {
    fetchData: (user) => dispatch(getUser(user)),
  };
};

export default connect(null, mapDispatch)(SignInPage);
