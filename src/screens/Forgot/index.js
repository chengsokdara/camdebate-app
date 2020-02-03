import React from 'react'
import styled from 'styled-components/native'
import { Button, Card as PaperCard, TextInput } from 'react-native-paper'

import { AppBar } from '../../components'

const ForgotPasswordScreen = ({ navigation }) => {
  return (
    <>
      <AppBar backable onBackPress={() => navigation.goBack()} />
      <Content>
        <Card>
          <Card.Title
            title="Forgot Password"
            subtitle="CamDEBATE account recovery"
          />
          <Card.Content>
            <TextInput label="Phone (Cambodia) or E-Mail" mode="outlined" />
          </Card.Content>
        </Card>
        <Button
          mode="contained"
          contentStyle={{
            height: 50
          }}
          onPress={() => console.log('Request New Password!')}>
          Request Password
        </Button>
      </Content>
    </>
  )
}

const Card = styled(PaperCard)`
  margin-bottom: 10px;
`

const Content = styled.View`
  padding: 20px;
`

export default ForgotPasswordScreen
