import React, { useState, useEffect } from 'react'
import { Text, Box, View } from 'native-base'
import { StyleSheet } from 'react-native'
import AppIcons from '../components/AppIcons'
import { connect } from 'react-redux'
import { addOrder, removeOrder } from '../redux/Reducers/orderReducer'
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
    console.log('remove')
  }
  const add = () => {
    props.addToOrder(order)
    console.log('add')
  }

  useEffect(() => {
    if (allOrder.order && allOrder.order.length > 0) {
      console.log(allOrder)
      const isOrderFound = allOrder.order.find(
        (myOrder) => myOrder.name === name
      )
      if (isOrderFound) {
        const orderFound = allOrder.order.map((myOrder) => {
          if (myOrder.name === name) {
            const orderCopy = { ...myOrder }
            setCurCount(orderCopy.count)
            return orderCopy
          }
          return orderFound
        })
      } else {
        setCurCount(0)
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
        <AppIcons
          onPress={() => remove()}
          type="AntDesign"
          name="minus"
          size={25}
          color="black"
        />

        <Text bold>{curCount}</Text>
        <AppIcons
          onPress={() => add()}
          type="AntDesign"
          name="plus"
          size={25}
          color="black"
        />
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
    width: '35%',
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
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
