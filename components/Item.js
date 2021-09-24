import React, { useState } from 'react'
import { Text, Box, View, Button, Input } from 'native-base'
import { StyleSheet, TextInput } from 'react-native'
import AppIcons from '../components/AppIcons'
export default function Item(props) {
  const [itemCount, setItemCount] = useState(0)
  return (
    <Box style={styles.box}>
      <Text fontSize="xl">
        {props.name}
        {'\n'}
        <Text sub={true}>{props.size}</Text>
      </Text>

      <View style={styles.actionBox}>
        <AppIcons
          onPress={() => setItemCount(itemCount - 1)}
          type="AntDesign"
          name="minus"
          size={25}
          color="black"
        />

        <Text bold>{itemCount}</Text>
        <AppIcons
          onPress={() => setItemCount(itemCount + 1)}
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
