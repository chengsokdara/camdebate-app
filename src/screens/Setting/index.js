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
import React, { useRef, useState } from 'react'
import styled from 'styled-components/native'
import {
  Button,
  Card as PaperCard,
  HelperText,
  Snackbar,
  TextInput
} from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { Formik } from 'formik'
import { object, ref, string } from 'yup'

import { AppBar } from '../../components'
import { ResetPasswordMutation } from '../../resources/mutations'
import { loginAsync } from '../../service'

const ResetPasswordSchema = object().shape({
  OldPassword: string()
    .min(6, 'Old Password should be at least 6 characters.')
    .max(50, 'Old Password length is too long.')
    .required('Old Password is required!'),
  NewPassword: string()
    .min(6, 'New Password should be at least 6 characters.')
    .max(50, 'New Password length is too long.')
    .required('New Password is required!'),
  ConfirmPassword: string()
    .when('NewPassword', {
      is: val => (val && val.length > 0 ? true : false),
      then: string().oneOf(
        [ref('NewPassword')],
        'Both password need to be the same.'
      )
    })
    .min(6, 'Confirm Password should be at least 6 characters.')
    .max(50, 'Confirm Password length is too long.')
    .required('Confirm Password is required!')
})

const SettingScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const refNewPassword = useRef()
  const refConfirmPassword = useRef()
  const [toggleSnackbar, setToggleSnackbar] = useState(false)
  const [
    resetPassword,
    { data: dataReset, loading: loadingReset, error: errorReset }
  ] = useMutation(ResetPasswordMutation)
  console.log('SettingScreen dataReset', dataReset, 'errorReset', errorReset)

  const handleResetPassword = async values => {
    console.log('handleResetPassword values', values)
    try {
      setToggleSnackbar(true)
      const input = {
        OldPassword: values.OldPassword,
        NewPassword: values.NewPassword
      }
      const res = await resetPassword({
        variables: {
          input
        }
      })
      const { code, token, contact } = res.data.resetPassword
      if (code === 200) {
        const logged = await dispatch(loginAsync(token, contact))
        console.log('SettingScreen logged', logged)
        if (logged) setToggleSnackbar(false)
      }
    } catch (e) {
      console.log('handleResetPassword e', e)
    }
  }

  return (
    <Container>
      <AppBar
        backable
        title="Settings"
        onBackPress={() => navigation.goBack()}
      />
      <Formik
        initialValues={{
          OldPassword: '',
          NewPassword: '',
          ConfirmPassword: ''
        }}
        validationSchema={ResetPasswordSchema}
        onSubmit={handleResetPassword}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
          values
        }) => (
          <Content>
            <Card>
              <Card.Title title="Reset Password" />
              <Card.Content>
                <TextInputMargined
                  secureTextEntry
                  autoCompleteType="password"
                  label="Old Password"
                  mode="outlined"
                  textContentType="password"
                  value={values.OldPassword}
                  onChangeText={handleChange('OldPassword')}
                  onBlur={handleBlur('OldPassword')}
                  onSubmitEditing={() => refNewPassword.current.focus()}
                />
                {touched.OldPassword && errors.OldPassword ? (
                  <HelperText padding="none" type="error">
                    {errors.OldPassword}
                  </HelperText>
                ) : null}
                <TextInputMargined
                  ref={refNewPassword}
                  secureTextEntry
                  autoCompleteType="password"
                  label="New Password"
                  mode="outlined"
                  textContentType="password"
                  value={values.NewPassword}
                  onChangeText={handleChange('NewPassword')}
                  onBlur={handleBlur('OldPassword')}
                  onSubmitEditing={() => refConfirmPassword.current.focus()}
                />
                {touched.NewPassword && errors.NewPassword ? (
                  <HelperText padding="none" type="error">
                    {errors.NewPassword}
                  </HelperText>
                ) : null}
                <TextInput
                  ref={refConfirmPassword}
                  secureTextEntry
                  autoCompleteType="password"
                  label="Confirm New Password"
                  mode="outlined"
                  textContentType="password"
                  value={values.ConfirmPassword}
                  onChangeText={handleChange('ConfirmPassword')}
                  onBlur={handleBlur('ConfirmPassword')}
                />
                {touched.ConfirmPassword && errors.ConfirmPassword ? (
                  <HelperText padding="none" type="error">
                    {errors.ConfirmPassword}
                  </HelperText>
                ) : null}
              </Card.Content>
            </Card>
            <Button
              disabled={loadingReset}
              loading={loadingReset}
              mode="contained"
              contentStyle={{
                height: 50
              }}
              onPress={handleSubmit}>
              Reset
            </Button>
          </Content>
        )}
      </Formik>
      <Snackbar
        visible={toggleSnackbar}
        onDismiss={() => setToggleSnackbar(!toggleSnackbar)}
        action={{
          label: 'Done',
          onPress: () => setToggleSnackbar(!toggleSnackbar)
        }}>
        Password updated!
      </Snackbar>
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
