import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { View, TouchableWithoutFeedback, StyleSheet, Text } from 'react-native'
import { Badge } from 'react-native-paper'
import AppIcons from '../../components/AppIcons'

const ConfirmBtn = ({ confirmOrder, order }) => {
  const [orderNum, setOrderNum] = useState(0)
  useEffect(() => {
    if (order) {
      let count = 0
      for (let item of order) {
        for (let ele of item.data) {
          if (ele.count > 0) {
            count += ele.count
          }
        }
      }

      setOrderNum(count)
    }
  }, [order])
  return (
    <TouchableWithoutFeedback onPress={confirmOrder}>
      <View style={styles.confirmButton}>
        <View
          style={{
            color: 'white',
            position: 'absolute',
            left: 20,
            top: 20,
          }}
        >
          {orderNum !== 0 && (
            <Badge
              size={50}
              style={{
                position: 'absolute',
                bottom: 15,
                left: 15,
                fontWeight: 'bold',
                fontSize: 25,
                zIndex: 99,
              }}
            >
              {orderNum}
            </Badge>
          )}
          <AppIcons
            type="AntDesign"
            name="shoppingcart"
            size={32}
            style={{
              color: 'white',
            }}
          />
        </View>

        <Text style={styles.orderConfirmText}>Confirm Order</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  confirmButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    flexGrow: 1,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#BEAC74',
    borderRadius: 0,
  },
  orderConfirmText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    textTransform: 'capitalize',
  },
})
const mapState = (state) => {
  return {
    order: state.order,
  }
}
export default connect(mapState, null)(ConfirmBtn)
