import * as React from 'react'
import { TextInput } from 'react-native-paper'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { editInstruction } from '../../redux'
import { Button } from 'react-native-paper'

const InstructionInput = ({ instruction, changeInstruction }) => {
  const [text, setText] = React.useState('')

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#BEAC74',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 30,
      }}
    >
      <TextInput
        mode="outlined"
        dense
        activeUnderlineColor="black"
        activeOutlineColor="#BEAC74"
        style={{
          marginLeft: 5,
          borderColor: 'black',
          // borderRadius: 5,
          bottom: 0,

          flex: 1,
          position: 'fixed',
        }}
        placeholder="notes"
        value={instruction}
        onChangeText={(text) => changeInstruction(text)}
      />
      <Button
        title="OK"
        color="white"
        style={{
          borderRadius: 0,
          alignSelf: 'center',
          backgroundColor: 'black',
          height: 40,
          paddinghorizontal: 20,
          textColor: 'red',
          marginRight: 5,
          marginTop: 5,
        }}
      >
        OK
      </Button>
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
