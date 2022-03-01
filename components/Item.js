import React from 'react'
import { Text, Box, View } from 'native-base'
import { StyleSheet } from 'react-native'
import AppIcons from '../components/AppIcons'
import { connect } from 'react-redux'
import { addOrder, removeOrder } from '../redux/Reducers/orderReducer'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Item = (props) => {
  const { sectionTitle, order, index } = props

  const addItem = () => {
    props.addToOrder(order, index, sectionTitle)
  }

  return (
    <Box style={styles.box}>
      <TouchableOpacity onPress={addItem}>
        <Text style={styles.orderTitle}>{order.name}</Text>
        <Text style={styles.orderSize}>{order.size}</Text>
      </TouchableOpacity>
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
    paddingLeft: 15,
    width: '100%',
    height: 120,
  },
  orderTitle: {
    color: 'white',
    fontSize: 30,
  },
  orderSize: {
    color: 'white',
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
    addToOrder: (name, index, sectionTitle) =>
      dispatch(addOrder(name, index, sectionTitle)),
    removeOnOrder: (name, index, orderIndex) =>
      dispatch(removeOrder(name, index, orderIndex)),
  }
}
export default connect(mapState, mapDispatch)(Item)
