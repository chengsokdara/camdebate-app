import React from 'react'
import styled from 'styled-components/native'
import { Button, Card as PaperCard, TextInput } from 'react-native-paper'

import { AppBar } from '../../components'

const SettingScreen = ({ navigation }) => {
  return (
    <Container>
      <AppBar
        backable
        title="Settings"
        onBackPress={() => navigation.goBack()}
      />
      <Content>
        <Card>
          <Card.Title title="Reset Password" />
          <Card.Content>
            <TextInputMargined
              autoComp
              autoCompleteType="password"
              label="Old Password"
              mode="outlined"
              secureTextEntry={true}
              textContentType="password"
            />
            <TextInputMargined
              autoComp
              autoCompleteType="password"
              label="New Password"
              mode="outlined"
              secureTextEntry={true}
              textContentType="password"
            />
            <TextInput
              autoComp
              autoCompleteType="password"
              label="Confirm New Password"
              mode="outlined"
              secureTextEntry={true}
              textContentType="password"
            />
          </Card.Content>
        </Card>
        <Button
          mode="contained"
          contentStyle={{
            height: 50
          }}
          onPress={() => console.log('Request New Password!')}>
          Reset
        </Button>
      </Content>
    </Container>
  )
}

const Card = styled(PaperCard)`
  margin-bottom: 10px;
`

const Container = styled.View`
  flex: 1;
`

const Content = styled.View`
  flex: 1;
  padding: 10px;
`

const Text = styled.Text`
  font-size: 24px;
  font-weight: bold;
`

const TextInputMargined = styled(TextInput)`
  margin-bottom: 10px;
`

export default SettingScreen
