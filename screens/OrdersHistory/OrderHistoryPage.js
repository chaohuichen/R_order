import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import * as FileSystem from 'expo-file-system'
import Invoice from '../../components/Invoice'
import { getOrderHistory } from '../../redux'
import { connect } from 'react-redux'

const OrderHistoryPage = ({ navigation, orderHistory, fetchOrderHistory }) => {
  const localCacheDir = FileSystem.documentDirectory

  useEffect(() => {
    fetchOrderHistory()
  }, [])
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {orderHistory.map((fileName, index) => (
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
    flexGrow: 1,
    marginHorizontal: '7%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'center',
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
    fetchOrderHistory: () => dispatch(getOrderHistory()),
  }
}

export default connect(mapState, mapDispatch)(OrderHistoryPage)
