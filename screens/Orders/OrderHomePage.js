import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View, Text, RefreshControl } from 'react-native'
import { Button } from 'native-base'
import { removeUser } from '../../redux'
import { getOrder, clearOrder } from '../../redux/Reducers/orderReducer'
import { connect } from 'react-redux'
import Item from '../../components/Item'
import { fetchData } from '../../API/databaseCall'
import SectionList from 'react-native-tabs-section-list'

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}
let count = 1

const OrderHomePage = (props) => {
  const [refreshing, setRefreshing] = useState(false)
  // const [offset, setOffset] = useState(1)
  const [loading, setLoading] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    fetchData(props.fetchData)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  useEffect(() => {
    fetchData(props.fetchData)
    return () => {}
  }, [])

  const handleLoadMoreData = () => {
    setLoading(true)
    setTimeout(() => {
      count++
      fetchData(props.fetchData, count)
      setLoading(false)
    }, 2000)
  }

  const confirmOrder = () => {
    props.navigation.navigate('ConfirmationPage')
  }

  const renderItem = ({ item, index, section }) => {
    return (
      <Item
        key={index}
        index={index}
        order={item}
        sectionTitle={section.title}
      />
    )
  }
  return (
    <View style={styles.container}>
      {/* <View style={{ flex: 1}}> */}
      <SectionList
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
        style={{ flex: 1 }}
        renderTab={({ title, isActive }) => (
          <View
            style={[
              {
                borderBottomWidth: isActive ? 2 : 0,
                borderBottomColor: 'white',
              },
            ]}
          >
            <Text
              style={[
                {
                  color: isActive ? 'white' : '#9e9e9e',
                  fontWeight: isActive ? 'bold' : '400',
                  padding: 15,
                  fontSize: 18,
                  textTransform: 'capitalize',
                },
              ]}
            >
              {title}
            </Text>
          </View>
        )}
        onEndReachedThreshold={0}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: '25%' }}
        sections={[...props.order] || []}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <View
            style={{
              padding: 12,
              backgroundColor: 'black',
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: '500',
                color: 'white',
                textTransform: 'capitalize',
              }}
            >
              {title}
            </Text>
          </View>
        )}
        stickySectionHeadersEnabled={false}
      />
      <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0 }}>
        <Button style={[styles.confirmButton]} onPress={confirmOrder}>
          <Text style={styles.orderConfirmText}>Comfirm Order</Text>
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingRight: '10%',
  },
  productDetails: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  confirmButton: {
    justifyContent: 'center',
    height: 50,
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#BEAC74',
    borderRadius: 0,
  },
  orderConfirmText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
})
const mapDispatch = (dispatch) => {
  return {
    fetchData: (order) => dispatch(getOrder(order)),
    resetOrder: () => dispatch(clearOrder()),
    removeUserData: () => dispatch(removeUser()),
  }
}
const mapState = (state) => {
  return {
    order: state.order,
    user: state.user,
  }
}
export default connect(mapState, mapDispatch)(OrderHomePage)
