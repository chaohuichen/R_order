import React from 'react'
import { Text, Box, View, Button } from 'native-base'
import { StyleSheet } from 'react-native'
import AppIcons from '../components/AppIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'
export default Invoice = (props) => {
  const { uri, name } = props
  console.log(uri)
  return (
    <Box style={styles.box}>
      <TouchableOpacity
        style={styles.actionBox}
        onPress={() =>
          props.navigation.navigate('PdfView', {
            uri,
          })
        }
      >
        <AppIcons
          type="FontAwesome"
          name="file-pdf-o"
          size={25}
          color="black"
        />
        <Text>{name}</Text>
        <Button>
          <Text>Delete</Text>
        </Button>
      </TouchableOpacity>
    </Box>
  )
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: 'space-between',
  },
  actionBox: {},
})
