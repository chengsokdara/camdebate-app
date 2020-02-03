import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { lightPrimaryColor } from '../../../resources'

const NavIcon = ({ color, name, focused }) => {
  return (
    <Icon
      color={color ? color : focused ? 'white' : lightPrimaryColor}
      name={name}
      size={24}
    />
  )
}

export default NavIcon
