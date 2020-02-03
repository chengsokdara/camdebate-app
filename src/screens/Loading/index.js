import React from 'react'
import styled from 'styled-components/native'
import { ActivityIndicator } from 'react-native-paper'
import { bgColor, primaryColor } from '../../resources'

import useLoadingHook from './hook'

const LoadingScreen = ({ navigation }) => {
  useLoadingHook(navigation)
  return (
    <Container bgColor={bgColor}>
      <Logo source={require('../../resources/images/camdebate_logo.png')} />
      <Row>
        <Loader color={primaryColor} size={24} />
        <Text>CamDEBATE App</Text>
      </Row>
    </Container>
  )
}

const Logo = styled.Image`
  width: 200px;
  height: 200px;
`

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.bgColor};
`

const Loader = styled(ActivityIndicator)`
  margin-right: 10px;
`

const Row = styled.View`
  flex-direction: row;
`

const Text = styled.Text`
  font-size: 25px;
  font-weight: bold;
`

export default LoadingScreen
