import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import * as FileSystem from 'expo-file-system'
import Invoice from '../../components/Invoice'

export default ({ navigation }) => {
  const [fileName, setFileName] = useState([])
  const localCacheDir =
    'file:///var/mobile/Containers/Data/Application/BD76DCF1-861D-43D5-BBE5-DE06DE7B041F/Documents/ExponentExperienceData/%2540shinanlan%252Ffillupsupply/'
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const files = await FileSystem.readDirectoryAsync(localCacheDir)
      // ...
      setFileName(files)
    }
    fetchData()
  }, [])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {fileName.map((fileName, index) => (
        <Invoice
          key={index}
          uri={localCacheDir + fileName}
          name={fileName}
          navigation={navigation}
        />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
