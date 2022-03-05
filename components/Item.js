import React, { useState, useEffect } from 'react'
import { StyleSheet, Text } from 'react-native'
import AppIcons from '../components/AppIcons'
import { connect } from 'react-redux'
import { addOrder, removeOrder } from '../redux/Reducers/orderReducer'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as Haptics from 'expo-haptics'
import { Badge } from 'react-native-paper'

const Item = ({ order, index, sectionTitle, addToOrder }) => {
  const addItem = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    addToOrder(order, index, sectionTitle)
  }

  return (
    <TouchableOpacity style={styles.box} onPress={addItem}>
      <Text style={styles.orderTitle}>{order.name}</Text>
      {order.count > 0 && (
        <Badge
          size={60}
          style={{
            alignSelf: 'center',
            backgroundColor: '#BEAC74',
            color: 'white',
            marginRight: 20,
            borderColor: 'black',
            borderWidth: 1,
            fontWeight: 'bold',
          }}
        >
          {order.count}
        </Badge>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#262626',
    alignItems: 'center',
    marginVertical: 1,
    paddingLeft: 15,
    width: '100%',
    height: 120,
  },
  orderTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
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
