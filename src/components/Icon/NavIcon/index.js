/**
 * Author: Mr. Cheng Sokdara
 * Repository: https://github.com/chengsokdara/camdebate-app
 *
 * Email: chengsokdara@gmail.com
 * Phone: 086558716
 * Website: https://rawewhat-team.web.app
 * License: MIT
 *
 * Created At: 03/02/2020
 */
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
