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
