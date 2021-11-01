import React from 'react'
import { View, StyleSheet } from 'react-native'
import PDFReader from 'rn-pdf-reader-js'

export default function PdfView() {
  return (
    <PDFReader
      source={{
        uri: 'https://firebasestorage.googleapis.com/v0/b/fillup-supply-3fe4c.appspot.com/o/Invoices%2Finvoice-6.pdf?alt=media&token=bc7a446d-fc6a-44f4-959f-227c983ddbf4',
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
})
