import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  SectionList,
  SafeAreaView,
} from 'react-native'
import { removeUser } from '../../redux'
import { getOrder } from '../../redux/Reducers/orderReducer'
import { connect } from 'react-redux'
import Item from '../../components/Item'
import { Text } from 'native-base'
const OrderHomePage = (props) => {
  const { order } = props
  const coffeeData = [
    {
      name: 'Bean 0',
      size: '3oz',
      count: 0,
    },
    {
      name: 'Bean 1',
      size: '5oz',
      count: 0,
    },
    {
      name: 'Bean 2',
      size: '3oz',
      count: 0,
    },
    {
      name: 'Bean 3',
      size: '3oz',
      count: 0,
    },
    {
      name: 'Bean 4',
      size: '7oz',
      count: 0,
    },
    {
      name: 'Bean 5',
      size: '9oz',
      count: 0,
    },
    {
      name: 'Bean 6',
      size: '2oz',
      count: 0,
    },
    {
      name: 'Bean 7',
      size: '8oz',
      count: 0,
    },
  ]
  useEffect(() => {
    props.fetchData(coffeeData)
    return () => {}
  }, [])

  const removeReduxUser = () => {
    props.removeUserData()
  }
  const confirmOrder = () => {
    props.navigation.navigate('ConfirmationPage')
  }
  const renderItem = ({ item, index }) => {
    return (
      <Item
        name={item.name}
        size={item.size}
        key={index}
        index={index}
        count={item.count}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={order}
        numColumns={1}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListHeaderComponent={() => {
          return (
            <View style={styles.titleContainer}>
              <Text style={styles.productDetails}>Product</Text>
              <Text style={styles.productDetails}>Quanitity</Text>
            </View>
          )
        }}
      />

      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.loginButton} onPress={removeReduxUser}>
          <Text style={styles.loginButtonText}>Remove user</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={confirmOrder}>
          <Text style={styles.loginButtonText}>Comfirm Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingRight: '10%',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(211,211,211,0.5)',
  },
  productDetails: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  // productDetailsQuantity: {
  //   marginLeft: 40,
  //   fontWeight: "bold",
  // },

  buttonView: {
    flexDirection: 'row',
  },
  loginButton: {
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    backgroundColor: 'black',
    opacity: 0.8,
    flex: 1 / 2,
    marginTop: 20,
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
})
const mapDispatch = (dispatch) => {
  return {
    fetchData: (order) => dispatch(getOrder(order)),
  }
}
const mapState = (state) => {
  return {
    order: state.order,
    count: state.order.count,
  }
}
export default connect(mapState, mapDispatch)(OrderHomePage)
