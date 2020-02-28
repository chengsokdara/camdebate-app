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
import { Card } from 'react-native-paper'

import { AppBar } from '../../components'

const AboutScreen = ({ navigation }) => {
  return (
    <Container>
      <AppBar backable onBackPress={() => navigation.goBack()} />
      <Card style={{ margin: 10 }}>
        <Card.Title title="Develop by" subtitle="IDP Database Team" />
        <Card.Content>
          <Label>Designer</Label>
          <LabelMargined>Developer</LabelMargined>
          <Value>Mr. Cheng Sokdara</Value>
          <Label>Maintainer</Label>
          <Text>Mr. Sella {/* Change to your full name bro */}</Text>
        </Card.Content>
      </Card>
    </Container>
  )
}

const Text = styled.Text`
  font-size: 14px;
`

const Container = styled.View`
  flex: 1;
`

const Label = styled(Text)`
  font-weight: bold;
`

const LabelMargined = styled(Label)`
  margin-bottom: 10px;
`

const Value = styled(Text)`
  margin-bottom: 20px;
`

export default AboutScreen
