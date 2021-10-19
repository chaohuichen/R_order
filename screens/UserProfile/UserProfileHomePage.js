import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'native-base'
import { removeUser } from '../../redux'

const UserProfileHomePage = ({ user, removeUserData }) => {
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
          style={{ height: 300, width: '100%' }}
        />
        {/* <Text>{JSON.stringify(user)}</Text> */}
        <View style={{ marginHorizontal: 25 }}>
          <Text
            style={{ fontWeight: 'bold', fontSize: 18, marginVertical: 20 }}
          >
            Phone Number: {user.phoneNumber}
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
        onPress={removeUserData}
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
    removeUserData: () => dispatch(removeUser()),
  }
}

export default connect(mapState, mapDispatch)(UserProfileHomePage)
