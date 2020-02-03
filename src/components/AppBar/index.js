import React from 'react'
import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native'
import { Appbar } from 'react-native-paper'

const AppBar = ({
  backable = false,
  logo = true,
  title = 'CamDEBATE App',
  onBackPress,
  onNotiPress
}) => {
  return (
    <Appbar.Header>
      {backable ? (
        <Appbar.BackAction
          color="white"
          theme={{ dark: false }}
          onPress={onBackPress}
        />
      ) : null}
      {logo ? (
        <TouchableOpacity onPress={backable ? onBackPress : undefined}>
          <Logo
            backable={backable}
            source={require('../../resources/images/camdebate_white_logo.png')}
          />
        </TouchableOpacity>
      ) : null}
      <Appbar.Content title={title} />
      {onNotiPress ? <Appbar.Action icon="bell" onPress={onNotiPress} /> : null}
    </Appbar.Header>
  )
}

const Logo = styled.Image`
  width: 40px;
  height: 40px;
  margin-left: ${props => (props.backable ? 0 : '10px')};
`

export default AppBar
