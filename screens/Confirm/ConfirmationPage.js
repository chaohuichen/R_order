import React, { useState, useEffect } from 'react'
import { View } from 'native-base'
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  SectionList,
} from 'react-native'
import { Text } from 'native-base'
import { connect } from 'react-redux'
import { TextInput } from 'react-native-paper'
import AppIcons from '../../components/AppIcons'
import ComfirmationPicker from './ComfirmationPicker'
import { clearOrder } from '../../redux/Reducers/orderReducer'

const ConfirmationPage = (props) => {
  const { allOrder } = props

  const [isPlacedOrder, setIsPlacedOrder] = useState(false)
  const [email, setEmail] = useState('')
  const [orders, setOrders] = useState([])

  useEffect(() => {
    // map all the data from redux
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
    setOrders(copyData)
  }, [])

  const handlePlaceOrder = () => {
    //submit order send pdf send email send sms
    setIsPlacedOrder(true)
  }
  const onPaySubmition = () => {
    // payment
  }
  const renderItem = ({ item, index }) => {
    if (item.count > 0) {
      return (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(211,211,211,0.5)',
          }}
        >
          <Text>{item.name} </Text>
          <Text>{item.count}</Text>
        </View>
      )
    }
    return null
  }
  return (
    <>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}> Your Orders: </Text>
        <TouchableOpacity
          onPress={() => {
            props.resetOrder()
            setOrders([])
          }}
        >
          <Text style={{ color: 'red', marginRight: '5%' }}>Clear All</Text>
        </TouchableOpacity>
      </View>
      <SectionList
        style={{ flex: 1 }}
        sections={orders}
        renderItem={renderItem}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={({ section: { title } }) => {
          return (
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
              <Text style={{ fontSize: 20, fontWeight: '500' }}>QTY</Text>
            </View>
          )
        }}
        ListHeaderComponent={() => {
          return <ComfirmationPicker />
        }}
      >
        <View style={{ flex: 3 }}>
          <Text style={{ marginLeft: 20, fontWeight: '600', fontSize: 30 }}>
            Items
          </Text>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => handlePlaceOrder()}
          >
            <Text style={styles.loginText}>Place Order</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => viewPDF()}
          >
            <Text style={styles.loginText}>View</Text>
          </TouchableOpacity>
        </View>
        {isPlacedOrder && (
          <Modal
            animationType="slide"
            visible={props.visible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.')
              //   setModalVisible(!modalVisible);
            }}
            presentationStyle={'pageSheet'}
          >
            <ScrollView>
              <View style={{ alignSelf: 'left', padding: '2%' }}>
                <AppIcons
                  type="Ionicons"
                  name="close"
                  size={30}
                  onPress={() => setIsPlacedOrder(false)}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{ color: 'black', fontWeight: '600', fontSize: 28 }}
                >
                  Enter email address
                </Text>
                <TextInput
                  mode="outlined"
                  label="Email"
                  onChangeText={(email) => setEmail(email)}
                  style={{ width: 300, alignSelf: 'center' }}
                  theme={{
                    colors: { underlineColor: 'transparent', primary: 'black' },
                  }}
                />

                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() => onPaySubmition()}
                >
                  <Text style={styles.loginText}>Pay</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Modal>
        )}
      </SectionList>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
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
    allOrder: state.order,
  }
}

const mapDispatch = (dispatch) => {
  return {
    resetOrder: () => dispatch(clearOrder()),
  }
}
export default connect(mapState, mapDispatch)(ConfirmationPage)
