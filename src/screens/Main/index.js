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
import React, { useEffect } from 'react'
import styled from 'styled-components/native'
import AsyncStorage from '@react-native-community/async-storage'
import { ActivityIndicator } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { useApolloClient } from '@apollo/react-hooks'

import { bgColor, primaryColor } from '../../resources'
import { ProfileQuery } from '../../resources/queries'
import { loginAsync } from '../../service'

const MainScreen = ({ navigation }) => {
  const client = useApolloClient()
  const dispatch = useDispatch()

  useEffect(() => {
    const initAsync = async () => {
      try {
        const token = await AsyncStorage.getItem('token')
        console.log('initAsync token', token)
        let profile
        if (token) {
          const res = await client.query({
            query: ProfileQuery
          })
          const { code, profile: contact } = res.data.profile
          if (code === 200) profile = contact
        }
        if (token) await dispatch(loginAsync(token, profile))
        navigation.navigate(token ? 'App' : 'Auth')
      } catch (e) {
        console.log('initAsync error', e)
        navigation.navigate('Maintenance')
      }
    }

    const timeoutId = setTimeout(initAsync, 0)
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

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.bgColor};
`

const Loader = styled(ActivityIndicator)`
  margin-right: 10px;
`

const Logo = styled.Image`
  width: 200px;
  height: 200px;
`

const Row = styled.View`
  flex-direction: row;
`

const Text = styled.Text`
  font-size: 25px;
  font-weight: bold;
`

export default MainScreen
