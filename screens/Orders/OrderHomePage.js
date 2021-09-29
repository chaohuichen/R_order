import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SectionList,
  Button,
} from 'react-native'
import { removeUser } from '../../redux'
import { getOrder, clearOrder } from '../../redux/Reducers/orderReducer'
import { connect } from 'react-redux'
import Item from '../../components/Item'
import { Text } from 'native-base'
import { db } from '../../API/FirebaseDatabase'
const OrderHomePage = (props) => {
  const [data, setData] = useState()
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
        setData(productsData)
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
  const renderItem = ({ item, index }) => {
    return (
      <Item
        name={item.name}
        key={index}
        index={index}
        count={item.count}
        description={item.description}
        size={item.size}
      />
    )
  }
  const resetData = () => {
    props.resetOrder()
    console.log(props.order)
  }

  return (
    <View style={styles.container}>
      <SectionList
        style={{ flex: 1 }}
        sections={data}
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
            <TouchableOpacity
              style={{
                width: 50,
                height: 30,
                backgroundColor: 'black',
                borderRadius: 3,
                justifyContent: 'center',
              }}
              onPress={() => resetData()}
            >
              <Text style={styles.loginButtonText}>Clear </Text>
            </TouchableOpacity>
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
      <View style={styles.buttonView}>
        {/* <TouchableOpacity
          style={styles.loginButton}
          onPress={() => removeReduxUser()}
        >
          <Text style={styles.loginButtonText}>Remove user</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => confirmOrder()}
        >
          <Text style={styles.loginButtonText}>Comfirm Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
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
    resetOrder: () => dispatch(clearOrder()),
  }
}
const mapState = (state) => {
  return {
    order: state.order,
    count: state.order.count,
  }
}
export default connect(mapState, mapDispatch)(OrderHomePage)
