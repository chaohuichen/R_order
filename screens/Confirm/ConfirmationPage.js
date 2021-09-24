import { View } from 'native-base'
import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { Text } from 'native-base'
import { connect } from 'react-redux'
const ConfirmationPage = (props) => {
  const { order } = props
  const filteredOrder = order.filter((item) => item.count !== 0)
  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
})
const mapState = (state) => {
  return {
    order: state.order,
  }
}

export default connect(mapState, null)(ConfirmationPage)
