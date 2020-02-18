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
import styled from 'styled-components/native'

import { AppBar } from '../../components'

const TermScreen = ({ navigation }) => {
  return (
    <Container>
      <AppBar
        backable
        title="Terms and Conditions"
        onBackPress={() => navigation.goBack()}
      />
      <Content>
        <Text>Under Construction</Text>
      </Content>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
`

const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Text = styled.Text`
  font-size: 24px;
  font-weight: bold;
`

export default TermScreen
