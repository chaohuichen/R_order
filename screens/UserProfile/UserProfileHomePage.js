import React, { useState } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'native-base'
import { removeUser } from '../../redux'

const UserProfileHomePage = ({ user, logOut, navigation }) => {
  const [loading, setLoading] = useState(false)
  const handleLogout = () => {
    logOut()
    // setTimeout(() => {
    //   navigation.navigate('SignInSelectionPage')
    // }, 1000)
    console.log(user)
  }
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <View>
        <Image
          source={require('../../assets/profilePic.png')}
          style={{ height: 450, width: '100%', resizeMode: 'stretch' }}
          // resizeMethod="resize"
        />
        {/* <Text>{JSON.stringify(user)}</Text> */}
        <View style={{ marginHorizontal: 25 }}>
          <Text
            style={{ fontWeight: 'bold', fontSize: 18, marginVertical: 20 }}
          >
            {user.name}
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              textTransform: 'capitalize',
            }}
          >
            Account Type: {user.userType}
          </Text>
        </View>
      </View>
      <Button
        style={{
          backgroundColor: '#e3e3e3',
          marginHorizontal: 25,
          marginBottom: 10,
        }}
        onPress={handleLogout}
      >
        <Text>Log out</Text>
      </Button>
    </View>
  )
}

const Styles = StyleSheet.create({})

const mapState = (state) => {
  return {
    user: state.user,
  }
}
const mapDispatch = (dispatch) => {
  return {
    logOut: () => dispatch(removeUser()),
  }
}

export default connect(mapState, mapDispatch)(UserProfileHomePage)
