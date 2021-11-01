import React, { useState, useRef, useEffect } from 'react'
import { View } from 'native-base'
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SectionList,
  Alert,
} from 'react-native'
import { Text } from 'native-base'
import { connect } from 'react-redux'
import ComfirmationPicker from './ComfirmationPicker'
import RBSheet from 'react-native-raw-bottom-sheet'
import { clearOrder } from '../../redux/Reducers/orderReducer'
import axios from 'axios'
import { insertHtml } from '../html/HtmlTemplate'
import * as Sharing from 'expo-sharing'
import * as FileSystem from 'expo-file-system'
const ConfirmationPage = (props) => {
  const { allOrder } = props
  const [selectedToValue, setSelectedToValue] = useState('fillup logistics')
  const [selectedFromValue, setSelectedFromValue] = useState('fillup NY1')
  const pickerItems = [
    'none',
    'fillup logistics',
    'fillup mgt',
    'fillup roaster',
  ]
  const pickerStores = ['none', 'fillup NY1', 'fillup NY2', 'fillup NY3']
  const [isPicker, setIsPicker] = useState(false)
  const rbsheetRef = useRef()
  const [orders, setOrders] = useState([])
  const [pdfUrl, setPdfUrl] = useState()

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

  const openPickerStore = () => {
    setIsPicker(true)
    rbsheetRef.current.open()
  }
  const openPickerItem = () => {
    setIsPicker(false)
    rbsheetRef.current.open()
  }
  const updateSelectedValue = (value) => {
    if (isPicker) {
      setSelectedFromValue(value)
    } else {
      setSelectedToValue(value)
    }
  }
  const sharePdf = async (url) => {
    try {
      const { uri } = await FileSystem.downloadAsync(
        url,
        FileSystem.documentDirectory + 'invoice-6.pdf'
      )
      await Sharing.shareAsync(uri)
      console.log('Finished downloading to ', uri)
    } catch (error) {
      console.error(error)
    }
    // props.navigation.navigate('PdfView')
  }

  const createOrderString = () => {
    let orderString = ''
    let dividerLine = '------------'
    if (selectedFromValue !== 'none' && selectedToValue !== 'none') {
      for (const order of orders) {
        let tempStr = ''
        let title = order.title
        tempStr = '\n' + title + '\n' + dividerLine + '\n'
        let itemStr = ''
        for (let item of order.data) {
          itemStr += `(${item.count})\t` + item.name + '\n'
        }
        tempStr += itemStr + '\n'
        orderString += tempStr
      }

      orderString =
        'From\n ' +
        `${selectedToValue}\n` +
        '646-552-8898\n' +
        '530 5th Ave, New York, NY 10036\n' +
        'To\n' +
        'Sonng Liu\n' +
        `${selectedFromValue}\n` +
        '636-469-9628\n' +
        '2468 Broadway, New York, NY 10025 \n' +
        orderString
      return orderString
    } else {
      Alert.alert('Location is not selected', 'Please select location', {
        text: 'Ok',
        style: 'cancel',
      })
    }
  }
  const placeOrder = async () => {
    const orderString = createOrderString()
    if (orders.length !== 0) {
      const html = insertHtml(orders)
      axios
        .post(
          'http://f800-216-158-137-35.ngrok.io/api/fillupSupplyAPI/sendSms',
          {
            phoneNumber: props.user.userPhoneNumber,
            orderString,
            orders,
          }
        )
        .catch(function (error) {
          console.log(error)
        })
      createPdf(html)
    } else {
      Alert.alert('Nothing in cart', 'add order to cart', {
        text: 'Ok',
        style: 'cancel',
      })
    }
  }
  const createPdf = (html) => {
    axios('http://f800-216-158-137-35.ngrok.io/api/fillupSupplyAPI/createPdf', {
      method: 'post',
      data: { html },
    })
      .then((res) => {
        console.log('res data ', res.data)
        orderSuccessAlert(res.data)
      })
      .catch((err) => console.log('axios post err ', err))
  }
  const orderSuccessAlert = (url) => {
    Alert.alert('Ordered Success', 'press ok to save a copy', [
      {
        text: 'Ok',
        onPress: () => sharePdf(url),
        style: 'cancel',
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ])
    props.resetOrder()
    setOrders([])
  }
  const renderItem = ({ item }) => {
    if (item.count > 0) {
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(211,211,211,0.5)',
            flex: 1,
          }}
        >
          <Text style={{ flexWrap: 'wrap', width: '70%' }}>{item.name}</Text>
          <Text
            style={{
              width: '10%',
              textAlign: 'center',
            }}
          >
            {item.count}
          </Text>
        </View>
      )
    }
    return null
  }
  return (
    <SafeAreaView style={styles.container}>
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
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <TouchableWithoutFeedback onPress={() => openPickerItem()}>
          <View style={styles.selectionButtonView}>
            <Text>{selectedToValue ? selectedToValue : 'To'}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => openPickerStore()}>
          <View style={styles.selectionButtonView}>
            <Text>{selectedFromValue ? selectedFromValue : 'From'}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <SectionList
        style={{ flex: 1 }}
        sections={orders}
        renderItem={renderItem}
        keyExtractor={(item, index) => item + index}
        stickySectionHeadersEnabled={false}
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
              <Text style={{ fontSize: 20, fontWeight: '500' }}>{title}</Text>
              <Text style={{ fontSize: 20, fontWeight: '500' }}>QTY</Text>
            </View>
          )
        }}
      >
        <View style={{ flex: 3 }}>
          <Text style={{ marginLeft: 20, fontWeight: '600', fontSize: 30 }}>
            Items
          </Text>
        </View>
      </SectionList>
      <TouchableOpacity style={styles.loginButton} onPress={() => placeOrder()}>
        <Text style={styles.loginText}>Place Order</Text>
      </TouchableOpacity>
      <RBSheet
        ref={rbsheetRef}
        height={300}
        openDuration={250}
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => rbsheetRef.current.close()}
        >
          <Text
            style={{
              flex: 1,
              textAlign: 'left',
              fontSize: 20,
              marginLeft: 20,
              color: '#006ee6',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
        {/** Need to Optimize to a better solution */}
        <ComfirmationPicker
          selectedFromValue={selectedFromValue}
          setSelectedFromValue={updateSelectedValue}
          selectedToValue={selectedToValue}
          setSelectedToValue={updateSelectedValue}
          isPicker={isPicker}
          pickerItems={isPicker ? pickerStores : pickerItems}
        />
      </RBSheet>
    </SafeAreaView>
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
    bottom: 10,
  },
  loginText: {
    color: 'white',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 20,
  },
  selectionButtonView: {
    fontSize: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    width: '90%',
    marginVertical: 10,
    height: 50,
    borderRadius: 5,
  },
})
const mapState = (state) => {
  return {
    allOrder: state.order,
    user: state.user,
  }
}

const mapDispatch = (dispatch) => {
  return {
    resetOrder: () => dispatch(clearOrder()),
  }
}
export default connect(mapState, mapDispatch)(ConfirmationPage)
