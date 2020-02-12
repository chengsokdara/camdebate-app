import React, { useEffect } from 'react'
import styled from 'styled-components/native'
import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  Button,
  Card as PaperCard,
  HelperText,
  TextInput
} from 'react-native-paper'
import { Formik } from 'formik'
import { object, string } from 'yup'

import { AppBar, Picker } from '../../components'
import { RegisterMutation } from '../../resources/mutations'
import {
  TitleItems,
  NationalityItems,
  CountryItems
} from '../../resources/mocks'
import { loginAsync } from '../../service'

const InitialValues = {
  Title: '',
  GivenName: '',
  FamilyName: '',
  Nationality: '',
  Country: '',
  Phone: '',
  Email: '',
  Password: ''
}

const SignupSchema = object().shape({
  GivenName: string()
    .min(2, 'Given name must be at least 2 characters.')
    .max(50, 'Given name length is too long.'),
  FamilyName: string()
    .min(2, 'Family name must be at least 2 characters.')
    .max(50, 'Family name length is too long.'),
  Phone: string()
    .min(7, 'Phone number must be at least 9 characters.')
    .max(15, 'Phone number length is too long.')
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      'Phone number is not valid.'
    )
    .required('Phone number is required!'),
  Email: string()
    .min(7, 'Email must be at least 7 characters.')
    .max(50, 'Email length is too long.')
    .email('Email is not valid.'),
  Password: string()
    .min(6, 'Password should be at least 6 characters.')
    .max(50, 'Password length is too long.')
    .required('Password is required!')
})

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
  const [register, { data }] = useMutation(RegisterMutation)

  console.log('SignupScreen data', data)

  const handleRegister = async values => {
    console.log('handleRegister values', values)
    try {
      const res = await register({
        variables: {
          input: values
        }
      })
      /*
      register({
        variables: {
          input: TEST_REGISTER_DATA
        }
      })
      */
      console.log('handleRegister response', res)
      const { code } = res.data.register
      if (code === 200) setToggleSnackbar(false)
    } catch (e) {
      console.log('handleRegister e', e)
    }
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
        <Formik
          initialValues={InitialValues}
          validationSchema={SignupSchema}
          onSubmit={handleRegister}>
          {({ handleChange, handleBlur, handleSubmit, errors, values }) => (
            <>
              <Card>
                <Card.Title
                  title="Sign Up"
                  subtitle="CamDEBATE account registration"
                />
                <Card.Content>
                  <PickerMargined
                    items={TitleItems}
                    label="Select Title"
                    value={values.Title}
                    onChangeValue={handleChange('Title')}
                  />
                  <TextInputMargined
                    autoCompleteType="name"
                    label="Given Name"
                    mode="outlined"
                    textContentType="givenName"
                    value={values.GivenName}
                    onChangeText={handleChange('GivenName')}
                    onBlur={handleBlur('GivenName')}
                  />
                  {errors.GivenName ? (
                    <HelperText padding="none" type="error">
                      {errors.GivenName}
                    </HelperText>
                  ) : null}
                  <TextInputMargined
                    autoCompleteType="name"
                    label="Family Name"
                    mode="outlined"
                    textContentType="familyName"
                    value={values.FamilyName}
                    onChangeText={handleChange('FamilyName')}
                    onBlur={handleBlur('FamilyName')}
                  />
                  {errors.FamilyName ? (
                    <HelperText padding="none" type="error">
                      {errors.FamilyName}
                    </HelperText>
                  ) : null}
                  <PickerMargined
                    items={NationalityItems}
                    label="Select Nationality"
                    value={values.Nationality}
                    onChangeValue={handleChange('Nationality')}
                  />
                  <PickerMargined
                    items={CountryItems}
                    label="Select Country"
                    value={values.Country}
                    onChangeValue={handleChange('Country')}
                  />
                  <TextInputMargined
                    autoCompleteType="tel"
                    keyboardType="phone-pad"
                    label="Phone (Cambodia)"
                    mode="outlined"
                    textContentType="telephoneNumber"
                    value={values.Phone}
                    onChangeText={handleChange('Phone')}
                    onBlur={handleBlur('Phone')}
                  />
                  {errors.Phone ? (
                    <HelperText padding="none" type="error">
                      {errors.Phone}
                    </HelperText>
                  ) : null}
                  <TextInputMargined
                    autoCompleteType="email"
                    keyboardType="email-address"
                    label="E-Mail (Optional)"
                    mode="outlined"
                    textContentType="emailAddress"
                    value={values.Email}
                    onChangeText={handleChange('Email')}
                    onBlur={handleBlur('Email')}
                  />
                  {errors.Email ? (
                    <HelperText padding="none" type="error">
                      {errors.Email}
                    </HelperText>
                  ) : null}
                  <TextInput
                    secureTextEntry
                    autoCompleteType="password"
                    label="New Password"
                    mode="outlined"
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
              <Button
                mode="contained"
                contentStyle={{ width: '100%', height: 50 }}
                onPress={handleSubmit}>
                Register
              </Button>
            </>
          )}
        </Formik>
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
