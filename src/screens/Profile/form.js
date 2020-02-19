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
import React, { useRef } from 'react'
import styled from 'styled-components/native'
import {
  Button,
  Card as PaperCard,
  HelperText,
  TextInput
} from 'react-native-paper'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { Formik } from 'formik'

import { DatePicker, Picker, Radio } from '../../components'
import { primaryColor } from '../../resources'
import {
  GenderRadioItems,
  NationalityItems,
  TitleItems
} from '../../resources/mocks'
import { UpdateProfileMutation } from '../../resources/mutations'
import { ProfileQuery } from '../../resources/queries'
import { setProfileAsync } from '../../service'

const ProfileForm = ({ setToggleSnackbar }) => {
  const dispatch = useDispatch()

  const refFamilyName = useRef()
  const refPhone = useRef()
  const refGuardianPhone = useRef()
  const refEmail = useRef()
  const refAddress = useRef()
  const refSchool = useRef()
  const refWorkPlace = useRef()

  const [
    updateProfile,
    { error: updateError, loading: updateLoading }
  ] = useMutation(UpdateProfileMutation)
  const { profile } = useSelector(state => state.auth, shallowEqual)

  const InitialValues = {
    Title: profile ? profile.Title : '',
    GivenName: profile ? profile.GivenName : '',
    FamilyName: profile ? profile.FamilyName : '',
    Sex: profile ? profile.Sex : '',
    Nationality: profile ? profile.Nationality : '',
    DOB: profile ? profile.DOB : '',
    Phone: profile ? profile.Phone : '',
    GuardianPhone: profile ? profile.GuardianPhone : '',
    Email: profile ? profile.Email : '',
    Address: profile ? profile.Address : '',
    School: profile ? profile.School : '',
    WorkPlace: profile ? profile.WorkPlace : ''
  }

  console.log('ProfileScreen profile', profile)

  const handleUpdateProfile = async values => {
    console.log('handleUpdateProfile values', values)
    try {
      const res = await updateProfile({
        variables: {
          input: values
        },
        refetchQueries: [{ query: ProfileQuery }],
        awaitRefetchQueries: true
      })
      console.log('handleUpdateProfile response', res)
      const { code, contact } = res.data.updateProfile
      if (code === 200) {
        await dispatch(setProfileAsync(contact))
        setToggleSnackbar('Profile updated!')
      } else setToggleSnackbar('There is some errors!')
    } catch (e) {
      console.log('updateProfile error', e)
      setToggleSnackbar('Unknown Error!')
    }
  }

  return (
    <Formik
      enableReinitialize
      initialValues={InitialValues}
      onSubmit={handleUpdateProfile}>
      {({
        handleBlur,
        handleChange,
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
                label="Personal Phone"
                mode="outlined"
                textContentType="telephoneNumber"
                value={values.Phone}
                onChangeText={handleChange('Phone')}
                onBlur={handleBlur('Phone')}
                onSubmitEditing={() => refGuardianPhone.current.focus()}
              />
              {touched.Phone && errors.Phone ? (
                <HelperText padding="none" type="error">
                  {errors.Phone}
                </HelperText>
              ) : null}
              <TextInputMargined
                ref={refGuardianPhone}
                autoCompleteType="tel"
                keyboardType="phone-pad"
                label="Working/Guardian Phone"
                mode="outlined"
                textContentType="telephoneNumber"
                value={values.GuardianPhone}
                onChangeText={handleChange('GuardianPhone')}
                onBlur={handleBlur('GuardianPhone')}
                onSubmitEditing={() => refEmail.current.focus()}
              />
              {touched.GuardianPhone && errors.GuardianPhone ? (
                <HelperText padding="none" type="error">
                  {errors.GuardianPhone}
                </HelperText>
              ) : null}
              <TextInputMargined
                ref={refEmail}
                autoCompleteType="email"
                keyboardType="email-address"
                label="E-Mail"
                mode="outlined"
                textContentType="emailAddress"
                value={values.Email}
                onChangeText={handleChange('Email')}
                onBlur={handleBlur('Email')}
                onSubmitEditing={() => refAddress.current.focus()}
              />
              {touched.Email && errors.Email ? (
                <HelperText padding="none" type="error">
                  {errors.Email}
                </HelperText>
              ) : null}
              <TextInputMargined
                ref={refAddress}
                autoCompleteType="street-address"
                label="Current Address"
                mode="outlined"
                textContentType="fullStreetAddress"
                value={values.Address}
                onChangeText={handleChange('Address')}
                onBlur={handleBlur('Address')}
                onSubmitEditing={() => refSchool.current.focus()}
              />
              {touched.Address && errors.Address ? (
                <HelperText padding="none" type="error">
                  {errors.Address}
                </HelperText>
              ) : null}
              <TextInputMargined
                ref={refSchool}
                label="Name of Your School"
                mode="outlined"
                textContentType="organizationName"
                value={values.School}
                onChangeText={handleChange('School')}
                onBlur={handleBlur('School')}
                onSubmitEditing={() => refWorkPlace.current.focus()}
              />
              {touched.School && errors.School ? (
                <HelperText padding="none" type="error">
                  {errors.School}
                </HelperText>
              ) : null}
              <TextInputMargined
                ref={refWorkPlace}
                label="Workplace"
                mode="outlined"
                textContentType="organizationName"
                value={values.WorkPlace}
                onChangeText={handleChange('WorkPlace')}
                onBlur={handleBlur('WorkPlace')}
              />
              {touched.WorkPlace && errors.WorkPlace ? (
                <HelperText padding="none" type="error">
                  {errors.WorkPlace}
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

const Card = styled(PaperCard)`
  margin-bottom: 10px;
`

const PickerMargined = styled(Picker)`
  margin-bottom: 10px;
`

const TextInputMargined = styled(TextInput)`
  margin-bottom: 10px;
`

export default ProfileForm
