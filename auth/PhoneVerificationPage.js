import React, { useState, useEffect, useRef } from 'react'
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import { TextInput } from 'react-native-paper'
import firebase from '../API/FirebaseDatabase'
import { setPhoneMap, setUserData } from '../API/databaseCall'
import { getUser } from '../redux'
import { connect } from 'react-redux'
import DismissKeyboard from '../components/DismissKeyboard'
function PhoneVerificationPage(props) {
  const [verificationCode, setVerificationCode] = useState('')
  const { phoneNumber, verificationId } = props.route.params
  let userType = 'user'
  const confirmCode = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      )

      const firebaseResponse = await firebase
        .auth()
        .signInWithCredential(credential)

      const userPayLoad = {
        phoneNumber,
        uid: firebaseResponse.user.uid,
        userType,
      }
      props.setUpUser(userPayLoad)
      setPhoneMap('+1' + phoneNumber, firebaseResponse.user.uid)
      setUserData(userPayLoad)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <DismissKeyboard>
        <ScrollView contentContainerStyle={styles.keyBoard} behavior="position">
          <Text style={styles.header}>Verify phone number</Text>
          <Text style={styles.subHeader}>
            Please enter the code sent to {phoneNumber}
          </Text>
          <TextInput
            style={{ width: 300, alignSelf: 'center' }}
            theme={{
              colors: { underlineColor: 'transparent', primary: 'black' },
            }}
            value={verificationCode}
            mode="outlined"
            label="Comfirmation Code"
            autoCapitalize="none"
            keyboardType="phone-pad"
            onChangeText={(code) => setVerificationCode(code)}
          />
          <TouchableOpacity
            style={styles.comfirmButton}
            onPress={() => confirmCode()}
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
const mapState = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapState, mapDispatch)(PhoneVerificationPage)
