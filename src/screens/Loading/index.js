import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import styled from 'styled-components/native'
import { useDispatch } from 'react-redux'
import { ActivityIndicator } from 'react-native-paper'

import { bgColor, primaryColor } from '../../resources'
import { loginAsync } from '../../service'

const LoadingScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const _bootstrapAsync = async () => {
    const token = await AsyncStorage.getItem('token')
    console.log('_bootstrapAsync token', token)
    if (token) await dispatch(loginAsync(token))
    navigation.navigate(token ? 'App' : 'Auth')
  }

  useEffect(() => {
    console.log('Loading rendered.')
    const timeoutId = setTimeout(_bootstrapAsync, 0)
    return () => clearTimeout(timeoutId)
  }, [])

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
