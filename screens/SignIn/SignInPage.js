import React, { useState, useRef, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
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
// import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const SignInPage = (props) => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [confirm, setConfirm] = useState(false)
  const [error, setError] = useState()
  const [verificationCode, setVerificationCode] = useState('')
  const [verificationId, setVerificationId] = useState(null)
  const userPhoneNumber = '+1' + phoneNumber
  // const firebaseConfig = firebase.apps.length
  //   ? firebase.app().options
  //   : undefined
  const recaptchaVerifier = useRef(null)
  // ........................................

  const [password, setPassword] = useState('')
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
  const handleLogin = () => {
    console.log(password)
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={true}
      /> */}
      <DismissKeyboard>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 100,
          }}
          extraScrollHeight={50}
        >
          <Text
            style={{
              color: '#BEAC74',
              fontSize: 25,

              fontFamily: 'CrimsonText-Bold',
            }}
          >
            SINCE {'  '}|{'  '} 1977
          </Text>
          <Text
            style={{
              fontSize: 60,
              lineHeight: 90,
              fontWeight: '600',
              textAlign: 'center',
              fontFamily: 'CrimsonText-Bold',
              color: 'white',
            }}
          >
            Flor De Mayo
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 30,
              fontWeight: '600',
              textAlign: 'center',
            }}
            numberOfLines={1}
          >
            Welcome,{'  ' + props.route.params.user}
          </Text>
          <TextInput
            style={{ width: 300, alignSelf: 'center' }}
            theme={{
              colors: { underlineColor: 'transparent', primary: 'black' },
            }}
            autoFocus
            maxLength={14}
            value={password}
            mode="outlined"
            placeholder="Password"
            autoCapitalize="none"
            keyboardType="phone-pad"
            onChangeText={(number) => setPassword(number)}
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </DismissKeyboard>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
  },
  loginButton: {
    justifyContent: 'center',
    backgroundColor: '#BEAC74',
    opacity: 0.8,
    width: 300,
    height: 40,
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 5,
  },
  loginText: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
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
