import React, { useState } from 'react'
import { Text, Box, View, Button, Input } from 'native-base'
import { StyleSheet, TextInput } from 'react-native'
import AppIcons from '../components/AppIcons'
import { connect } from 'react-redux'
import { addOrder, removeOrder } from '../redux/Reducers/orderReducer'
const Item = (props) => {
  const [itemCount, setItemCount] = useState(0)
  const { name, index, count } = props
  console.log('count ', props)
  return (
    <Box style={styles.box}>
      <Text fontSize="xl">
        {props.name}
        {'\n'}
        <Text sub={true}>{props.size}</Text>
      </Text>

      <View style={styles.actionBox}>
        <AppIcons
          onPress={() => props.removeOnOrder(name, index)}
          type="AntDesign"
          name="minus"
          size={25}
          color="black"
        />

        <Text bold>{count}</Text>
        <AppIcons
          onPress={() => props.addToOrder(name, index)}
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
  console.log('state jsdlkfjsdklfj', state.order.count)
  return {
    order: state.order,
    count: state.order.count,
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
