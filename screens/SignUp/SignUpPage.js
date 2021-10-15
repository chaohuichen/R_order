import React, { useState, useRef } from 'react'
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
} from 'react-native'
import { TextInput } from 'react-native-paper'
import { connect } from 'react-redux'
import { getUser } from '../../redux'
import { checkPhoneMap } from '../../API/databaseCall'
import DismissKeyboard from '../../components/DismissKeyboard'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
import firebase from '../../API/FirebaseDatabase'

function SignUpPage(props) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState('')
  const userPhone = '+1' + phoneNumber

  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined
  const recaptchaVerifier = useRef(null)
  const handleOnSignUp = async () => {
    const check = await checkPhoneMap(userPhone)
    if (check) {
      Alert.alert('User already register', 'navigate to sign in page', [
        { text: 'OK', onPress: () => props.navigation.pop() },
      ])
    } else {
      const phoneProvider = new firebase.auth.PhoneAuthProvider()
      const verificationId = await phoneProvider.verifyPhoneNumber(
        userPhone,
        recaptchaVerifier.current
      )
      props.navigation.navigate('PhoneVerificationPage', {
        phoneNumber,
        verificationId,
      })
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={true}
      />
      <DismissKeyboard>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 100,
          }}
        >
          <Image
            source={require('../../assets/upblack.png')}
            style={{
              height: 180,
              resizeMode: 'contain',
              alignSelf: 'center',
              marginBottom: 10,
            }}
            alt="app logo"
          />
          <Text
            style={{ fontSize: 30, fontWeight: '600', textAlign: 'center' }}
          >
            Sign Up
          </Text>
          <TextInput
            style={{ width: 300, alignSelf: 'center' }}
            theme={{
              colors: { underlineColor: 'transparent', primary: 'black' },
            }}
            value={phoneNumber}
            mode="outlined"
            label="Mobile number"
            autoCapitalize="none"
            keyboardType="phone-pad"
            onChangeText={(number) => setPhoneNumber(number)}
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleOnSignUp}>
            <Text style={styles.loginText}>Sign up</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 12, alignSelf: 'center' }}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => props.navigation.pop()}>
              <Text
                style={{
                  textDecorationLine: 'underline',
                  fontSize: 12,
                }}
              >
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </DismissKeyboard>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    margin: 10,
  },
  loginButton: {
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    backgroundColor: 'black',
    opacity: 0.8,
    width: 300,
    alignSelf: 'center',
    marginTop: 10,
  },
  loginText: {
    color: 'white',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 20,
  },
})

const mapState = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapState, null)(SignUpPage)
