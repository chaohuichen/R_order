import { View, Text, SafeAreaView } from 'react-native'
import { Button } from 'native-base'
import * as Haptics from 'expo-haptics'
const OrderSuccessPage = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flexGrow: 1, alignItems: 'center' }}>
      <View
        style={{
          height: 300,
          width: 300,
          borderColor: 'white',
          borderRadius: 300 / 2,
          borderStyle: 'solid',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        <Text style={{ fontSize: 200 }}>🎉</Text>
      </View>
      <Text
        style={{
          marginTop: 30,
          color: 'white',
          fontWeight: 'bold',
          fontSize: 40,
        }}
      >
        Order Successful
      </Text>

      <View style={{ alignItems: 'center', marginTop: 50 }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 30 }}>
          Thank You!
        </Text>

        <Text
          style={{
            marginTop: 30,
            color: 'white',
            fontWeight: '600',
            fontSize: 20,
          }}
        >
          On my way to your room!
        </Text>
      </View>
      <Button
        size="lg"
        style={{
          position: 'absolute',
          bottom: 40,
          width: 350,
          height: 60,
          backgroundColor: '#BEAC74',
          borderRadius: 15,
          fontWeight: 'bold',
          zIndex: 99,
        }}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'OrderHomeScreen' }],
          })
        }
      >
        Order More
      </Button>
    </SafeAreaView>
  )
}

export default OrderSuccessPage
