import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  Button,
  Card as PaperCard,
  HelperText,
  TextInput
} from 'react-native-paper'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { Formik } from 'formik'
import { object, string } from 'yup'

import { AppBar } from '../../components'
import { LoginMutation } from '../../resources/mutations'
import { loginAsync, signinInputChange } from '../../service'

const INITIAL_LOCAL_STATE = {
  Phone: undefined,
  Password: undefined
}

const SignupSchemaPhone = object().shape({
  Phone: string()
    .min(7, 'Phone number must be at least 9 characters.')
    .max(15, 'Phone number length is too long.')
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      'Phone number is not valid.'
    )
    .required('Phone number is required!'),
  Password: string()
    .min(6, 'Password should be at least 6 characters.')
    .max(50, 'Password length is too long.')
    .required('Password is required!')
})

const SignupSchemaEmail = object().shape({
  Phone: string()
    .min(7, 'Email must be at least 7 characters.')
    .max(50, 'Email length is too long.')
    .email('Email is not valid.')
    .required('Phone number is required!'),
  Password: string()
    .min(6, 'Password should be at least 6 characters.')
    .max(50, 'Password length is too long.')
    .required('Password is required!')
})

const SigninScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const globalState = useSelector(state => state.signin, shallowEqual)
  const [signinBy, setSigninBy] = useState('Phone')
  const [localState, setLocalState] = useState(INITIAL_LOCAL_STATE)
  const [login, { data, error: loginError }] = useMutation(LoginMutation)
  console.log('SigninScreen data', data, 'loginError', loginError)
  console.log('SigninScreen globalState', globalState)
  console.log('SigninScreen localState', localState)

  const { Phone, Password } = localState

  const handleTextChange = type => newValue => {
    setLocalState({
      ...localState,
      [type]: newValue
    })
  }

  const handleValueChange = type => {
    dispatch(signinInputChange(type, localState[type]))
  }

  const handleLogin = async () => {
    try {
      await login({
        variables: {
          input: {
            Phone: globalState.Phone,
            Password: globalState.Password
          }
        }
      })
    } catch (e) {
      console.log('handleLogin e', e)
    }
  }

  useEffect(() => {
    if (data && data.login && data.login.token && data.login.code === 200) {
      dispatch(loginAsync(data.login.token)).then(token => {
        console.log('SigninScreen logged in', token)
        if (token) navigation.navigate('App')
      })
    }
  }, [data])

  return (
    <Container>
      <AppBar />
      <Formik
        initialValues={{ Phone: '', Password: '' }}
        validationSchema={
          signinBy === 'Phone' ? SignupSchemaPhone : SignupSchemaEmail
        }
        onSubmit={values => console.log('valuves', values)}>
        {({ handleChange, handleBlur, handleSubmit, errors, values }) => (
          <Content
            contentContainerStyle={{
              flexGrow: 1,
              padding: 10
            }}>
            <Card>
              <Card.Title title="Sign In" subtitle="CamDEBATE account login" />
              <Card.Content>
                <TextInputMargined
                  label={signinBy === 'Phone' ? 'Phone (Cambodia)' : 'Email'}
                  mode="outlined"
                  value={values.Phone}
                  onChangeText={handleChange('Phone')}
                  onBlur={handleBlur('Phone')}
                />
                {errors.Phone ? (
                  <HelperText padding="none" type="error">
                    {errors.Phone}
                  </HelperText>
                ) : null}
                <TextInput
                  autoCompleteType="password"
                  label="Password"
                  mode="outlined"
                  secureTextEntry={true}
                  textContentType="password"
                  value={values.Password}
                  onChangeText={handleChange('Password')}
                  onBlur={handleBlur('Password')}
                />
                {errors.Password ? (
                  <HelperText padding="none" type="error">
                    {errors.Password}
                  </HelperText>
                ) : null}
              </Card.Content>
            </Card>
            <ButtonLogin
              mode="contained"
              contentStyle={{ width: '100%', height: 50 }}
              onPress={handleSubmit}>
              Login
            </ButtonLogin>
            <Button
              onPress={() =>
                setSigninBy(signinBy === 'Phone' ? 'Email' : 'Phone')
              }>
              {`Login by ${signinBy === 'Phone' ? 'Email' : 'Phone'}?`}
            </Button>
            <Button onPress={() => navigation.navigate('Forgot')}>
              Forget password?
            </Button>
          </Content>
        )}
      </Formik>
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

/*
<TextInputMargined
  label="Phone (Cambodia) or E-Mail"
  error={loginError || (data && !data.login.success)}
  mode="outlined"
  value={Phone}
  onChangeText={handleTextChange('Phone')}
  onBlur={handleValueChange('Phone')}
/>
<TextInput
  autoCompleteType="password"
  error={loginError || (data && !data.login.success)}
  label="Password"
  mode="outlined"
  secureTextEntry={true}
  textContentType="password"
  value={Password}
  onChangeText={handleTextChange('Password')}
  onBlur={handleValueChange('Password')}
/>
{loginError || (data && !data.login.success) ? (
  <HelperText padding="none" type="error">
    {loginError ? loginError.message : 'Invalid credentials'}
  </HelperText>
) : null}
*/
