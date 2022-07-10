import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { View, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { editInstruction } from '../../redux'
import { Button } from 'react-native-paper'
import AppIcons from '../../components/AppIcons'
const InstructionInput = ({
  instruction,
  changeInstruction,
  handlePlaceOrder,
}) => {
  const [foucsInput, setFoucs] = useState(false)
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
        paddingBottom: 50,
      }}
    >
      <TextInput
        mode="outlined"
        dense
        activeUnderlineColor="black"
        activeOutlineColor="#BEAC74"
        style={[styles.userInput, { position: 'fixed' }]}
        placeholder="Notes......."
        value={instruction}
        onChangeText={(text) => changeInstruction(text)}
        onFocus={() => {
          setFoucs(true)
        }}
        onBlur={() => {
          setFoucs(false)
        }}
      />
      {/* {instruction !== '' && foucsInput && (
        <AppIcons
          type="AntDesign"
          name="closecircle"
          size={25}
          color="lightgray"
          onPress={() => changeInstruction('')}
          style={{
            position: 'absolute',
            right: Dimensions.get('window').width / 2 + 10,
            // right: '55%',
            top: '30%',
            zIndex: 1,
          }}
        />
      )} */}
      <Button
        title="OK"
        color="white"
        style={styles.okBtn}
        labelStyle={{
          fontSize: 22,
          fontWeight: 'bold',
          marginBottom: 5,
        }}
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
    width: 210,
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#BEAC74',
    // marginRight: 5,
    fontSize: 15,
    fontWeight: 'bold',
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
