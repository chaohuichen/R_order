import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SectionList,
  Button,
  Text,
} from 'react-native'
import { removeUser } from '../../redux'
import { getOrder, clearOrder } from '../../redux/Reducers/orderReducer'
import { connect } from 'react-redux'
import Item from '../../components/Item'
import { db } from '../../API/FirebaseDatabase'
const OrderHomePage = (props) => {
  useEffect(() => {
    db.ref('/productData').once('value', (snapshot) => {
      if (snapshot.exists()) {
        let productsData = []
        for (let key in snapshot.val()) {
          let title = key
          let data = Object.values(snapshot.val()[`${title}`])
          if (title && data) {
            let payload = {
              title,
              data,
            }
            productsData.push(payload)
          }
        }
        // setData(productsData)
        props.fetchData(productsData)
      }
    })
    return () => {}
  }, [])

  const removeReduxUser = () => {
    props.removeUserData()
  }
  const confirmOrder = () => {
    props.navigation.navigate('ConfirmationPage')
  }
  const renderItem = ({ item, index, section }) => {
    return (
      <Item
        key={index}
        index={index}
        order={item}
        sectionTitle={section.title}
      />
    )
  }

  return (
    <View style={styles.container}>
      <SectionList
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: '20%' }}
        sections={[...props.order] || []}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <View
            style={{
              padding: 20,
              borderBottomColor: 'rgba(221,221,221,0.5)',
              borderBottomWidth: 1,
              flex: 1,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: '500' }}>{title} </Text>
          </View>
        )}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={() => {
          return (
            <View style={styles.titleContainer}>
              <Text style={styles.productDetails}>Product</Text>
              <Text style={styles.productDetails}>Quanitity</Text>
            </View>
          )
        }}
      />

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => removeReduxUser()}
      >
        <Text style={styles.loginButtonText}>Remove user</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.loginButton}
        onPress={() => confirmOrder()}
      >
        <Text style={styles.loginButtonText}>Comfirm Order</Text>
      </TouchableOpacity> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
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
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginButton: {
    justifyContent: 'center',
    height: 50,
    width: 300,
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: 'black',
    position: 'absolute',
    bottom: 10,
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
})
const mapDispatch = (dispatch) => {
  return {
    fetchData: (order) => dispatch(getOrder(order)),
    resetOrder: () => dispatch(clearOrder()),
    removeUserData: () => dispatch(removeUser()),
  }
}
const mapState = (state) => {
  return {
    order: state.order,
    user: state.user,
  }
}
export default connect(mapState, mapDispatch)(OrderHomePage)
