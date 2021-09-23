import React, { useState } from 'react'
import { Text, Box, View, Button, Input } from 'native-base'
import { ProgressViewIOSComponent, StyleSheet, TextInput } from 'react-native'
import AppIcons from '../components/AppIcons'
import { connect } from 'react-redux'
import { addOrder, removeOrder } from '../redux/Reducers/orderReducer'
const Item = (props) => {
  const [itemCount, setItemCount] = useState(0)
  const { name, index } = props
  const addItem = (name, orderIndex) => {
    console.log('add ', name, ' ', orderIndex)
    // const index = orderIndex + ''
  }
  const removeItem = (name, orderIndex) => {
    //remove order from
    // const index = orderIndex + ''
    console.log('remove ', name, ' ', orderIndex)
  }
  return (
    <Box style={styles.box}>
      <Text fontSize="xl">
        {props.name}
        {'\n'}
        <Text sub={true}>{props.size}</Text>
      </Text>

      <View style={styles.actionBox}>
        <Button size="xs" onPress={() => props.removeOnOrder(name, index)}>
          <Text style={{ fontSize: 20, fontWeight: '600' }}> - </Text>
        </Button>
        <Input
          variant="outline"
          size="xs"
          value={itemCount + ''}
          style={{
            textAlign: 'center',
            width: 50,
            backgroundColor: '#f1f1f1',
            borderWidth: 0,
            padding: 0,
          }}
          mx={1}
          placeholder="0"
        />
        <Text></Text>
        <Button
          size="xs"
          styles={styles.button}
          onPress={() => props.addToOrder(name, index)}
        >
          <Text style={{ fontSize: 20, fontWeight: '600' }}> + </Text>
        </Button>
      </View>
    </Box>
  )
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(211,211,211,0.5)',
    padding: 20,
    width: '100%',
    height: 80,
  },

  actionBox: {
    flexDirection: 'row',
  },

  button: {
    padding: 0,
    margin: 0,
  },
})

const mapDispatch = (dispatch) => {
  return {
    addToOrder: (name, orderIndex) => dispatch(addOrder(name, orderIndex)),
    removeOnOrder: (name, orderIndex) =>
      dispatch(removeOrder(name, orderIndex)),
  }
}

export default connect(null, mapDispatch)(Item)
