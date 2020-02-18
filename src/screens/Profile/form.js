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
import React from 'react'
import styled from 'styled-components/native'
import { Button, HelperText, TextInput } from 'react-native-paper'
import { useMutation } from '@apollo/react-hooks'
import { Formik } from 'formik'
import { object, string } from 'yup'

import { DatePicker, Picker, Radio } from '../../components'
import { primaryColor } from '../../resources'
import {
  GenderRadioItems,
  NationalityItems,
  TitleItems
} from '../../resources/mocks'
import { UpdateProfileMutation } from '../../resources/mutations'

const ProfileSchema = object().shape({
  Title: string().required(),
  GivenName: string().required(),
  FamilyName: string().required(),
  Sex: string().required(),
  Nationality: string().required(),
  DOB: string().required(),
  Phone: string().required(),
  Email: string().required(),
  WorkPlace: string().required()
})

const ProfileForm = () => {
  const [
    updateProfile,
    { data: updateData, error: updateError, loading: updateLoading }
  ] = useMutation(UpdateProfileMutation)

  const InitialValues = {
    Title: data ? data.profile.contact.Title : '',
    GivenName: data ? data.profile.contact.GivenName : '',
    FamilyName: data ? data.profile.contact.FamilyName : '',
    Sex: data ? data.profile.contact.Sex : '',
    Nationality: data ? data.profile.contact.Nationality : '',
    DOB: data ? data.profile.contact.DOB : '',
    Phone: data ? data.profile.contact.Phone : '',
    GuardianPhone: data ? data.profile.contact.GuardianPhone : '',
    Email: data ? data.profile.contact.Email : '',
    Address: data ? data.profile.contact.Address : '',
    School: data ? data.profile.contact.School : '',
    WorkPlace: data ? data.profile.contact.WorkPlace : ''
  }

  const handleUpdateProfile = async values => {
    console.log('handleUpdateProfile values', values)
    try {
      setToggleSnackbar(true)
      const res = await updateProfile({
        variables: {
          input: values
        },
        refetchQueries: [{ query: ProfileQuery }],
        awaitRefetchQueries: true
      })
      console.log('handleUpdateProfile response', res)
      const { code } = res.data.updateProfile
      if (code === 200) setToggleSnackbar(false)
    } catch (e) {
      console.log('updateProfile e', e)
    }
  }

  return (
    <Formik
      enableReinitialize
      initialValues={InitialValues}
      validationSchema={ProfileSchema}
      onSubmit={handleUpdateProfile}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        dirty,
        errors,
        touched,
        values
      }) => (
        <>
          <Card>
            <Card.Title title="Your Details" />
            <Card.Content>
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
              <TextInputMargined
                label="Given Name"
                mode="outlined"
                value={values.GivenName}
                onChangeText={handleChange('GivenName')}
                onBlur={handleBlur('GivenName')}
              />
              {touched.GivenName && errors.GivenName ? (
                <HelperText padding="none" type="error">
                  {errors.GivenName}
                </HelperText>
              ) : null}
              <TextInputMargined
                label="Family Name"
                mode="outlined"
                value={values.FamilyName}
                onChangeText={handleChange('FamilyName')}
                onBlur={handleBlur('FamilyName')}
              />
              {touched.FamilyName && errors.FamilyName ? (
                <HelperText padding="none" type="error">
                  {errors.FamilyName}
                </HelperText>
              ) : null}
              <Radio
                color={primaryColor}
                items={GenderRadioItems}
                label="Gender"
                orientation="horizontal"
                value={values.Sex}
                style={{ marginBottom: 10 }}
                onChangeValue={handleChange('Sex')}
              />
              {touched.Sex && errors.Sex ? (
                <HelperText padding="none" type="error">
                  {errors.Sex}
                </HelperText>
              ) : null}
              <PickerMargined
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
              <DatePicker
                value={values.DOB}
                style={{ marginBottom: 10 }}
                onChangeValue={handleChange('DOB')}
              />
              {touched.DOB && errors.DOB ? (
                <HelperText padding="none" type="error">
                  {errors.DOB}
                </HelperText>
              ) : null}
              <TextInputMargined
                label="Personal Phone"
                mode="outlined"
                value={values.Phone}
                onChangeText={handleChange('Phone')}
                onBlur={handleBlur('Phone')}
              />
              {touched.Phone && errors.Phone ? (
                <HelperText padding="none" type="error">
                  {errors.Phone}
                </HelperText>
              ) : null}
              <TextInputMargined
                label="Working/Guardian Phone"
                mode="outlined"
                value={values.GuardianPhone}
                onChangeText={handleChange('GuardianPhone')}
                onBlur={handleBlur('GuardianPhone')}
              />
              {touched.GuardianPhone && errors.GuardianPhone ? (
                <HelperText padding="none" type="error">
                  {errors.GuardianPhone}
                </HelperText>
              ) : null}
              <TextInputMargined
                label="E-Mail"
                mode="outlined"
                value={values.Email}
                onChangeText={handleChange('Email')}
                onBlur={handleBlur('Email')}
              />
              {touched.Email && errors.Email ? (
                <HelperText padding="none" type="error">
                  {errors.Email}
                </HelperText>
              ) : null}
              <TextInputMargined
                label="Current Address"
                mode="outlined"
                value={values.Address}
                onChangeText={handleChange('Address')}
                onBlur={handleBlur('Address')}
              />
              {touched.Address && errors.Address ? (
                <HelperText padding="none" type="error">
                  {errors.Address}
                </HelperText>
              ) : null}
              <TextInputMargined
                label="Name of Your School"
                mode="outlined"
                value={values.School}
                onChangeText={handleChange('School')}
                onBlur={handleBlur('School')}
              />
              {touched.School && errors.School ? (
                <HelperText padding="none" type="error">
                  {errors.School}
                </HelperText>
              ) : null}
              <TextInput
                label="Workplace"
                mode="outlined"
                value={values.WorkPlace}
                onChangeText={handleChange('WorkPlace')}
                onBlur={handleBlur('WorkPlace')}
              />
              {touched.WorkPlace && errors.WorkPlace ? (
                <HelperText padding="none" type="error">
                  {errors.WorkPlace}
                </HelperText>
              ) : null}
            </Card.Content>
          </Card>
          {updateError ? (
            <HelperText padding="none" type="error">
              {updateError.message}
            </HelperText>
          ) : null}
          <Button
            disabled={updateLoading}
            loading={updateLoading}
            mode="contained"
            contentStyle={{ width: '100%', height: 50 }}
            onPress={e => dirty && handleSubmit(e)}>
            Save
          </Button>
        </>
      )}
    </Formik>
  )
}

const PickerMargined = styled(Picker)`
  margin-bottom: 10px;
`

const TextInputMargined = styled(TextInput)`
  margin-bottom: 10px;
`

export default ProfileForm
