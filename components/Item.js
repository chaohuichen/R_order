import React, { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Box } from 'native-base'
import AppIcons from '../components/AppIcons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const Item = memo(
  ({ order, removeItem, addItem }) => {
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
          <TouchableWithoutFeedback
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
          </TouchableWithoutFeedback>
          <View
            style={{
              width: '30%',
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
          <TouchableWithoutFeedback
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
          </TouchableWithoutFeedback>
        </View>
      </Box>
    )
  },
  (prev, next) => {
    const prevCount = prev.order.count
    const nextCount = next.order.count
    const isEqual = prevCount === nextCount
    return isEqual
  }
)

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
  orderTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  orderSize: {
    color: 'white',
  },
})

export default Item
