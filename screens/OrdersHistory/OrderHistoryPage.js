import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import * as FileSystem from 'expo-file-system'
import Invoice from '../../components/Invoice'
import { SafeAreaView } from 'react-native-safe-area-context'
export default ({ navigation }) => {
  const [fileName, setFileName] = useState([])
  const localCacheDir = FileSystem.documentDirectory
  useEffect(() => {
    async function fetchData() {
      const files = await FileSystem.readDirectoryAsync(localCacheDir)
      const filtedFiles = files.filter((singleFile) =>
        singleFile.includes('pdf')
      )
      setFileName(filtedFiles)
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
})
