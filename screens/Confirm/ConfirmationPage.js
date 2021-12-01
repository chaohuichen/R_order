import React, { useState, useRef, useEffect } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SectionList,
  Alert,
  View,
} from 'react-native'
import { Text } from 'native-base'
import { connect } from 'react-redux'
import ComfirmationPicker from './ComfirmationPicker'
import RBSheet from 'react-native-raw-bottom-sheet'
import { clearOrder } from '../../redux/Reducers/orderReducer'
import { insertMultiPageHtml } from './CreateHtml'
import * as FileSystem from 'expo-file-system'
import Spinner from 'react-native-loading-spinner-overlay'
import AppLoading from '../../components/AppLoading'
import moment from 'moment'
import Api from '../../API'
import { StackActions } from '@react-navigation/native'
const ConfirmationPage = (props) => {
  const { allOrder } = props
  const [selectedToValue, setSelectedToValue] = useState('Fillup Logistics')
  const [selectedFromValue, setSelectedFromValue] = useState('Fillup NY1')
  const pickerItems = ['Fillup Logistics', 'Fillup MGT']
  const pickerStores = ['Fillup NY1', 'fillup NY2', 'fillup NY3']
  const [isPicker, setIsPicker] = useState(false)
  const rbsheetRef = useRef()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
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
  const createSmsMessage = async () => {
    const orderString = createOrderString()
    setLoading(true)

    if (orders.length !== 0) {
      const html = insertMultiPageHtml(
        orders,
        selectedFromValue,
        selectedToValue
      )
      const newHtml = html.replaceAll('undefined', ' ')
      Api.post('fillupSupplyAPI/sendSms', {
        phoneNumber: props.user.userPhoneNumber,
        orderString,
        orders,
      }).catch(function (error) {
        console.log('axios post send sms ', error)
      })
      createPdf(newHtml)
    } else {
      Alert.alert('Nothing in cart', 'add order to cart', {
        text: 'Ok',
        style: 'cancel',
      })
    }
  }
  const createPdf = async (html) => {
    let now = moment()
    let date = now.format('DD_MM_YY_HH:MM:SS')

    Api('fillupSupplyAPI/createPdf', {
      method: 'post',
      data: { html, date },
    })
      .then((res) => {
        downloadToLocal(res.data, date)
      })
      .catch((err) => console.log('axios post err ', err))
  }
  const downloadToLocal = async (url, date) => {
    try {
      const { uri } = await FileSystem.downloadAsync(
        url,
        FileSystem.documentDirectory + `${date}_invoice.pdf`
      )
      orderSuccessAlert(uri)
    } catch (err) {
      console.log('downlaod err ', err)
    }
  }
  const orderSuccessAlert = (uri) => {
    setLoading(false)
    props.resetOrder()
    setOrders([])
    setTimeout(() => {
      Alert.alert('Ordered Success', 'press ok to view invoice', [
        {
          text: 'Ok',
          onPress: () =>
            props.navigation.dispatch(
              StackActions.replace('PdfView', {
                uri,
              })
            ),
          style: 'cancel',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ])
    }, 200)
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
          <Text style={{ flexWrap: 'wrap', width: '70%', color: 'white' }}>
            {item.name}
          </Text>
          <Text
            style={{
              width: '10%',
              textAlign: 'center',
              color: 'white',
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

      <Text
        style={{
          fontWeight: '500',
          marginLeft: 20,
          fontSize: 20,
          marginTop: 10,
          color: 'white',
        }}
      >
        From:
      </Text>
      <TouchableWithoutFeedback onPress={() => openPickerItem()}>
        <View style={styles.selectionButtonView}>
          <Text style={{ fontWeight: '900' }}>
            {selectedToValue ? selectedToValue : 'To'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <Text
        style={{
          fontWeight: '500',
          fontSize: 20,
          marginLeft: 20,
          color: 'white',
        }}
      >
        To:
      </Text>
      <TouchableWithoutFeedback onPress={() => openPickerStore()}>
        <View style={styles.selectionButtonView}>
          <Text style={{ fontWeight: '900' }}>
            {selectedFromValue ? selectedFromValue : 'From'}
          </Text>
        </View>
      </TouchableWithoutFeedback>

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
              <Text style={{ fontSize: 20, fontWeight: '500', color: 'white' }}>
                {title}
              </Text>
              <Text style={{ fontSize: 20, fontWeight: '500', color: 'white' }}>
                QTY
              </Text>
            </View>
          )
        }}
      >
        <View style={{ flex: 3 }}>
          <Text
            style={{
              marginLeft: 20,
              fontWeight: '600',
              fontSize: 30,
              color: 'white',
            }}
          >
            Items
          </Text>
        </View>
      </SectionList>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => createSmsMessage()}
      >
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
    backgroundColor: 'black',
  },
  loginButton: {
    justifyContent: 'center',
    height: 50,
    alignSelf: 'center',
    backgroundColor: '#BEAC74',
    borderRadius: 0,
    width: '100%',
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
