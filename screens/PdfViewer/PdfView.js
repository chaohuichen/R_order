import React from 'react'
import { View, StyleSheet } from 'react-native'
import PDFReader from 'rn-pdf-reader-js'

export default function PdfView(props) {
  return (
    <PDFReader
      source={{
        uri: props.uri,
      }}
    />
  )
}
