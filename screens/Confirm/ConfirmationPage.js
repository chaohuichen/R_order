import { View } from 'native-base'
import React from 'react'
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native'
import { Text } from 'native-base'
import { connect } from 'react-redux'
const ConfirmationPage = (props) => {
  const { order } = props
  const [isPlacedOrder, setIsPlacedOrder] = useState(false)
  const filteredOrder = order.filter((item) => item.count !== 0)

  const handleOrderSubmit = () => {
    //submit order send pdf send email
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(211,211,211,0.5)',
          }}
        >
          <Text>Invoice</Text>
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
        onPress={() => handleOnLogin()}
      >
        <Text style={styles.loginText}>Place Order</Text>
      </TouchableOpacity>
      {isPlacedOrder && (
        <Modal
          animationType="slide"
          //   transparent={true}
          visible={props.visible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.')
            //   setModalVisible(!modalVisible);
          }}
          presentationStyle={'pageSheet'}
        >
          <View style={styles.container}>
            <Text
              style={[
                textStyle,
                { color: 'black', fontWeight: '600', fontSize: 28 },
              ]}
            >
              Enter Access code
            </Text>
            <TextInput
              mode="outlined"
              label="Code"
              onChangeText={(code) => setAccessCode(code)}
              theme={{
                colors: { primary: 'black', underlineColor: 'transparent' },
              }}
              style={{
                width: 311,
              }}
            />
            <Button
              style={[
                buttonViewStyle,
                {
                  alignSelf: 'center',
                  backgroundColor: MainColors.primary,
                },
              ]}
            >
              <Text style={textStyle}>Access Code</Text>
            </Button>
            <Button
              onPress={() => {
                props.setIsVisible(!props.visible)
              }}
              style={[
                buttonViewStyle,
                {
                  alignSelf: 'center',
                  backgroundColor: MainColors.primary,
                },
              ]}
            >
              <Text style={textStyle}>Go back</Text>
            </Button>
          </View>
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
