import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
  AntDesign,
  Entypo,
} from '@expo/vector-icons'
import React, { useState, useEffect } from 'react'
const AppIcons = (props) => {
  const [iconType, setIconType] = useState(null)
  useEffect(() => {
    if (props.type) {
      // console.log(props.type)
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
    case 'AntDesign':
      return <AntDesign {...props} />
    case 'AntDesign':
      return <Entypo {...props} />
    default:
      return null
  }
}

export default AppIcons
