import React from 'react'
import { Button } from 'native-base'
import * as Haptics from 'expo-haptics'
export default (props) => {
  const { children } = props
  return (
    <Button
      {...props}
      onPress={() => {
        props.onPress()
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      }}
    >
      {children}
    </Button>
  )
}
