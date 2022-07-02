import * as React from 'react'
import { TextInput } from 'react-native-paper'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { editInstruction } from '../../redux'
import { Button } from 'react-native-paper'
import AppIcons from '../../components/AppIcons'
const InstructionInput = ({
  instruction,
  changeInstruction,
  handlePlaceOrder,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'black',
        alignItems: 'space-between',
        alignContent: 'space-between',
        // justifyContent: 'space-',
        flex: 1,
        width: '100%',
        paddingBottom: 40,
      }}
    >
      <TextInput
        mode="outlined"
        dense
        activeUnderlineColor="black"
        activeOutlineColor="#BEAC74"
        style={[styles.userInput, { position: 'fixed' }]}
        placeholder="notes"
        value={instruction}
        onChangeText={(text) => changeInstruction(text)}
      />
      {instruction !== '' && (
        <AppIcons
          type="AntDesign"
          name="closecircle"
          size={25}
          color="lightgray"
          onPress={() => changeInstruction('')}
          style={{ position: 'absolute', right: '20%', bottom: 48, zIndex: 1 }}
        />
      )}
      <Button
        title="OK"
        color="white"
        style={styles.okBtn}
        labelStyle={{ marginTop: 10 }}
        onPress={handlePlaceOrder}
      >
        Ok
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  okBtn: {
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: '#BEAC74',
    height: 42,
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#BEAC74',
    marginRight: 5,
  },
  userInput: {
    borderColor: 'black',
    bottom: 0,
    flex: 1,
    borderWidth: 0,
    marginRight: 5,
  },
})
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
