import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View, Text, RefreshControl } from 'react-native'
import { removeUser } from '../../redux'
import {
  getOrder,
  clearOrder,
  addOrder,
  removeOrder,
} from '../../redux/Reducers/orderReducer'
import { connect } from 'react-redux'
import ProduceSingleItem from '../../components/ProduceSingleItem'
import { fetchData } from '../../API/databaseCall'
import SectionList from 'react-native-tabs-section-list'
import ConfirmBtn from './ConfirmBtn'
import { LayoutAnimation, Platform, UIManager } from 'react-native'
import * as Haptics from 'expo-haptics'

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}
let count = 1

const OrderHomePage = (props) => {
  const [refreshing, setRefreshing] = useState(false)
  // const [offset, setOffset] = useState(1)
  const [loading, setLoading] = useState(false)
  const [firstBoxPosition, setFirstBoxPosition] = useState('down')
  const [offset, setOffset] = useState(0)

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true)
  //   fetchData(props.fetchData)
  //   wait(2000).then(() => setRefreshing(false))
  // }, [])

  useEffect(() => {
    fetchData(props.fetchData)
    return () => {}
  }, [])

  const actionButtonVisibilityHandler = (event) => {
    let currentOffset = event.nativeEvent.contentOffset.y
    let direction = currentOffset > offset ? 'down' : 'up'

    setOffset(currentOffset)
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

    if ((currentOffset < 200 && currentOffset >= 0) || currentOffset < 0) {
      setFirstBoxPosition('down')
    } else if (currentOffset === 0) {
      setFirstBoxPosition('down')
    } else if (direction === 'down') {
      setFirstBoxPosition('up')
    } else {
      setFirstBoxPosition('down')
    }
  }

  const confirmOrder = () => {
    props.navigation.navigate('ConfirmationPage')
  }
  const removeItem = useCallback((order, index, sectionTitle) => {
    props.removeOnOrder(order, index, sectionTitle)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  })
  const addItem = useCallback((order, index, sectionTitle) => {
    props.addToOrder(order, index, sectionTitle)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  })
  const renderItem = ({ item, index, section }) => {
    return (
      <ProduceSingleItem
        key={index}
        order={item}
        removeItem={() => {
          removeItem(item, index, section.category)
        }}
        addItem={() => {
          addItem(item, index, section.category)
        }}
        sectionTitle={section.category}
      />
    )
  }
  return (
    <View style={styles.container}>
      <SectionList
        onScroll={(event) => actionButtonVisibilityHandler(event)}
        style={{ flex: 1 }}
        renderTab={({ category, isActive }) => (
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
              {category}
            </Text>
          </View>
        )}
        onEndReachedThreshold={0}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: '25%' }}
        sections={props.order || []}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={({ section: { category } }) => (
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
              {category}
            </Text>
          </View>
        )}
        stickySectionHeadersEnabled={false}
      />

      <View
        style={[
          {
            flexDirection: 'row',
            position: 'absolute',
            bottom: 0,
            width: '90%',
            alignSelf: 'center',
          },
          firstBoxPosition === 'up' ? styles.moveDown : styles.moveUp,
        ]}
      >
        <ConfirmBtn confirmOrder={confirmOrder} />
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

  moveDown: {
    bottom: -100,
  },
  moveUp: {
    bottom: 0,
  },
})
const mapDispatch = (dispatch) => {
  return {
    fetchData: (order) => dispatch(getOrder(order)),
    resetOrder: () => dispatch(clearOrder()),
    removeUserData: () => dispatch(removeUser()),
    addToOrder: (name, index, sectionTitle) =>
      dispatch(addOrder(name, index, sectionTitle)),
    removeOnOrder: (name, index, orderIndex) =>
      dispatch(removeOrder(name, index, orderIndex)),
  }
}
const mapState = (state) => {
  return {
    order: state.order,
    user: state.user,
  }
}
export default connect(mapState, mapDispatch)(OrderHomePage)
