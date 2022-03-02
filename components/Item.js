import React from 'react'
import { Text, Box, View } from 'native-base'
import { StyleSheet } from 'react-native'
import AppIcons from '../components/AppIcons'
import { connect } from 'react-redux'
import { addOrder, removeOrder } from '../redux/Reducers/orderReducer'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as Haptics from 'expo-haptics'
import { Badge } from 'react-native-paper'
import { borderWidth } from 'styled-system'

const Item = (props) => {
  const { sectionTitle, order, index } = props

  const addItem = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  }

  return (
    <TouchableOpacity style={styles.box} onPress={addItem}>
      <Text style={styles.orderTitle}>{order.name}</Text>
      {/* <Text style={styles.orderSize}>{order.size}</Text> */}
      <Badge
        size={60}
        style={{
          alignSelf: 'center',
          backgroundColor: '#BEAC74',
          color: 'white',
          marginRight: 20,
          borderColor: 'black',
          borderWidth: 1,
        }}
      >
        3
      </Badge>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#262626',
    alignItems: 'center',
    marginVertical: 0.5,
    // borderTopWidth: 0.5,
    // borderBottomWidth: 0.5,
    // borderColor: 'rgba(211,211,211,0.5)',
    paddingLeft: 15,
    width: '100%',
    height: 120,
  },
  orderTitle: {
    color: 'white',
    fontSize: 20,
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
