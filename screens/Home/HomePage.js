import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SignInPage from '../SignIn/SignInPage'

export default function HomePage(props) {
  return (
    <View style={styles.container}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
