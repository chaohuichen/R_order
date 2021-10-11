import React, { useState } from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import { Picker } from '@react-native-picker/picker'

const ComfirmationPicker = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          fontSize: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {props.showToPicker && (
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
              {props.pickerItems.map((item) => (
                <Picker.Item label={item} value={item} />
              ))}
            </Picker>
          </>
        )}
      </View>

      {/* <TouchableWithoutFeedback
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
              <Text
                style={{
                  color: 'black',
                  fontWeight: '900',
                  fontSize: 18,
                }}
              >
                {selectedFromValue ? selectedFromValue : 'Selection'}
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
                <Picker.Item label="fillup NY1" value="fillup NY1" />
                <Picker.Item label="fillup NY2" value="fillup NY2" />
                <Picker.Item label="fillup NY3" value="fillup NY3" />
              </Picker>
            </>
          )}
        </View>
      </TouchableWithoutFeedback> */}
    </View>
  )
}

export default ComfirmationPicker
