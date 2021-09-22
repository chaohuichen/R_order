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
// import TextInputMask from "react-native-text-input-mask";

const SignInPage = (props) => {
  console.log("props ", props);
  const [phoneNumber, setPhoneNumber] = useState();
  const handleOnLogin = () => {
    const user = {
      userId: 1,
    };
    props.fetchData(user);
  };
  return (
    <SafeAreaView style={styles.container}>
      <DismissKeyboard>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            marginTop: 55,
          }}
          behavior="position"
        >
          <Image
            source={require("../../assets/upblack.png")}
            style={{
              height: 150,
              resizeMode: "contain",
              marginBottom: 10,
              alignSelf: "center",
              marginBottom: 10,
            }}
            alt="app logo"
          />
          <Text
            style={{ fontSize: 30, fontWeight: "600", textAlign: "center" }}
          >
            Sign in
          </Text>
          <TextInput
            style={{ width: 300, alignSelf: "center" }}
            theme={{
              colors: { underlineColor: "transparent", primary: "black" },
            }}
            mode="outlined"
            label="Mobile number"
            autoCapitalize="none"
            keyboardType="phone-pad"
            onChangeText={(number) => setPhoneNumber(number)}
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleOnLogin}>
            <Text style={styles.loginText}>Sign In</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 12, alignSelf: "center" }}>
              Don't have an account?
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("SignUpPage")}
            >
              <Text
                style={{
                  textDecorationLine: "underline",
                  fontSize: 12,
                }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
