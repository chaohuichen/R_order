import React from 'react'
import { Button, Text, View } from 'native-base'
import { StyleSheet } from 'react-native'
import AppIcons from '../components/AppIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as FileSystem from 'expo-file-system'

export default Invoice = (props) => {
  const { uri, name } = props
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('PdfView', {
            uri,
          })
        }
      >
        <AppIcons
          type="FontAwesome"
          name="file-pdf-o"
          size={60}
          color="black"
        />
      </TouchableOpacity>
      <Text style={{ paddingTop: 10 }}>{name}</Text>
      <Button onPress={async () => await FileSystem.deleteAsync(uri)}>
        delete
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 8,
    height: 150,
    width: 110,
    backgroundColor: '#ddd',
    margin: 5,
    borderRadius: 3,
  },
})
