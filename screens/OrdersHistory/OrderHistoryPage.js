import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import * as FileSystem from 'expo-file-system'
import Invoice from '../../components/Invoice'
import { getOrderHistory } from '../../redux'
import { connect } from 'react-redux'
const OrderHistoryPage = ({ navigation, orderHistory }) => {
  console.log(orderHistory)
  const [fileName, setFileName] = useState([])
  const localCacheDir = FileSystem.documentDirectory

  useEffect(() => {
    async function fetchData() {
      const systemFiles = await FileSystem.readDirectoryAsync(localCacheDir)
      const filtedsystemFiles = systemFiles.filter((singleFile) =>
        singleFile.includes('pdf')
      )
      setFileName(filtedsystemFiles)
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
const mapState = (state) => {
  return {
    orderHistory: state.orderHistory,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getOrderHistory: () => dispatch(getOrderHistory),
  }
}

export default connect(mapState, mapDispatch)(OrderHistoryPage)
