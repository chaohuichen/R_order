import React, { useState } from 'react'
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
import Item from '../../components/Item'
const ConfirmationPage = (props) => {
  const { allOrder } = props

  const [isPlacedOrder, setIsPlacedOrder] = useState(false)
  const [email, setEmail] = useState('')
  console.log('all order ', allOrder)
  console.log('all order order ', allOrder.order)
  const handlePlaceOrder = () => {
    //submit order send pdf send email send sms
    setIsPlacedOrder(true)
  }
  const onPaySubmition = () => {
    // payment
  }
  const renderItem = ({ item, index }) => {
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
        <Text>
          {item.name}
          {'\n'}
          <Text sub={true}>{item.size}</Text>
        </Text>
        <Text>{item.count}</Text>
      </View>
    )
  }
  return (
    <SectionList
      style={{ flex: 1 }}
      sections={[]}
      renderItem={renderItem}
      keyExtractor={(item, index) => item + index}
      renderSectionHeader={() => (
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
      ListHeaderComponent={() => {
        return (
          <>
            <ComfirmationPicker />
          </>
        )
      }}
    >
      <View style={{ flex: 3 }}>
        <Text style={{ marginLeft: 20, fontWeight: '600', fontSize: 30 }}>
          Items
        </Text>

        {allOrder.order.map((item, index) => (
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
            <Text>
              {item.name}
              {'\n'}
              <Text sub={true}>{item.size}</Text>
            </Text>
            <Text>{item.count}</Text>
          </View>
        ))}

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => handlePlaceOrder()}
        >
          <Text style={styles.loginText}>Place Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={() => viewPDF()}>
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
              <Text style={{ color: 'black', fontWeight: '600', fontSize: 28 }}>
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

export default connect(mapState, null)(ConfirmationPage)
