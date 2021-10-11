import React, { useState } from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import { Picker } from '@react-native-picker/picker'

const ComfirmationPicker = () => {
  const [selectedToValue, setSelectedToValue] = useState('')
  const [selectedFromValue, setSelectedFromValue] = useState('')
  const [showToPicker, setShowToPicker] = useState(false)
  const [showFromPicker, setShowFromPicker] = useState(false)
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setShowToPicker(!showToPicker)}>
        <View
          style={{
            flex: 1,
            fontSize: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {showToPicker == false && (
            <View
              style={{
                backgroundColor: '#f3f3f3',
                paddingHorizontal: 55,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
              }}
            >
              <Text
                style={{
                  backgroundColor: 'grey',
                  width: '100%',
                }}
              >
                {selectedToValue ? selectedToValue : 'Selection'}
              </Text>
            </View>
          )}
          {showToPicker && (
            <>
              <Picker
                selectedValue={selectedToValue}
                onValueChange={(value) => setSelectedToValue(value)}
                style={{
                  width: '100%',
                  postion: 'absolute',
                  fontSize: 10,
                }}
                mode="dropdown"
                itemStyle={{
                  color: 'black',
                  fontWeight: '900',
                  fontSize: 18,
                  padding: 30,
                }}
              >
                <Picker.Item
                  label="fillup logistics"
                  value="fillup logistics"
                />
                <Picker.Item label="fillup roaster" value="fillup roaster" />
                <Picker.Item label="fillup mgt" value="fillup mgt" />
              </Picker>
            </>
          )}
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => setShowFromPicker(!showFromPicker)}
      >
        <View
          style={{
            flex: 1,
            fontSize: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {showFromPicker == false && (
            <View
              style={{
                backgroundColor: '#f3f3f3',
                paddingHorizontal: 55,
                borderRadius: 5,
                padding: 10,
              }}
            >
              <Text style={{ backgroundColor: 'grey' }}>
                {selectedFromValue ? selectedFromValue : 'Selection'}{' '}
              </Text>
            </View>
          )}
          {showFromPicker && (
            <>
              <Picker
                selectedValue={selectedFromValue}
                onValueChange={(value) => setSelectedFromValue(value)}
                style={{
                  width: '100%',
                  postion: 'absolute',
                  fontSize: 10,
                }}
                mode="dropdown"
                itemStyle={{
                  color: 'black',
                  fontWeight: '900',
                  fontSize: 18,
                  padding: 30,
                }}
              >
                <Picker.Item
                  label="fillup logistics"
                  value="fillup logistics"
                />
                <Picker.Item label="fillup roaster" value="fillup roaster" />
                <Picker.Item label="fillup mgt" value="fillup mgt" />
              </Picker>
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
    </>
  )
}

export default ComfirmationPicker
