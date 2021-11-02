import React from 'react'
import { Text, Box, View } from 'native-base'
import { StyleSheet } from 'react-native'
import AppIcons from '../components/AppIcons'
import { connect } from 'react-redux'
import { addOrder, removeOrder } from '../redux/Reducers/orderReducer'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as Haptics from 'expo-haptics'
const Invoice = (props) => {
  const { sectionTitle, order, index, pdf } = props

  return (
    <Box style={styles.box}>
      <View style={styles.actionBox}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('PdfView', {
              pdf,
            })
          }
          style={{
            backgroundColor: '#ddd',
            borderRadius: 50 / 2,
            width: 50,
            height: 50,
            justifyContent: 'center',
          }}
        ></TouchableOpacity>
      </View>
    </Box>
  )
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignInvoices: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(211,211,211,0.5)',
    paddingLeft: 15,
    width: '100%',
    height: 90,
  },

  actionBox: {
    marginRight: 10,
    width: '40%',
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})
const mapState = (state) => {
  return {
    allOrder: state.order,
  }
}
const mapDispatch = (dispatch) => {
  return {
    addToOrder: (name, index, sectionTitle) =>
      dispatch(addOrder(name, index, sectionTitle)),
    removeOnOrder: (name, index, orderIndex) =>
      dispatch(removeOrder(name, index, orderIndex)),
  }
}
export default connect(mapState, mapDispatch)(Invoice)
