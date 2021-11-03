import React from 'react'
import { Text, Box, View } from 'native-base'
import { StyleSheet } from 'react-native'
import AppIcons from '../components/AppIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'
export default Invoice = (props) => {
  const { uri, name } = props

  return (
    <Box style={styles.box}>
      <View style={styles.actionBox}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('PdfView', {
              uri,
            })
          }
        >
          <AppIcons type="FontAwesome5" name="files" size={25} color="black" />
          <Text>{name}</Text>
        </TouchableOpacity>
      </View>
    </Box>
  )
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
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
    alignItems: 'center',
  },
})
