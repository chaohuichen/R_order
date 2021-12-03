import React from 'react'
import { View, StyleSheet, Text, Share } from 'react-native'
import { Button } from 'native-base'
import PDFReader from 'rn-pdf-reader-js'
import * as Sharing from 'expo-sharing'

export default function PdfView(props) {
  const { uri } = props.route.params

  const shareFiles = () => {
    Share.share(
      {
        message: 'Flor De Mayo Order Invoice',
        title: 'FDM Invoice',
        url: uri,
        Subject: 'Flor De Mayo Order Invoice',
      },
      {
        excludedActivityTypes: [
          'com.apple.UIKit.activity.SaveToCameraRoll',
          'com.apple.UIKit.activity.PostToFlickr',
          'com.apple.UIKit.activity.OpenInIBooks',
          'com.apple.UIKit.activity.MarkupAsPDF',
          'com.apple.reminders.RemindersEditorExtension',
          'com.apple.mobileslideshow.StreamShareService',
        ],
      }
    )
  }
  return (
    <View style={styles.container}>
      <PDFReader
        source={{
          uri,
        }}
      />
      <Button
        onPress={shareFiles}
        style={{
          backgroundColor: 'black',
          borderRadius: 0,
          backgroundColor: '#BEAC74',
        }}
      >
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
          Share
        </Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
