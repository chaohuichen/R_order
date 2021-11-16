import React, { useState, useEffect, useCallback, useRef } from 'react'
import {
  StyleSheet,
  View,
  SectionList,
  Text,
  RefreshControl,
} from 'react-native'
import { Button } from 'native-base'
import { removeUser } from '../../redux'
import { getOrder, clearOrder } from '../../redux/Reducers/orderReducer'
import { connect } from 'react-redux'
import Item from '../../components/Item'
import { fetchData } from '../../API/databaseCall'
import AppLoading from '../../components/AppLoading'

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}
let count = 1

const OrderHomePage = (props) => {
  const [refreshing, setRefreshing] = useState(false)
  const [offset, setOffset] = useState(1)
  const [loading, setLoading] = useState(false)
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    fetchData(props.fetchData, offset)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  useEffect(() => {
    fetchData(props.fetchData, offset)

    return () => {
      //reset offset to 1
      // setOffset(1)
    }
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
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <SectionList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={handleLoadMoreData}
          style={{ flex: 1 }}
          ListFooterComponent={
            loading && (
              <View style={{ marginTop: 20 }}>
                <AppLoading />
              </View>
            )
          }
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
                borderBottomColor: 'rgba(221,221,221,0.5)',
                borderBottomWidth: 1,
                flex: 1,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: '500' }}>{title} </Text>
            </View>
          )}
          stickySectionHeadersEnabled={false}
          ListHeaderComponent={() => {
            return (
              <View style={styles.titleContainer}>
                <Text style={styles.productDetails}>Product</Text>
                <Text style={styles.productDetails}>Quanitity</Text>
              </View>
            )
          }}
        />
        <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0 }}>
          <Button style={styles.loginButton} onPress={() => confirmOrder()}>
            <Text style={styles.loginButtonText}>Comfirm Order</Text>
          </Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingRight: '10%',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(211,211,211,0.5)',
  },
  productDetails: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginButton: {
    justifyContent: 'center',
    height: 50,
    flex: 1,
    alignSelf: 'center',
    backgroundColor: 'black',
    borderRadius: 0,
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
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
