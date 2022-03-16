import React, { useState, useEffect } from 'react'
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'native-base'
import { removeUser, getOrderHistory } from '../../redux'
import * as FileSystem from 'expo-file-system'
import Invoice from './Invoice'
const localCacheDir = FileSystem.documentDirectory
const UserProfileHomePage = ({
  user,
  logOut,
  navigation,
  orderHistory,
  fetchOrderHistory,
}) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchOrderHistory()
  }, [])

  const handleLogout = () => {
    logOut()
    // setTimeout(() => {
    //   navigation.navigate('SignInSelectionPage')
    // }, 1000)
    console.log(user)
  }
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        flexDirection: 'column',
      }}
    >
      <View>
        <Image
          source={require('../../assets/profilePic.png')}
          style={{ height: 350, width: '100%', resizeMode: 'stretch' }}
          // resizeMethod="resize"
        />
        {/* <Text>{JSON.stringify(user)}</Text> */}
        <View style={{ marginHorizontal: 10 }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 25,
              marginVertical: 20,
              color: 'white',
            }}
          >
            {user.name}
          </Text>
          {/* <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              textTransform: 'capitalize',
            }}
          >
            Account Type: {user.userType}
          </Text> */}
        </View>
      </View>
      <Text
        style={{
          color: 'white',
          fontSize: 20,
          marginVertical: 10,
          marginHorizontal: 10,
        }}
      >
        Your order history:
      </Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          // justifyContent: 'center',
        }}
      >
        {orderHistory.map((fileName, index) => (
          <Invoice
            key={index}
            uri={localCacheDir + fileName}
            name={fileName}
            navigation={navigation}
          />
        ))}
      </View>
      <Button style={styles.logOutBtn} onPress={handleLogout}>
        <Text>Log out</Text>
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  logOutBtn: {
    backgroundColor: '#e3e3e3',
    marginHorizontal: 25,
    marginVertical: 15,
  },
})

const mapState = (state) => {
  return {
    user: state.user,
    orderHistory: state.orderHistory,
  }
}
const mapDispatch = (dispatch) => {
  return {
    logOut: () => dispatch(removeUser()),
    fetchOrderHistory: () => dispatch(getOrderHistory()),
  }
}

export default connect(mapState, mapDispatch)(UserProfileHomePage)
