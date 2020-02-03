import React from 'react'
import styled from 'styled-components/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, Card as PaperCard, TextInput } from 'react-native-paper'

import {
  TitleItems,
  NationalityItems,
  CountryItems
} from '../../resources/mocks'
import { AppBar, Picker } from '../../components'

const SignupScreen = ({ navigation }) => {
  return (
    <Container>
      <AppBar />
      <Content
        contentContainerStyle={{
          flexGrow: 1,
          padding: 10
        }}>
        <Card>
          <Card.Title
            title="Sign Up"
            subtitle="CamDEBATE account registration"
          />
          <Card.Content>
            <PickerMargined items={TitleItems} label="Select Title" />
            <TextInputMargined label="Given Name" mode="outlined" />
            <TextInputMargined label="Family Name" mode="outlined" />
            <PickerMargined
              items={NationalityItems}
              label="Select Nationality"
            />
            <PickerMargined items={CountryItems} label="Select Country" />
            <TextInputMargined label="Phone (Cambodia)" mode="outlined" />
            <TextInputMargined label="E-Mail (Optional)" mode="outlined" />
            <TextInput label="New Password" mode="outlined" />
          </Card.Content>
        </Card>
        <Button
          mode="contained"
          contentStyle={{ width: '100%', height: 50 }}
          onPress={() => navigation.navigate('Signup')}>
          Register
        </Button>
        <Footer>
          <Text>Already has a CamDEBATE account?</Text>
          <ButtonSignin
            mode="contained"
            contentStyle={{ height: 50 }}
            onPress={() => navigation.navigate('Signin')}>
            Sign In
          </ButtonSignin>
        </Footer>
      </Content>
    </Container>
  )
}

const ButtonSignin = styled(Button)`
  margin-top: 10px;
`

const Card = styled(PaperCard)`
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
  padding-top: 20px;
  padding-bottom: 10px;
`

const PickerMargined = styled(Picker)`
  margin-bottom: 10px;
`

const Text = styled.Text`
  font-size: 14px;
`

const TextInputMargined = styled(TextInput)`
  margin-bottom: 10px;
`

export default SignupScreen
