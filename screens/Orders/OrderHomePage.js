import React, { useState, useEffect, useCallback } from 'react'
import { removeUser, editInstruction } from '../../redux'
import {
  getOrder,
  clearOrder,
  addOrder,
  removeOrder,
} from '../../redux/Reducers/orderReducer'
import { connect } from 'react-redux'
import ProduceSingleItem from '../../components/ProduceSingleItem'
import { fetchData } from '../../API/databaseCall'
import SectionList from '../../components/AppSectionList'
import {
  LayoutAnimation,
  Platform,
  UIManager,
  StyleSheet,
  View,
  Text,
  RefreshControl,
  KeyboardAvoidingView,
  Alert,
} from 'react-native'
import * as Haptics from 'expo-haptics'
import { useHeaderHeight } from '@react-navigation/elements'
import InstructionInput from '../Confirm/InstructionInput'
import Api from '../../API'
import DateTimePicker from '@react-native-community/datetimepicker'
import { fetchReceviers } from '../../API/databaseCall'
import moment from 'moment'
import AppButton from '../../components/AppButton'
import Spinner from 'react-native-loading-spinner-overlay'
import AppLoading from '../../components/AppLoading'

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

const OrderHomePage = (props) => {
  const [refreshing, setRefreshing] = useState(false)
  // const [offset, setOffset] = useState(1)
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState('datetime')

  const [date, setDate] = useState(WithoutTime(new Date()))
  const [show, setShow] = useState(false)

  //for receviers
  const [receivers, setReceivers] = useState([])
  const [selectedRec, setSelectedRec] = useState([])

  const [firstBoxPosition, setFirstBoxPosition] = useState('down')
  const [offset, setOffset] = useState(0)
  const api_key =
    'lchB_tLREOYMayRaMKrDlFKQIWgEAg0d1y_Nf5kxCG_B6vuptHAXv2E-OA9G7Mw1KBqZ4ycq8Kv3d2RwMUUXxVToUQXgx625w_WkXSWQf7WHhLX6vhbpPUU8fKlwYHYx'

  const headerHeight = useHeaderHeight()
  function WithoutTime(dateTime) {
    var date = new Date(dateTime.getTime())
    date.setHours(18, 0, 0, 0)
    return date
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    fetchData(props.fetchData)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  useEffect(() => {
    fetchData(props.fetchData)
    fetchReceviers(setReceivers, handleReceiverChange)
    return () => {}
  }, [])

  const actionButtonVisibilityHandler = (event) => {
    let currentOffset = event.nativeEvent.contentOffset.y
    let direction = currentOffset > offset ? 'down' : 'up'

    setOffset(currentOffset)
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

    if ((currentOffset < 200 && currentOffset >= 0) || currentOffset < 0) {
      setFirstBoxPosition('down')
    } else if (currentOffset === 0) {
      setFirstBoxPosition('down')
    } else if (direction === 'down') {
      setFirstBoxPosition('up')
    } else {
      setFirstBoxPosition('down')
    }
  }

  const confirmOrder = () => {
    props.navigation.navigate('ConfirmationPage')
  }
  const removeItem = useCallback((order, index, sectionTitle) => {
    props.removeOnOrder(order, index, sectionTitle)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  })
  const addItem = useCallback((order, index, sectionTitle) => {
    props.addToOrder(order, index, sectionTitle)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  })

  //_______________________________________________
  // place order

  const handlePlaceOrder = async () => {
    const copyData = []

    props.order.forEach((singleOrder) => {
      let copySingleOrder = []
      // filter out / push in if any item count >0
      singleOrder.data.forEach((singleItem) => {
        if (singleItem.count > 0) {
          copySingleOrder.push(singleItem)
        }
      })
      //check the size of the items
      if (copySingleOrder.length > 0) {
        copyData.push({ data: copySingleOrder, title: singleOrder.category })
      }
    })
    // finish fiter
    // .....................................................................
    if (copyData.length === 0) {
      Alert.alert(
        'Oops',
        'Your cart seems empty, please add more to your order',
        [
          {
            text: 'Ok',
          },
        ]
      )
    } else if (selectedRec[0] === undefined) {
      Alert.alert('Empty Receiver', 'Please choose a receiver')
    } else if (moment().isAfter(moment(date))) {
      Alert.alert('Wrong time frame', 'Please select a time is in the future')
    } else {
      setLoading(true)
      Api.post('/twilios/restaurantbooking', {
        cart: copyData,
        userNotes: props.userInsturction,
        bookingTime: moment(date).format('MM/DD/yy hh:mm A'),
        selectedReceivers: selectedRec,
      })
        .then((res) => {
          //reset cart and reset note, location?
          if (res.data.success) {
            props.resetOrder()
            props.clearInstruction()
            setTimeout(() => {
              setLoading(false)
              props.navigation.push('OrderSuccessPage', {})
              // props.navigation.dispatch(
              //   StackActions.replace('OrderSuccessPage', {})
              // )
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

  //_________________________________________________
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setShow(false)
    setDate(currentDate)
  }

  const handleReceiverChange = (receiver) => {
    const isSelectedReceiver = isSelected(receiver.phoneNumber)
    if (isSelectedReceiver) {
      setSelectedRec(
        selectedRec.filter((singleRec) => singleRec !== receiver.phoneNumber)
      )
    } else {
      setSelectedRec([receiver.phoneNumber, ...selectedRec])
    }
  }
  const isSelected = (receiver) =>
    selectedRec.some((singleReceiver) => singleReceiver === receiver)

  const renderItem = ({ item, index, section }) => {
    return (
      <ProduceSingleItem
        key={index}
        order={item}
        removeItem={() => {
          removeItem(item, index, section.category)
        }}
        addItem={() => {
          addItem(item, index, section.category)
        }}
        sectionTitle={section.category}
      />
    )
  }
  return (
    <View style={styles.container}>
      {loading && (
        <Spinner
          color="black"
          visible={true}
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
          flexDirection: 'row',
          borderBottomColor: 'white',
          borderBottomWidth: 0.5,
          paddingBottom: 10,
        }}
      >
        <View
          style={{
            backgroundColor: 'black',
            width: '50%',
            alignSelf: 'flex-start',
          }}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 18,
              marginTop: 15,
            }}
          >
            Receivers:
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {receivers.map((singleReceiver, index) => {
              return (
                <AppButton
                  key={index}
                  onPress={() => {
                    handleReceiverChange(singleReceiver)
                  }}
                  style={{
                    marginHorizontal: 5,
                    marginVertical: 7,
                    backgroundColor: isSelected(singleReceiver.phoneNumber)
                      ? 'green'
                      : '#ebecf0',
                  }}
                >
                  <Text
                    style={{
                      color: isSelected(singleReceiver.phoneNumber)
                        ? 'white'
                        : 'black',
                      fontWeight: 'bold',
                      fontSize: 14,
                      textTransform: 'capitalize',
                    }}
                  >
                    {singleReceiver.name}
                  </Text>
                </AppButton>
              )
            })}
          </View>
        </View>
        <View
          style={{
            backgroundColor: 'black',
            width: '50%',
            alignSelf: 'flex-end',
          }}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 18,
              marginTop: 15,
              marginLeft: 15,
            }}
          >
            Time:
          </Text>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
            style={{
              flexGrow: 1,
              width: '100%',
              textColor: 'red',
            }}
            themeVariant="dark"
            minuteInterval={15}
          />
        </View>
      </View>
      <SectionList
        onScroll={(event) => actionButtonVisibilityHandler(event)}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
            titleColor="#fff"
          />
        }
        renderTab={({ category, isActive }) => (
          <View
            style={[
              {
                borderBottomWidth: isActive ? 2 : 0,
                borderBottomColor: 'white',
              },
            ]}
          >
            <Text
              style={[
                {
                  color: isActive ? 'white' : '#9e9e9e',
                  fontWeight: isActive ? 'bold' : '400',
                  padding: 15,
                  fontSize: 18,
                  textTransform: 'capitalize',
                },
              ]}
            >
              {category}
            </Text>
          </View>
        )}
        onEndReachedThreshold={0}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: '35%',
        }}
        sections={props.order || []}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={({ section: { category } }) => (
          <View
            style={{
              padding: 12,
              backgroundColor: 'black',
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: '500',
                color: 'white',
                textTransform: 'capitalize',
              }}
            >
              {category}
            </Text>
          </View>
        )}
        stickySectionHeadersEnabled={false}
      />

      <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight - 45}
        style={[
          styles.keyboardAvoidInput,
          firstBoxPosition === 'up' ? styles.moveDown : styles.moveUp,
        ]}
        behavior="position"
      >
        <InstructionInput handlePlaceOrder={handlePlaceOrder} />
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingRight: '10%',
  },
  productDetails: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  keyboardAvoidInput: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    flexGrow: 1,
  },

  moveDown: {
    bottom: -100,
  },
  moveUp: {
    bottom: 0,
  },
})
const mapDispatch = (dispatch) => {
  return {
    fetchData: (order) => dispatch(getOrder(order)),
    resetOrder: () => dispatch(clearOrder()),
    removeUserData: () => dispatch(removeUser()),
    addToOrder: (name, index, sectionTitle) =>
      dispatch(addOrder(name, index, sectionTitle)),
    removeOnOrder: (name, index, orderIndex) =>
      dispatch(removeOrder(name, index, orderIndex)),
    clearInstruction: () => dispatch(editInstruction('')),
  }
}
const mapState = (state) => {
  return {
    order: state.order,
    user: state.user,
    userInsturction: state.instruction,
  }
}
export default connect(mapState, mapDispatch)(OrderHomePage)
