import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
} from '@expo/vector-icons'
import React, { useState, useEffect } from 'react'
const AppIcons = (props) => {
  const [iconType, setIconType] = useState('MaterialCommunityIcons')
  useEffect(() => {
    if (props.type) {
      setIconType(props.type)
    }
  }, [])
  switch (iconType) {
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons {...props} />
    case 'FontAwesome5':
      return <FontAwesome5 {...props} />
    case 'MaterialIcons':
      return <MaterialIcons {...props} />
    case 'Ionicons':
      return <Ionicons {...props} />
    case 'Feather':
      return <Feather {...props} />
    default:
      return <MaterialCommunityIcons {...props} />
  }
}

export default AppIcons
