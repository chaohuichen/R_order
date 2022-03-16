import React from 'react'
import { Text, View } from 'native-base'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import AppIcons from '../../components/AppIcons'
import * as Haptics from 'expo-haptics'

export default Invoice = (props) => {
  const { uri, name } = props
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.navigation.navigate('PdfView', {
          uri,
        })
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      }}
    >
      <View style={styles.container}>
        <AppIcons
          type="FontAwesome"
          name="file-pdf-o"
          size={60}
          color="black"
        />
        <Text style={{ paddingTop: 10, fontSize: 12 }}>{name}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    margin: 2,
    height: 120,
    width: '100%',
    backgroundColor: '#ddd',
    borderRadius: 3,
  },
})
