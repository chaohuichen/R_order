import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput } from "react-native-paper";
import firebase from "../API/FirebaseDatabase";
import { getUser } from "../redux";
import { connect } from "react-redux";
import DismissKeyboard from "../components/DismissKeyboard";
import AppIcons from "../components/AppIcons";
function PhoneVerificationPage(props) {
  const [code, setCode] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("+16469223851");
  const [verificationCode, setVerificationCode] = useState("123456");
  const [verificationId, setVerificationId] = useState(null);
  const { phoneNumber } = props.route.params;

  const userPhoneNumber = 1 + phoneNumber;
  const recaptchaVerifier = useRef(null);
  const handleOnSubmit = () => {
    confirmCode();
  };
  useEffect(() => {
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
    sendVerification();
    return () => {};
  }, []);

  const confirmCode = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );

      firebase
        .auth()
        .signInWithCredential(credential)
        .then((res) => {
          props.setUpUser(res.user.uid);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppIcons
        type="Ionicons"
        name="chevron-back"
        style={{ justifyContent: "flex-start", margin: 10 }}
        size={30}
        onPress={() => props.navigation.pop()}
      />
      <DismissKeyboard>
        <KeyboardAvoidingView
          style={{ flex: 1, justifyContent: "center" }}
          behavior="position"
        >
          <Text style={{ fontSize: 22, fontWeight: "500" }}>
            Verify phone number
          </Text>
          <Text style={{ letterSpacing: 0.5, fontSize: 12 }}>
            Please enter the code sent to +{userPhoneNumber}
          </Text>
          <TextInput
            style={{ width: 300, alignSelf: "center" }}
            theme={{
              colors: { underlineColor: "transparent", primary: "black" },
            }}
            mode="outlined"
            label="Comfirmation Code"
            autoCapitalize="none"
            keyboardType="phone-pad"
            onChangeText={(code) => setCode(code)}
          />
          <TouchableOpacity
            style={styles.comfirmButton}
            onPress={handleOnSubmit}
          >
            <Text style={styles.comfirmButtonText}>Comfirm</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    justifyContent: "center",
  },
  comfirmButton: {
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
  comfirmButtonText: {
    color: "white",
    alignSelf: "center",
    fontWeight: "500",
    fontSize: 20,
  },
});

const mapDispatch = (dispatch) => {
  return {
    setUpUser: (user) => dispatch(getUser(user)),
  };
};

export default connect(null, mapDispatch)(PhoneVerificationPage);
