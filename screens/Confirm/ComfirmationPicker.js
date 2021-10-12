import React, { useState } from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import { Picker } from '@react-native-picker/picker'

const ComfirmationPicker = (props) => {
  const [pickerState, setPickerState] = useState(
    props.isPicker ? props.selectedToValue : props.selectedFromValue
  )

  return (
    <Picker
      selectedValue={pickerState}
      onValueChange={(value) => {
        setPickerState(value)
        if (props.isPicker) {
          props.setSelectedFromValue(value)
        } else {
          props.setSelectedToValue(value)
        }
      }}
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
      }}
    >
      {props.pickerItems.map((item, index) => (
        <Picker.Item key={index} label={item} value={item} />
      ))}
    </Picker>
  )
}

export default ComfirmationPicker
