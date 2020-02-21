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
import React, { useState } from 'react'
import styled from 'styled-components/native'
import {
  Button,
  Card as PaperCard,
  HelperText,
  Snackbar,
  TextInput
} from 'react-native-paper'
import { Formik } from 'formik'
import { object, string } from 'yup'

import { AppBar } from '../../components'

const InitialValues = {
  Phone: ''
}

const ForgotPasswordSchemaPhone = object().shape({
  Phone: string()
    .min(9, 'Phone number must be at least 9 characters.')
    .max(15, 'Phone number length is too long.')
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      'Phone number is not valid.'
    )
    .required('Phone number is required!')
})

const ForgotPasswordSchemaEmail = object().shape({
  Phone: string()
    .min(7, 'Email must be at least 7 characters.')
    .max(50, 'Email length is too long.')
    .email('Email is not valid.')
    .required('Email is required!')
})

const ForgotPasswordScreen = ({ navigation }) => {
  const [signinBy, setSigninBy] = useState('Phone')
  const [toggleSnackbar, setToggleSnackbar] = useState('')

  const handleForgotPassword = values => {
    console.log('Request New Password!', values)
    setToggleSnackbar('Sending you new password.')
  }

  return (
    <>
      <AppBar backable onBackPress={() => navigation.goBack()} />
      <Content>
        <Formik
          initialValues={InitialValues}
          validationSchema={
            signinBy === 'Phone'
              ? ForgotPasswordSchemaPhone
              : ForgotPasswordSchemaEmail
          }
          onSubmit={handleForgotPassword}>
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
                  title="Forgot Password"
                  subtitle="CamDEBATE account recovery"
                />
                <Card.Content>
                  <TextInput
                    autoFocus
                    autoCompleteType={signinBy === 'Phone' ? 'tel' : 'email'}
                    label={signinBy === 'Phone' ? 'Phone (Cambodia)' : 'Email'}
                    mode="outlined"
                    textContentType={
                      signinBy === 'Phone' ? 'telephoneNumber' : 'emailAddress'
                    }
                    value={values.Phone}
                    onChangeText={handleChange('Phone')}
                    onBlur={handleBlur('Phone')}
                  />
                  {touched.Phone && errors.Phone ? (
                    <HelperText padding="none" type="error">
                      {errors.Phone}
                    </HelperText>
                  ) : null}
                </Card.Content>
              </Card>
              <ButtonRequest
                disabled={false}
                loading={false}
                mode="contained"
                contentStyle={{
                  height: 50
                }}
                onPress={handleSubmit}>
                Request Password
              </ButtonRequest>
              <Button
                disabled={false}
                onPress={() =>
                  setSigninBy(signinBy === 'Phone' ? 'Email' : 'Phone')
                }>
                {`Request by ${signinBy === 'Phone' ? 'Email' : 'Phone'}?`}
              </Button>
            </>
          )}
        </Formik>
        <Snackbar
          duration={5000}
          visible={toggleSnackbar}
          onDismiss={() => setToggleSnackbar('')}
          action={{
            label: 'Done',
            onPress: () => setToggleSnackbar('')
          }}>
          {toggleSnackbar || 'Unknown Error!'}
        </Snackbar>
      </Content>
    </>
  )
}

const ButtonRequest = styled(Button)`
  margin-bottom: 10px;
`

const Card = styled(PaperCard)`
  margin-bottom: 10px;
`

const Content = styled.View`
  flex: 1;
  padding: 10px;
`

export default ForgotPasswordScreen
