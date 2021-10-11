import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { connect } from 'react-redux'
import { getUser } from '../../redux'
import { checkPhoneMap } from '../../API/databaseCall'
import ExpoFastImage from 'expo-fast-image'
import DismissKeyboard from '../../components/DismissKeyboard'
import AppIcons from '../../components/AppIcons'
import { background, backgroundColor } from 'styled-system'
// import TextInputMask from "react-native-text-input-mask";

function SignUpPage(props) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState('')
  const userPhoneNumber = 1 + phoneNumber
  const handleOnSignUp = async () => {
    const check = await checkPhoneMap(userPhoneNumber)
    if (check) {
      // user already register go login
      Alert.alert('User already register', 'navigate to sign in page', [
        { text: 'OK', onPress: () => props.navigation.pop() },
      ])
    } else {
      props.navigation.navigate('PhoneVerificationPage', {
        phoneNumber,
      })
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <DismissKeyboard>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            marginTop: 100,
            alignItems: 'center',
          }}
        >
          <Image
            source={require('../../assets/upblack.png')}
            style={{
              height: 150,
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
