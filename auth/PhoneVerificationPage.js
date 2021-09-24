import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import { TextInput } from 'react-native-paper'
import firebase from '../API/FirebaseDatabase'
import { getUser } from '../redux'
import { connect } from 'react-redux'
import DismissKeyboard from '../components/DismissKeyboard'
import AppIcons from '../components/AppIcons'
function PhoneVerificationPage(props) {
  const [code, setCode] = useState('')
  // const [phoneNumber, setPhoneNumber] = useState("+16469223851");
  const [verificationCode, setVerificationCode] = useState('123456')
  const [verificationId, setVerificationId] = useState(null)
  const { phoneNumber } = props.route.params

  const userPhoneNumber = 1 + phoneNumber
  const recaptchaVerifier = useRef(null)
  const handleOnSubmit = () => {
    confirmCode()
  }
  useEffect(() => {
    const sendVerification = async () => {
      try {
        const phoneProvider = new firebase.auth.PhoneAuthProvider()
        const verificationId = await phoneProvider.verifyPhoneNumber(
          userPhoneNumber,
          recaptchaVerifier.current
        )
        setVerificationId(verificationId)
      } catch (err) {
        console.log('error message ' + err)
      }
    }
    sendVerification()
    return () => {}
  }, [])

  const confirmCode = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      )

      firebase
        .auth()
        .signInWithCredential(credential)
        .then((res) => {
          props.setUpUser(res.user.uid)
        })
        .catch((err) => console.log(err))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          alignSelf: 'left',
          paddingTop: '2%',
        }}
      >
        <AppIcons
          type="Ionicons"
          name="chevron-back"
          size={30}
          onPress={() => props.navigation.pop()}
        />
      </View>
      <DismissKeyboard>
        <ScrollView contentContainerStyle={styles.keyBoard} behavior="position">
          <Text style={styles.header}>Verify phone number</Text>
          <Text style={styles.subHeader}>
            Please enter the code sent to +{userPhoneNumber}
          </Text>
          <TextInput
            style={{ width: 300, alignSelf: 'center' }}
            theme={{
              colors: { underlineColor: 'transparent', primary: 'black' },
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
        </ScrollView>
      </DismissKeyboard>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    justifyContent: 'center',
  },
  keyBoard: {
    flex: 1,
    marginTop: '30%',
  },
  header: {
    fontSize: 22,
    fontWeight: '500',
    paddingHorizontal: '7%',
  },
  subHeader: {
    letterSpacing: 0.5,
    fontSize: 12,
    paddingHorizontal: '7%',
  },
  comfirmButton: {
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
  comfirmButtonText: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: '500',
    fontSize: 20,
  },
})

const mapDispatch = (dispatch) => {
  return {
    setUpUser: (user) => dispatch(getUser(user)),
  }
}

export default connect(null, mapDispatch)(PhoneVerificationPage)
