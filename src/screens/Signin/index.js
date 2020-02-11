import React from 'react'
import styled from 'styled-components/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, Card as PaperCard, TextInput } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import { AppBar } from '../../components'
import { loginAsync } from '../../service'

const SigninScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const handleLoginPress = async () => {
    const token = await dispatch(loginAsync())
    if (token) navigation.navigate('App')
  }

  return (
    <Container>
      <AppBar />
      <Content
        contentContainerStyle={{
          flexGrow: 1,
          padding: 10
        }}>
        <Card>
          <Card.Title title="Sign In" subtitle="CamDEBATE account login" />
          <Card.Content>
            <TextInputMargined
              label="Phone (Cambodia) or E-Mail"
              mode="outlined"
            />
            <TextInput
              autoCompleteType="password"
              label="Password"
              mode="outlined"
              secureTextEntry={true}
              textContentType="password"
            />
          </Card.Content>
        </Card>
        <ButtonLogin
          mode="contained"
          contentStyle={{ width: '100%', height: 50 }}
          onPress={handleLoginPress}>
          Login
        </ButtonLogin>
        <Button onPress={() => navigation.navigate('Forgot')}>
          Forget password?
        </Button>
      </Content>
      <Footer>
        <Text>Do not have a CamDEBATE account?</Text>
        <ButtonSignup
          mode="contained"
          contentStyle={{ height: 50 }}
          onPress={() => navigation.navigate('Signup')}>
          Sign Up
        </ButtonSignup>
      </Footer>
    </Container>
  )
}

const ButtonLogin = styled(Button)`
  margin-bottom: 10px;
`

const ButtonSignup = styled(Button)`
  margin-top: 10px;
`

const Card = styled(PaperCard)`
  justify-content: flex-start;
  margin-bottom: 10px;
`

const Container = styled.View`
  flex: 1;
`

const Content = styled(KeyboardAwareScrollView)`
  flex: 1;
`

const Footer = styled.View`
  align-items: center;
  padding-bottom: 20px;
`

const Text = styled.Text`
  font-size: 14px;
`

const TextInputMargined = styled(TextInput)`
  margin-bottom: 10px;
`

export default SigninScreen
