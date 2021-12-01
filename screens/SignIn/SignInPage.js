import React, { useState, useRef, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native'
import { TextInput } from 'react-native-paper'
import { connect } from 'react-redux'
import { getUser } from '../../redux'
import DismissKeyboard from '../../components/DismissKeyboard'
import firebase, { db } from '../../API/FirebaseDatabase'
import { checkPhoneMap } from '../../API/databaseCall'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'

const SignInPage = (props) => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [confirm, setConfirm] = useState(false)
  const [error, setError] = useState()
  const [verificationCode, setVerificationCode] = useState('')
  const [verificationId, setVerificationId] = useState(null)
  const userPhoneNumber = '+1' + phoneNumber
  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined
  const recaptchaVerifier = useRef(null)
  useEffect(() => {
    if (userPhoneNumber.length < 11) {
      // setError('please enter correct phone number')
    } else {
      setError('')
    }
    return () => {}
  }, [])
  const handleOnLogin = async () => {
    const check = await checkPhoneMap(userPhoneNumber)
    if (check === true && error !== '') {
      //login
      sendVerification()
    } else {
      //user not register go register page
      Alert.alert('User not registered', 'navigate to sign up page', [
        { text: 'OK', onPress: () => props.navigation.navigate('SignUpPage') },
      ])
    }
  }
  const firebasePhoneSignIn = (credential) => {
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((res) => {
        db.ref(`/users/${res.user.uid}/userSharedData/`).once(
          'value',
          (snapShot) => {
            if (snapShot.exists()) {
              props.fetchData(snapShot.val())
            } else {
              console.log('user dont exist ')
            }
          }
        )
      })
      .catch((err) => console.log('phone sign in ', err))
  }
  const sendVerification = async () => {
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider()
      const verificationId = await phoneProvider.verifyPhoneNumber(
        userPhoneNumber,
        recaptchaVerifier.current
      )
      setVerificationId(verificationId)
      setConfirm(true)
    } catch (err) {
      console.log('error message ' + err)
    }
  }
  const confirmCode = async () => {
    try {
      const credential = await firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      )
      firebasePhoneSignIn(credential)
    } catch (err) {
      console.log(err)
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
          <Text
            style={{ fontSize: 30, fontWeight: '600', textAlign: 'center' }}
          >
            Sign in
          </Text>
          {confirm ? (
            <>
              <Text>Enter code sent to +1{phoneNumber}</Text>

              <TextInput
                style={{ width: 300, alignSelf: 'center' }}
                theme={{
                  colors: { underlineColor: 'transparent', primary: 'black' },
                }}
                autoFocus
                maxLength={6}
                value={verificationCode}
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
              <Text style={{ color: 'red', fontSize: 10, letterSpacing: 0.5 }}>
                {error}
              </Text>
              <TextInput
                style={{ width: 300, alignSelf: 'center' }}
                theme={{
                  colors: { underlineColor: 'transparent', primary: 'black' },
                }}
                autoFocus
                maxLength={10}
                value={phoneNumber}
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
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 12, alignSelf: 'center' }}>
              Don't have an account?
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('SignUpPage')}
            >
              <Text
                style={{
                  textDecorationLine: 'underline',
                  fontSize: 12,
                }}
              >
                Sign up
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

const mapDispatch = (dispatch) => {
  return {
    fetchData: (user) => dispatch(getUser(user)),
  }
}
const mapState = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapState, mapDispatch)(SignInPage)
