import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, Card as PaperCard, TextInput } from 'react-native-paper'

import { AppBar, Picker } from '../../components'
import { RegisterMutation } from '../../resources/mutations'
import {
  TitleItems,
  NationalityItems,
  CountryItems
} from '../../resources/mocks'
import { loginAsync, signupInputChange } from '../../service'

const INITIAL_LOCAL_STATE = {
  Email: undefined,
  FamilyName: undefined,
  GivenName: undefined,
  Password: undefined,
  Phone: undefined
}

const TEST_REGISTER_DATA = {
  Country: 'Cambodia',
  Email: 'chengsokdara@gmail.com',
  FamilyName: 'Cheng',
  GivenName: 'Sokdara',
  Nationality: 'Cambodian',
  Password: 'scTNE.20',
  Phone: '086558716',
  Title: 'Mr'
}

const SignupScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const globalState = useSelector(state => state.signup, shallowEqual)
  const [localState, setLocalState] = useState(INITIAL_LOCAL_STATE)
  const [register, { data }] = useMutation(RegisterMutation)

  const { Country, Nationality, Title } = globalState
  const { Email, FamilyName, GivenName, Password, Phone } = localState
  console.log('SignupScreen data', data)
  console.log('SignupScreen globalState', globalState)
  console.log('SignupScreen localState', localState)

  const handleTextChange = type => newValue => {
    setLocalState({
      ...localState,
      [type]: newValue
    })
  }

  const handleValueChange = (type, newValue) => {
    dispatch(signupInputChange(type, newValue))
  }

  const handleRegister = () => {
    register({
      variables: {
        input: {
          Country,
          Email: globalState.Email,
          FamilyName: globalState.FamilyName,
          GivenName: globalState.GivenName,
          Nationality,
          Password: globalState.Password,
          Phone: globalState.Phone,
          Title
        }
      }
    })
    /*
    register({
      variables: {
        input: TEST_REGISTER_DATA
      }
    })
    */
  }

  useEffect(() => {
    if (
      data &&
      data.register &&
      data.register.token &&
      data.register.code === 200
    ) {
      dispatch(loginAsync(data.register.token)).then(token => {
        console.log('SignupScreen logged in', token)
        if (token) navigation.navigate('App')
      })
    }
  }, [data])

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
            <PickerMargined
              items={TitleItems}
              label="Select Title"
              value={Title}
              onChangeValue={value => handleValueChange('Title', value)}
            />
            <TextInputMargined
              label="Given Name"
              mode="outlined"
              value={GivenName}
              onChangeText={handleTextChange('GivenName')}
              onBlur={() => handleValueChange('GivenName', GivenName)}
            />
            <TextInputMargined
              label="Family Name"
              mode="outlined"
              value={FamilyName}
              onChangeText={handleTextChange('FamilyName')}
              onBlur={() => handleValueChange('FamilyName', FamilyName)}
            />
            <PickerMargined
              items={NationalityItems}
              label="Select Nationality"
              value={Nationality}
              onChangeValue={value => handleValueChange('Nationality', value)}
            />
            <PickerMargined
              items={CountryItems}
              label="Select Country"
              value={Country}
              onChangeValue={value => handleValueChange('Country', value)}
            />
            <TextInputMargined
              label="Phone (Cambodia)"
              mode="outlined"
              value={Phone}
              onChangeText={handleTextChange('Phone')}
              onBlur={() => handleValueChange('Phone', Phone)}
            />
            <TextInputMargined
              label="E-Mail (Optional)"
              mode="outlined"
              value={Email}
              onChangeText={handleTextChange('Email')}
              onBlur={() => handleValueChange('Email', Email)}
            />
            <TextInput
              autoCompleteType="password"
              label="New Password"
              mode="outlined"
              secureTextEntry={true}
              textContentType="password"
              value={Password}
              onChangeText={handleTextChange('Password')}
              onBlur={() => handleValueChange('Password', Password)}
            />
          </Card.Content>
        </Card>
        <Button
          mode="contained"
          contentStyle={{ width: '100%', height: 50 }}
          onPress={handleRegister}>
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
