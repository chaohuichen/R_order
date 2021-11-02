import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as FileSystem from 'expo-file-system'

export default () => {
  const renderInvoices = async () => {
    console.log('files ', await FileSystem.readDirectoryAsync(localCacheDir))
  }

  return (
    <View style={styles.container}>
      <Text>order history</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
