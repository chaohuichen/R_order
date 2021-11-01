import React from 'react'
import { View, Spinner } from 'native-base'

export default ({ color }) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <Spinner color={color || 'black'} />
    </View>
  )
}
