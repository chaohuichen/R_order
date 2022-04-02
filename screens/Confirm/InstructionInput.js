import * as React from 'react'
import { TextInput } from 'react-native-paper'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { editInstruction } from '../../redux'

const InstructionInput = ({ instruction, changeInstruction }) => {
  const [text, setText] = React.useState('')

  return (
    <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25 }}>
        Instruction :
      </Text>
      <TextInput
        mode="outlined"
        dense
        multiline
        activeUnderlineColor="black"
        // selectionColor="red"
        // underlineColor="red"
        // outlineColor="red"
        activeOutlineColor="#BEAC74"
        style={{
          marginVertical: 10,
          borderColor: 'black',
          borderRadius: 5,
          padding: 10,
        }}
        // placeholder="Instruction"
        label="Instruction"
        value={instruction}
        onChangeText={(text) => changeInstruction(text)}
      />
    </View>
  )
}

const mapState = (state) => {
  return {
    instruction: state.instruction,
  }
}

const mapDispatch = (dispatch) => {
  return {
    changeInstruction: (userInput) => dispatch(editInstruction(userInput)),
  }
}

export default connect(mapState, mapDispatch)(InstructionInput)
