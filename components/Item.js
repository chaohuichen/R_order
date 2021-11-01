import React from 'react'
import { Text, Box, View } from 'native-base'
import { StyleSheet } from 'react-native'
import AppIcons from '../components/AppIcons'
import { connect } from 'react-redux'
import { addOrder, removeOrder } from '../redux/Reducers/orderReducer'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as Haptics from 'expo-haptics'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as FileSystem from 'expo-file-system'
const Item = (props) => {
  const { sectionTitle, order, index } = props

  const remove = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    props.removeOnOrder(order, index, sectionTitle)
  }
  const add = () => {
    AsyncStorage.clear()
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    props.addToOrder(order, index, sectionTitle)
  }

  return (
    <Box style={styles.box}>
      <View
        style={{
          flex: 1.5,
          flexWrap: 'wrap',
          flexDirection: 'row',
          paddingRight: 15,
        }}
      >
        <Text>
          {order.name}
          {'\n'}
          <Text sub={true}>Unit: {order.size}</Text>
        </Text>
      </View>
      <View style={styles.actionBox}>
        <TouchableOpacity
          onPress={() => remove()}
          style={{
            backgroundColor: '#ddd',
            borderRadius: 50 / 2,
            width: 50,
            height: 50,
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

        <Text
          bold
          style={{
            marginHorizontal: 10,
            width: 25,
            textAlign: 'center',
          }}
        >
          {order.count}
        </Text>
        <TouchableOpacity
          onPress={() => add()}
          style={{
            backgroundColor: '#ddd',
            borderRadius: 50 / 2,
            width: 50,
            height: 50,
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
    paddingLeft: 15,
    width: '100%',
    height: 90,
  },

  actionBox: {
    marginRight: 10,
    width: '40%',
    flexDirection: 'row',
    paddingVertical: 5,
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
    addToOrder: (name, index, sectionTitle) =>
      dispatch(addOrder(name, index, sectionTitle)),
    removeOnOrder: (name, index, orderIndex) =>
      dispatch(removeOrder(name, index, orderIndex)),
  }
}
export default connect(mapState, mapDispatch)(Item)
