import React from 'react'
import { Text, Box, View } from 'native-base'
import { StyleSheet } from 'react-native'
import AppIcons from '../components/AppIcons'
import { connect } from 'react-redux'
import { addOrder, removeOrder } from '../redux/Reducers/orderReducer'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Item = (props) => {
  const { sectionTitle, order, index } = props

  const removeItem = () => {
    props.removeOnOrder(order, index, sectionTitle)
  }
  const addItem = () => {
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
        <Text style={{ color: 'white', fontSize: 25 }}>
          {order.name}
          {'\n'}
          <Text sub={true} style={{ color: 'white', fontSize: 12 }}>
            Unit: {order.size}
          </Text>
        </Text>
      </View>
      <View style={styles.actionBox}>
        <TouchableOpacity
          onPress={removeItem}
          style={{
            backgroundColor: 'white',
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
        <View
          style={{
            // flex: 1,
            alignItems: 'center',
          }}
        >
          <Text
            bold
            style={{ color: 'white', fontSize: 20, letterSpacing: 0.5 }}
          >
            {order.count}
          </Text>
        </View>
        <TouchableOpacity
          onPress={addItem}
          style={{
            backgroundColor: 'white',
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
    justifyContent: 'space-between',
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
