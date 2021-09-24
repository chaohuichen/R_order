import React, { useState } from 'react'
import { View } from 'native-base'
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
} from 'react-native'
import { Text } from 'native-base'
import { connect } from 'react-redux'
import { TextInput } from 'react-native-paper'
import AppIcons from '../../components/AppIcons'

const ConfirmationPage = (props) => {
  const { order } = props
  const [isPlacedOrder, setIsPlacedOrder] = useState(false)
  const filteredOrder = order.filter((item) => item.count !== 0)
  const [email, setEmail] = useState('')
  const handlePlaceOrder = () => {
    //submit order send pdf send email send sms
    setIsPlacedOrder(true)
  }
  const onPaySubmition = () => {
    // payment
  }
  const viewPDF = () => {
    props.navigation.navigate('PDFpage')
  }
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          alignSelf: 'left',
          paddingTop: '2%',
        }}
      >
        <AppIcons
          type="Ionicons"
          name="chevron-back"
          size={30}
          onPress={() => props.navigation.pop()}
        />
      </View>
      <ScrollView>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            borderBottomWidth: 1,
            padding: 10,
            borderBottomColor: 'rgba(211,211,211,0.5)',
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: '500' }}>Invoice</Text>
        </View>
        {filteredOrder.map((item, index) => (
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
      </ScrollView>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => handlePlaceOrder()}
      >
        <Text style={styles.loginText}>Place Order</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={() => viewPDF()}>
        <Text style={styles.loginText}>View</Text>
      </TouchableOpacity>
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
    order: state.order,
  }
}

export default connect(mapState, null)(ConfirmationPage)
