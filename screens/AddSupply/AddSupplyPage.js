import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { TextInput } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'
import RBSheet from 'react-native-raw-bottom-sheet'
import { setSupplyToDatabase } from '../../API/databaseCall'
const AddSupplyPage = () => {
  const [itemName, setItemName] = useState('')
  const [itemDes, setItemDes] = useState('')
  const [itemSize, setItemSize] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const rbsheetRef = useRef(null)
  const [errorMessage, setErrorMessage] = useState('')
  const addSupplyToFirebase = () => {
    if (itemDes.length !== 0 && itemDes.length !== 0 && itemSize.length !== 0) {
      const supplyPayload = {
        name: itemName,
        description: itemDes,
        size: itemSize,
        count: 0,
      }
      setSupplyToDatabase(supplyPayload, selectedCategory)
      showAlert()
      setErrorMessage('')
    } else {
      setErrorMessage('Input cannot be empty')
    }
  }
  const showAlert = () => {
    Alert.alert('Upload Success', 'press ok to continued', [
      {
        text: 'Ok',
        onPress: () => clearState(),
        style: 'cancel',
      },
    ])
  }
  const clearState = () => {
    setItemDes('')
    setItemName('')
    setItemSize('')
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '500',
          position: 'absolute',
          flex: 1,
          textAlign: 'left',
          width: '100%',
          paddingLeft: 45,
          paddingBottom: 20,
        }}
      >
        Choose Category
      </Text>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <TouchableWithoutFeedback onPress={() => rbsheetRef.current.open()}>
          <View style={styles.selectionButtonView}>
            <Text>{selectedCategory ? selectedCategory : 'Coffee Beans'}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={{ flex: 5 }}>
        <Text style={{ fontSize: 20, fontWeight: '500' }}>Enter Item</Text>
        <TextInput
          style={{ width: 300, marginVertical: 5 }}
          theme={{
            colors: { underlineColor: 'transparent', primary: 'black' },
          }}
          value={itemName}
          mode="outlined"
          label="Item Name"
          autoCapitalize="none"
          keyboardType="default"
          onChangeText={(name) => setItemName(name)}
        />
        {/* {itemDes.length === 0 && <Text>{errorMessage} </Text>} */}
        <TextInput
          value={itemDes}
          style={{ width: 300, marginVertical: 5 }}
          theme={{
            colors: { underlineColor: 'transparent', primary: 'black' },
          }}
          mode="outlined"
          label="Item Description"
          autoCapitalize="none"
          keyboardType="default"
          onChangeText={(des) => setItemDes(des)}
        />
        <TextInput
          value={itemSize}
          style={{ width: 300, marginVertical: 5 }}
          theme={{
            colors: { underlineColor: 'transparent', primary: 'black' },
          }}
          mode="outlined"
          label="Item Size"
          autoCapitalize="none"
          keyboardType="default"
          onChangeText={(size) => setItemSize(size)}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => addSupplyToFirebase()}
        >
          <Text style={styles.loginText}>Submit</Text>
        </TouchableOpacity>
        <RBSheet
          ref={rbsheetRef}
          height={300}
          openDuration={250}
          customStyles={{
            container: {
              alignItems: 'center',
            },
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => rbsheetRef.current.close()}
          >
            <Text
              style={{
                flex: 1,
                textAlign: 'left',
                fontSize: 20,
                marginLeft: 20,
                marginTop: 20,
                color: '#006ee6',
              }}
            >
              Done
            </Text>
          </TouchableOpacity>
          <Picker
            selectedValue={selectedCategory}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedCategory(itemValue)
            }
          >
            <Picker.Item label="Coffee Beans" value="Coffee Beans" />
            <Picker.Item label="Cups" value="Cups" />
          </Picker>
        </RBSheet>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  selectionButtonView: {
    fontSize: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    width: 300,
    marginVertical: 10,
    height: 50,
    borderRadius: 5,
    position: 'absolute',
  },
  loginButton: {
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    backgroundColor: 'black',
    opacity: 0.8,
    width: 300,
    alignSelf: 'center',
    marginTop: 10,
  },
  loginText: {
    color: 'white',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 20,
  },
})
export default AddSupplyPage
