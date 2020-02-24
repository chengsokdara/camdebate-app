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
import React, { memo, useRef, useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import styled from 'styled-components/native'
import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  Button,
  Card as PaperCard,
  HelperText,
  Snackbar,
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

const PHONE_EXIST = 'Phone number already exist!'

const SignupSchema = object().shape({
  GivenName: string()
    .min(2, 'Given name must be at least 2 characters.')
    .max(50, 'Given name length is too long.')
    .required('Given name is required.'),
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
    .min(9, 'Email must be at least 7 characters.')
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
  const refFamilyName = useRef()
  const refPhone = useRef()
  const refEmail = useRef()
  const refPassword = useRef()
  const [toggleSnackbar, setToggleSnackbar] = useState('')
  const [register, { data, error, loading }] = useMutation(RegisterMutation)
  console.log('SignupScreen data', data, 'error', error)

  const handleRegister = async values => {
    console.log('handleRegister values', values)
    try {
      const playerJson = await AsyncStorage.getItem('player')
      const player = JSON.parse(playerJson)
      const res = await register({
        variables: {
          input: {
            ...values,
            PlayerID: player ? player.ID : undefined
          }
        }
      })
      const { code, token, contact } = res.data.register
      if (code === 200) {
        const logged = await dispatch(loginAsync(token, contact))
        console.log('SignupScreen logged', logged)
        if (logged) navigation.navigate('App')
      }
      if (code === 303) {
        setToggleSnackbar(PHONE_EXIST)
      } else setToggleSnackbar('There is some errors!')
      console.log('handleRegister response', res)
    } catch (e) {
      console.log('handleRegister e', e)
      setToggleSnackbar('Unknown Error!')
    }
  }

  return (
    <Container>
      <AppBar onLogoPress={() => navigation.openDrawer()} />
      <Content
        contentContainerStyle={{
          flexGrow: 1,
          padding: 10
        }}>
        <Formik
          initialValues={InitialValues}
          validationSchema={SignupSchema}
          onSubmit={handleRegister}>
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            errors,
            touched,
            values
          }) => (
            <>
              <Card>
                <Card.Title
                  title="Sign Up"
                  subtitle="CamDEBATE account registration"
                />
                <Card.Content>
                  <TextInputMargined
                    autoCompleteType="name"
                    label="Given Name"
                    mode="outlined"
                    textContentType="givenName"
                    value={values.GivenName}
                    onChangeText={handleChange('GivenName')}
                    onBlur={handleBlur('GivenName')}
                    onSubmitEditing={() => refFamilyName.current.focus()}
                  />
                  {touched.GivenName && errors.GivenName ? (
                    <HelperText padding="none" type="error">
                      {errors.GivenName}
                    </HelperText>
                  ) : null}
                  <TextInputMargined
                    ref={refFamilyName}
                    autoCompleteType="name"
                    label="Family Name"
                    mode="outlined"
                    textContentType="familyName"
                    value={values.FamilyName}
                    onChangeText={handleChange('FamilyName')}
                    onBlur={handleBlur('FamilyName')}
                    onSubmitEditing={() => refPhone.current.focus()}
                  />
                  {touched.FamilyName && errors.FamilyName ? (
                    <HelperText padding="none" type="error">
                      {errors.FamilyName}
                    </HelperText>
                  ) : null}
                  <TextInputMargined
                    ref={refPhone}
                    autoCompleteType="tel"
                    keyboardType="phone-pad"
                    label="Phone (Cambodia)"
                    mode="outlined"
                    textContentType="telephoneNumber"
                    value={values.Phone}
                    onChangeText={handleChange('Phone')}
                    onBlur={handleBlur('Phone')}
                    onSubmitEditing={() => refEmail.current.focus()}
                  />
                  {touched.Phone && errors.Phone ? (
                    <HelperText padding="none" type="error">
                      {errors.Phone}
                    </HelperText>
                  ) : null}
                  <TextInputMargined
                    ref={refEmail}
                    autoCompleteType="email"
                    keyboardType="email-address"
                    label="E-Mail (Optional)"
                    mode="outlined"
                    textContentType="emailAddress"
                    value={values.Email}
                    onChangeText={handleChange('Email')}
                    onBlur={handleBlur('Email')}
                    onSubmitEditing={() => refPassword.current.focus()}
                  />
                  {touched.Email && errors.Email ? (
                    <HelperText padding="none" type="error">
                      {errors.Email}
                    </HelperText>
                  ) : null}
                  <TextInputMargined
                    ref={refPassword}
                    secureTextEntry
                    autoCompleteType="password"
                    label="New Password"
                    mode="outlined"
                    textContentType="password"
                    value={values.Password}
                    onChangeText={handleChange('Password')}
                    onBlur={handleBlur('Password')}
                  />
                  {touched.Password && errors.Password ? (
                    <HelperText padding="none" type="error">
                      {errors.Password}
                    </HelperText>
                  ) : null}
                  <PickerMargined
                    items={TitleItems}
                    label="Select Title"
                    value={values.Title}
                    onChangeValue={handleChange('Title')}
                  />
                  {touched.Title && errors.Title ? (
                    <HelperText padding="none" type="error">
                      {errors.Title}
                    </HelperText>
                  ) : null}
                  <PickerMargined
                    items={CountryItems}
                    label="Select Country"
                    value={values.Country}
                    onChangeValue={handleChange('Country')}
                  />
                  {touched.Country && errors.Country ? (
                    <HelperText padding="none" type="error">
                      {errors.Country}
                    </HelperText>
                  ) : null}
                  <Picker
                    items={NationalityItems}
                    label="Select Nationality"
                    value={values.Nationality}
                    onChangeValue={handleChange('Nationality')}
                  />
                  {touched.Nationality && errors.Nationality ? (
                    <HelperText padding="none" type="error">
                      {errors.Nationality}
                    </HelperText>
                  ) : null}
                </Card.Content>
              </Card>
              <Button
                disabled={loading}
                loading={loading}
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
            disabled={loading}
            mode="contained"
            contentStyle={{ height: 50 }}
            onPress={() => navigation.navigate('Signin')}>
            Sign In
          </ButtonSignin>
        </Footer>
      </Content>
      <Snackbar
        duration={toggleSnackbar === PHONE_EXIST ? 10000 : 5000}
        visible={toggleSnackbar}
        onDismiss={() => setToggleSnackbar('')}
        action={{
          label: toggleSnackbar === PHONE_EXIST ? 'Login' : 'Done',
          onPress: () =>
            toggleSnackbar === PHONE_EXIST
              ? navigation.navigate('Signin')
              : setToggleSnackbar('')
        }}>
        {toggleSnackbar || 'Unknown error!'}
      </Snackbar>
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

export default memo(SignupScreen)
