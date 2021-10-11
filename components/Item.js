import React, { useState, useEffect } from 'react'
import { Text, Box, View, Button } from 'native-base'
import { StyleSheet } from 'react-native'
import AppIcons from '../components/AppIcons'
import { connect } from 'react-redux'
import { addOrder, removeOrder } from '../redux/Reducers/orderReducer'
import { TouchableOpacity } from 'react-native-gesture-handler'
const Item = (props) => {
  const { name, count, description, size, allOrder } = props
  const [curCount, setCurCount] = useState(0)
  const order = {
    name,
    count,
    description,
    size,
  }
  const remove = () => {
    props.removeOnOrder(order)
  }
  const add = () => {
    props.addToOrder(order)
  }
  // find order name base on name pass in from order home page and update order count
  useEffect(() => {
    if (allOrder.order && allOrder.order.length > 0) {
      const isOrderFound = allOrder.order.find(
        (myOrder) => myOrder.name === name
      )
      if (isOrderFound) {
        const orderFound = allOrder.order.map((myOrder) => {
          if (myOrder.name === name) {
            const orderCopy = { ...myOrder }
            setCurCount(orderCopy.count)
          }
          return orderFound
        })
      }
    } else {
      setCurCount(0)
    }
    return () => {}
  }, [allOrder.order])

  return (
    <Box style={styles.box}>
      <Text fontSize="xl">
        {name}
        {'\n'}
        <Text sub={true}>{description}</Text>
      </Text>

      <View style={styles.actionBox}>
        <TouchableOpacity
          onPress={() => remove()}
          style={{
            backgroundColor: '#ddd',
            borderRadius: 50,
            width: 40,
            height: 40,
            justifyContent: 'center',
          }}
        >
          <AppIcons
            type="AntDesign"
            name="minus"
            size={25}
            color="black"
            style={{ alignSelf: 'center' }}
          />
        </TouchableOpacity>

        <Text bold>{curCount}</Text>
        <TouchableOpacity
          onPress={() => add()}
          style={{
            backgroundColor: '#ddd',
            borderRadius: 50,
            width: 40,
            height: 40,
            justifyContent: 'center',
          }}
        >
          <AppIcons
            type="AntDesign"
            name="plus"
            size={25}
            color="black"
            style={{ alignSelf: 'center' }}
          />
        </TouchableOpacity>
      </View>
    </Box>
  )
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(211,211,211,0.5)',
    padding: 20,
    width: '100%',
    height: 80,
  },

  actionBox: {
    width: '45%',
    flexDirection: 'row',
    paddingVertical: 5,
    marginHorizontal: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})
const mapState = (state) => {
  return {
    allOrder: state.order,
    itemCount: state.order.count,
  }
}
const mapDispatch = (dispatch) => {
  return {
    addToOrder: (name, orderIndex) => dispatch(addOrder(name, orderIndex)),
    removeOnOrder: (name, orderIndex) =>
      dispatch(removeOrder(name, orderIndex)),
  }
}
export default connect(mapState, mapDispatch)(Item)
