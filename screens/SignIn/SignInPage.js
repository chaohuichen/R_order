import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { connect } from "react-redux";
import { getUser } from "../../redux";
import DismissKeyboard from "../../components/DismissKeyboard";
// import TextInputMask from "react-native-text-input-mask";
import firebase from "../../API/FirebaseDatabase";
import { checkPhoneMap } from "../../API/databaseCall";
const SignInPage = (props) => {
  console.log("props ", props);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [comfirm, setComfirm] = useState(false);
  const recaptchaVerifier = useRef(null);
  const [error, setError] = useState();
  const [verificationCode, setVerificationCode] = useState("123456");
  const [verificationId, setVerificationId] = useState(null);
  const userPhoneNumber = 1 + phoneNumber;
  useEffect(() => {
    if (userPhoneNumber.length < 11) {
      setError("please enter correct phone number");
    } else {
      setError("");
    }
    return () => {};
  }, []);
  const handleOnLogin = async () => {
    const check = await checkPhoneMap(userPhoneNumber);
    if (check === true && error !== "") {
      //login
      sendVerification();
    } else {
      //user not register go register page
      Alert.alert("User not register", "navigate to sign up page", [
        { text: "OK", onPress: () => props.navigation.navigate("SignUpPage") },
      ]);
    }
    // const user = {
    //   userId: 1,
    // };
    // props.fetchData(user);
  };
  const sendVerification = async () => {
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const verificationId = await phoneProvider.verifyPhoneNumber(
        userPhoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
    } catch (err) {
      console.log("error message " + err);
    }
  };
  const confirmCode = async () => {
    try {
      const credential = await firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );

      firebase
        .auth()
        .signInWithCredential(credential)
        .then((res) => {
          props.fetchData(res.user.uid);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
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
          {comfirm ? (
            <>
              <Text>Enter code sent to +1{phoneNumber}</Text>

              <TextInput
                style={{ width: 300, alignSelf: "center" }}
                theme={{
                  colors: { underlineColor: "transparent", primary: "black" },
                }}
                mode="outlined"
                label="Code"
                autoCapitalize="none"
                keyboardType="phone-pad"
                onChangeText={(code) => setVerificationCode(code)}
              />

              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => confirmCode()}
              >
                <Text style={styles.loginText}>Comfirm</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text
                style={{ color: "red", fontSize: 10, letterSpacing: 0.5 }}
              >
                {error}
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

              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => handleOnLogin()}
              >
                <Text style={styles.loginText}>Sign In</Text>
              </TouchableOpacity>
            </>
          )}
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
    margin: 10,
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
