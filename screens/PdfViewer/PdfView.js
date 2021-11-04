import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Button } from 'native-base'
import PDFReader from 'rn-pdf-reader-js'
import * as Sharing from 'expo-sharing'

export default function PdfView(props) {
  const { uri } = props.route.params
  return (
    <View style={styles.container}>
      <PDFReader
        source={{
          uri,
        }}
      />
      <Button
        onPress={() => Sharing.shareAsync(uri)}
        style={{ backgroundColor: 'black', borderRadius: 0 }}
      >
        <Text style={{ color: 'white', fontSize: 20 }}>Send a copy</Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
