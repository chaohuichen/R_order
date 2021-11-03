import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as FileSystem from 'expo-file-system'
import Invoice from '../../components/Invoice'

export default () => {
  const [fileName, setFileName] = useState([])
  const localCacheDir =
    'file:///var/mobile/Containers/Data/Application/BD76DCF1-861D-43D5-BBE5-DE06DE7B041F/Documents/ExponentExperienceData/%2540shinanlan%252Ffillupsupply/'
  useEffect(async () => {
    const files = await FileSystem.readDirectoryAsync(localCacheDir)
    setFileName(files)
    return () => {}
  }, [])

  return (
    <View style={styles.container}>
      {fileName.map((fileName) => (
        <Invoice uri={localCacheDir + fileName} name={fileName} />
      ))}
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
