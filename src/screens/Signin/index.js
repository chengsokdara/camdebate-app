import React, { useRef, useState } from 'react'
import styled from 'styled-components/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  Button,
  Card as PaperCard,
  HelperText,
  TextInput
} from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { Formik } from 'formik'
import { object, string } from 'yup'

import { AppBar } from '../../components'
import { LoginMutation } from '../../resources/mutations'
import { loginAsync } from '../../service'

const SigninSchemaPhone = object().shape({
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

const SigninSchemaEmail = object().shape({
  Phone: string()
    .min(7, 'Email must be at least 7 characters.')
    .max(50, 'Email length is too long.')
    .email('Email is not valid.')
    .required('Email is required!'),
  Password: string()
    .min(6, 'Password should be at least 6 characters.')
    .max(50, 'Password length is too long.')
    .required('Password is required!')
})

const SigninScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const refPassword = useRef()
  const [signinBy, setSigninBy] = useState('Phone')
  const [login, { data, loading, error }] = useMutation(LoginMutation)
  console.log('SigninScreen data', data, 'error', error)

  const handleLogin = async values => {
    console.log('handleLogin values', values)
    try {
      const res = await login({
        variables: {
          input: values
        }
      })
      const { code, token } = res.data.login
      if (code === 200) {
        const logged = await dispatch(loginAsync(token))
        console.log('SigninScreen logged', logged)
        if (logged) navigation.navigate('App')
      }
      console.log('handleLogin response', res)
    } catch (e) {
      console.log('handleLogin e', e)
    }
  }

  return (
    <Container>
      <AppBar />
      <Formik
        initialValues={{ Phone: '', Password: '' }}
        validationSchema={
          signinBy === 'Phone' ? SigninSchemaPhone : SigninSchemaEmail
        }
        onSubmit={handleLogin}>
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
                  autoFocus
                  autoCompleteType={signinBy === 'Phone' ? 'tel' : 'email'}
                  keyboardType={
                    signinBy === 'Phone' ? 'phone-pad' : 'email-address'
                  }
                  label={signinBy === 'Phone' ? 'Phone (Cambodia)' : 'Email'}
                  mode="outlined"
                  textContentType={
                    signinBy === 'Phone' ? 'telephoneNumber' : 'emailAddress'
                  }
                  value={values.Phone}
                  onChangeText={handleChange('Phone')}
                  onBlur={handleBlur('Phone')}
                  onSubmitEditing={() => refPassword.current.focus()}
                />
                {errors.Phone ? (
                  <HelperText padding="none" type="error">
                    {errors.Phone}
                  </HelperText>
                ) : null}
                <TextInput
                  ref={refPassword}
                  secureTextEntry
                  autoCompleteType="password"
                  label="Password"
                  mode="outlined"
                  returnKeyType="go"
                  textContentType="password"
                  value={values.Password}
                  onChangeText={handleChange('Password')}
                  onBlur={handleBlur('Password')}
                />
                {(data && data.login && data.login.code === 401) ||
                error ||
                errors.Password ? (
                  <HelperText padding="none" type="error">
                    {(data && data.login && data.login.message) ||
                      (error && error.message) ||
                      errors.Password}
                  </HelperText>
                ) : null}
              </Card.Content>
            </Card>
            <ButtonLogin
              disabled={loading}
              loading={loading}
              mode="contained"
              contentStyle={{ width: '100%', height: 50 }}
              onPress={handleSubmit}>
              Login
            </ButtonLogin>
            <Button
              disabled={loading}
              onPress={() =>
                setSigninBy(signinBy === 'Phone' ? 'Email' : 'Phone')
              }>
              {`Login by ${signinBy === 'Phone' ? 'Email' : 'Phone'}?`}
            </Button>
            <Button
              disabled={loading}
              onPress={() => navigation.navigate('Forgot')}>
              Forget password?
            </Button>
          </Content>
        )}
      </Formik>
      <Footer>
        <Text>Do not have a CamDEBATE account?</Text>
        <ButtonSignup
          disabled={loading}
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
