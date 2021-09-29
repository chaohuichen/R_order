import React, { useState, useEffect } from 'react'
import * as Print from 'expo-print'
import * as Sharing from 'expo-sharing'
import { View, Text } from 'native-base'
import { StyleSheet, Dimensions } from 'react-native'
import { htmlContent } from './Template'
// const htmlContent = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Pdf Content</title>
//         <style>
//             body {
//                 font-size: 16px;
//                 color: rgb(255, 196, 0);

//             }

//             h1 {
//                 text-align: center;
//             }
//         </style>
//     </head>
//     <body>
//         <h1>Hello pdf </h1>
//     </body>
//     </html>
// `
const PDFpage = () => {
  const source = {
    uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
    cache: true,
  }
  const [pdfRef, setPdfRef] = useState()
  useEffect(() => {
    const generateFile = async () => {
      const filePath = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
      })
      setPdfRef(filePath)

      Sharing.shareAsync(filePath.uri)
    }
    generateFile()
  }, [])

  return (
    <View style={styles.container}>
      <Text>hello</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})

export default PDFpage
