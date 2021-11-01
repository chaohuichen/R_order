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
import Spinner from 'react-native-loading-spinner-overlay'
import AppLoading from '../../components/AppLoading'
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
  const insertMultiPageHtml = () => {
    var htmlArr = []
    var tempStr = []
    var itemStr = []
    var pageWrapStr = ''
    for (let order of orders) {
      for (let item of order.data) {
        tempStr.push(`<tr>
        <td style="text-align:left">${item.name}</td>
        <td>${item.count}</td>
        <td>${0}</td>
        <td>${0}</td>
        </tr> `)
      }
    }
    if (orders.length > 4) {
      console.log('444444')
      for (var j = 0; j < tempStr.length; j++) {
        let counter = 0
        if (counter < 4) {
          var tempJ = tempJ + tempStr[j]
          counter++
        } else {
          itemStr.push(tempJ)
          counter = 0
        }
        tempJ = ''
      }
      for (var i = 0; i < itemStr.length; i++) {
        pageWrapStr = insertHtml(
          itemStr[i],
          selectedFromValue,
          selectedToValue,
          '11-01-2021',
          '#1234567890'
        )
        htmlArr.push(pageWrapStr)
      }
    } else {
      tempStr.join('')
      pageWrapStr = insertHtml(
        tempStr,
        selectedFromValue,
        selectedToValue,
        '11-01-2021',
        '#1234567890'
      )
      htmlArr.push(pageWrapStr)
    }
    htmlArr.join('')

    const htmlContent = `
    <!DOCTYPE html>
      <html>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200&family=Oswald:wght@200&display=swap"
            rel="stylesheet"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300&family=Oswald:wght@200&display=swap"
        rel="stylesheet"
      />
          </head>
          <style>
            * {
              margin: 0;
              padding: 0;
            }
            body {
              font: 14px/1.4 Georgia, serif;
            }
            #page-wrap {
              display: flex;
              flex-direction: column;
              align-items: center;
              height: 800px;
              width: 540px;
              margin: 0 auto;
              
            }
            table {
              border-collapse: collapse;
            }
            td {
              padding: 15px;
              font-size: 12px;
            }
            th {
              padding-bottom: 5px;
              padding-top: 5px;
            }
            tr:nth-child(even) {
              background-color: #dddddd;
            }
        
            .title-tr {
              background-color: black;
              color: white;
            }
            .row:after {
              content: '';
              display: table;
              clear: both;
            }
            .col {
              float: left;
              width: 50%;
            }
            .col-2 {
              float: right;
              width: 50%;
            }
            td {
              text-align: center;
              font-size: 12px;
            }
            h1 {
              font-family: 'Oswald';
              font-weight: 900;
              font-size: xx-large;
            }
            #subheading {
              font-family: 'Montserrat', sans-serif;
              font-size: 12px;
            }
          </style>
          <body>
            ${htmlArr}
          </body>
        </html>
    `
    return htmlContent
  }
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
        FileSystem.documentDirectory + 'invoice-20.pdf'
      )
      props.navigation.navigate('PdfView', {
        uri,
      })
      console.log('Finished downloading to ', uri)
    } catch (error) {
      console.error(error)
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
  const placeOrder = async () => {
    const orderString = createOrderString()
    setLoading(true)
    if (orders.length !== 0) {
      const html = insertMultiPageHtml()
      console.log('html: ', html)
      axios
        .post(
          'http://b61a-216-158-137-35.ngrok.io/api/fillupSupplyAPI/sendSms',
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
    axios('http://b61a-216-158-137-35.ngrok.io/api/fillupSupplyAPI/createPdf', {
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
    setLoading(false)
    props.resetOrder()
    setOrders([])
    setTimeout(() => {
      Alert.alert('Ordered Success', 'press ok to view invoice', [
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
