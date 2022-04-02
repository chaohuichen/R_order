import React, { useState, useRef, useEffect } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  View,
  Text,
  ScrollView,
} from 'react-native'
import { connect } from 'react-redux'

import {
  clearOrder,
  addOrder,
  removeOrder,
} from '../../redux/Reducers/orderReducer'
import * as FileSystem from 'expo-file-system'
import Spinner from 'react-native-loading-spinner-overlay'
import AppLoading from '../../components/AppLoading'
import moment from 'moment'
import Api from '../../API'
import { StackActions } from '@react-navigation/native'
import { getOrderHistory, editLocation, editInstruction } from '../../redux'
import ProduceSingleItem from '../../components/ProduceSingleItem'
import * as Haptics from 'expo-haptics'
import AppButton from '../../components/AppButton'
import InstructionInput from './InstructionInput'

import DismissKeyboard from '../../components/DismissKeyboard'
const locations = [
  'CHAIRMAN',
  'SECRETARY',
  'DIRECTOR',
  'CONFERENCE',
  'LEGAL',
  'MEETING',
  'CEO',
  'CONSULTANT',
  'IT',
  'ACCOUNTANT',
]

const ConfirmationPage = (props) => {
  const { allOrder } = props

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // // map all the data from redux
    // const copyData = []
    // allOrder.forEach((singleOrder) => {
    //   let copySingleOrder = []
    //   // filter out / push in if any item count >0
    //   singleOrder.data.forEach((singleItem) => {
    //     if (singleItem.count > 0) {
    //       copySingleOrder.push(singleItem)
    //     }
    //   })
    //   //check the size of the items
    //   if (copySingleOrder.length > 0) {
    //     copyData.push({ data: copySingleOrder, title: singleOrder.title })
    //   }
    // })
    // setOrders(copyData)
  }, [])

  const removeItem = (order, index, sectionTitle) => {
    props.removeOnOrder(order, index, sectionTitle)
  }
  const addItem = (order, index, sectionTitle) => {
    props.addToOrder(order, index, sectionTitle)
  }

  const handlePlaceOrder = () => {
    const copyData = []
    allOrder.forEach((singleOrder) => {
      let copySingleOrder = []
      // filter out / push in if any item count >0
      singleOrder.data.forEach((singleItem) => {
        if (singleItem.count > 0) {
          copySingleOrder.push(singleItem)
        }
      })
      //check the size of the items
      if (copySingleOrder.length > 0) {
        copyData.push({ data: copySingleOrder, title: singleOrder.title })
      }
    })
    if (copyData.length === 0) {
      Alert.alert(
        'Oops',
        'Your cart seems empty, please add more to your order',
        [
          {
            text: 'Ok',
            onPress: () => props.navigation.goBack(),
          },
        ]
      )
    } else {
      setLoading(true)
      Api.post('/tgghqOrder/messages', {
        cart: copyData,
        location: props.location,
        userNotes: props.userInsturction,
      })
        .then((res) => {
          //reset cart and reset note, location?
          if (res.data.success) {
            props.resetOrder()
            props.clearInstruction()
            setTimeout(() => {
              setLoading(false)
              props.navigation.dispatch(
                StackActions.replace('OrderSuccessPage', {})
              )
            }, 500)
          } else {
            Alert.alert(
              'Oops',
              'There is an error on your order, please try again.'
            )
          }
        })
        .catch((err) => {
          console.log(err)
          setLoading(true)
        })
    }
  }

  return (
    <>
      <DismissKeyboard>
        <ScrollView contentContainerStyle={styles.container}>
          <InstructionInput />
          {loading && (
            <Spinner
              color="black"
              visible={true}
              // textContent={'signing in....'}
              customIndicator={
                <View
                  style={{
                    borderRadius: 25,
                    height: 100,
                    width: 100,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                  }}
                >
                  <AppLoading color="white" />
                </View>
              }
            />
          )}
          <View
            style={{
              padding: 10,
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>
              Room Location:
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {locations.map((singleLocation, index) => {
                return (
                  <AppButton
                    key={index}
                    onPress={() => {
                      props.changeLocation(singleLocation)
                    }}
                    style={{
                      marginHorizontal: 5,
                      marginVertical: 7,
                      backgroundColor:
                        props.location === singleLocation ? 'green' : '#ebecf0',
                    }}
                  >
                    <Text
                      style={{
                        color:
                          props.location === singleLocation ? 'white' : 'black',
                        fontWeight: 'bold',
                        fontSize: 14,
                      }}
                    >
                      {singleLocation}
                    </Text>
                  </AppButton>
                )
              })}
            </View>
          </View>
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>
              {' '}
              Your Orders:{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                props.resetOrder()
                setOrders([])
              }}
            >
              <Text style={{ color: 'red' }}>Clear All</Text>
            </TouchableOpacity>
          </View>
          {allOrder.map((section) => {
            return section.data.map((item, index) => {
              if (item.count > 0) {
                return (
                  <ProduceSingleItem
                    key={index}
                    order={item}
                    removeItem={() => {
                      removeItem(item, index, section.title)
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                    }}
                    addItem={() => {
                      addItem(item, index, section.title)
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                    }}
                    sectionTitle={section.title}
                  />
                )
              }
            })
          })}
        </ScrollView>
      </DismissKeyboard>
      <TouchableOpacity style={styles.loginButton} onPress={handlePlaceOrder}>
        <Text style={styles.loginText}>Place Order</Text>
      </TouchableOpacity>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
    paddingBottom: '25%',
  },
  loginButton: {
    position: 'absolute',

    bottom: 20,
    zIndex: 99,
    justifyContent: 'center',
    height: 70,
    alignSelf: 'center',
    width: '90%',
    backgroundColor: '#BEAC74',
    borderRadius: 25,
  },
  loginText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  selectionButtonView: {
    alignSelf: 'center',
    fontSize: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    width: '90%',
    marginVertical: 10,
    height: 50,
    borderRadius: 5,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(211,211,211,0.5)',
    paddingLeft: 15,
    width: '100%',
    height: 90,
  },
  actionBox: {
    marginRight: 10,
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
const mapState = (state) => {
  return {
    allOrder: state.order,
    user: state.user,
    location: state.location,
    userInsturction: state.instruction,
  }
}

const mapDispatch = (dispatch) => {
  return {
    resetOrder: () => dispatch(clearOrder()),
    addToOrder: (name, index, sectionTitle) =>
      dispatch(addOrder(name, index, sectionTitle)),
    removeOnOrder: (name, index, orderIndex) =>
      dispatch(removeOrder(name, index, orderIndex)),
    fetchOrderHistory: () => dispatch(getOrderHistory()),
    changeLocation: (location) => dispatch(editLocation(location)),
    clearInstruction: () => dispatch(editInstruction('')),
  }
}
export default connect(mapState, mapDispatch)(ConfirmationPage)
