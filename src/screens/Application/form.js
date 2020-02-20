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
  TextInput
} from 'react-native-paper'
import { useMutation } from '@apollo/react-hooks'
import { Formik } from 'formik'
import { object, string } from 'yup'

import { DatePicker, Picker, Radio } from '../../components'
import { primaryColor } from '../../resources'
import {
  CityProvinceItems,
  CompetitionLevelItems,
  CompetitionCategoryItems,
  GenderItems,
  NationalityItems,
  TeeShirtSizeItems,
  TitleItems
} from '../../resources/mocks'
import { CreateApplicantMutation } from '../../resources/mutations'
import ApplicationFormByLevel from './level'

const ApplicationSchema = object().shape({
  Level: string().required('Competition level is a required field.'),
  Category: string().required('Competitoin category is a required field.'),
  Title: string().required('Title is a required field.'),
  GivenName: string()
    .min(2, 'Given name must be at least 2 characters.')
    .max(50, 'Given name length is too long.')
    .required('Given name is a required field.'),
  FamilyName: string()
    .min(2, 'Family name must be at least 2 characters.')
    .max(50, 'Family name length is too long.')
    .required('Family name is a required field.'),
  Sex: string().required('Gender is a required field.'),
  TshirtSize: string().required('T-Shirt size is a required field.'),
  Nationality: string().required('Nationality is a required field.'),
  DOB: string().required('Date of birth is a required field.'),
  Phone: string()
    .min(9, 'Phone number must be at least 9 characters.')
    .max(15, 'Phone number length is too long.')
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      'Phone number is not valid.'
    )
    .required('Mobile phone is a required field'),
  Email: string()
    .min(7, 'Email must be at least 7 characters.')
    .max(50, 'Email length is too long.')
    .email('Email is not valid.')
    .required('Email is a required field.'),
  Address: string()
    .min(5, 'Address must be at least 5 characters.')
    .max(100, 'Address length is too long.')
    .required('Residential address is a required field.'),
  CityProvince: string().required('City/Province is a required field.'),
  HighSchool: string().when('Level', {
    is: 'High School',
    then: string()
      .min(3, 'High school must be at least 3 characters.')
      .max(50, 'High school length is too long')
      .required('High school is a required field.')
  }),
  University: string()
    .when('Level', {
      is: 'University',
      then: string()
        .min(3, 'University must be at least 3 characters.')
        .max(50, 'University length is too long')
        .required('University is a required field.')
    })
    .when('Level', {
      is: 'Young Professionals',
      then: string()
        .min(3, 'University must be at least 3 characters.')
        .max(50, 'University length is too long')
        .required('University is a required field.')
    }),
  EnglishSchool: string()
    .when('Level', {
      is: 'High School',
      then: string()
        .min(3, 'English school must be at least 3 characters.')
        .max(50, 'English school length is too long')
        .required('English school is a required field.')
    })
    .when('Level', {
      is: 'University',
      then: string()
        .min(3, 'English school must be at least 3 characters.')
        .max(50, 'English school length is too long')
        .required('English school is a required field.')
    }),
  WorkPlace: string().when('Level', {
    is: 'Young Professionals',
    then: string()
      .min(3, 'Work place must be at least 3 characters.')
      .max(50, 'Work place length is too long')
      .required('Work place is a required field')
  }),
  GuardianPhone: string()
    .min(9, 'Guardian phone number must be at least 9 characters.')
    .max(15, 'Guardian phone number length is too long.')
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      'Emergency/Guardian phone number is not valid.'
    )
    .required('Emergency/Guardian phone number is a required field.')
})

const ApplicationForm = ({
  content,
  profile,
  title,
  setToggleSnackbar,
  onRegistred
}) => {
  const refFamilyName = useRef()
  const refPhone = useRef()
  const refEmail = useRef()
  const refAddress = useRef()
  const refGuardianPhone = useRef()

  const [level, setLevel] = useState()
  const [createApplicant, { error, loading }] = useMutation(
    CreateApplicantMutation
  )

  const InitialValues = {
    Level: '',
    Category: '',
    Title: profile ? profile.Title : '',
    GivenName: profile ? profile.GivenName : '',
    FamilyName: profile ? profile.FamilyName : '',
    Sex: profile ? profile.Sex : '',
    TshirtSize: '',
    Nationality: profile ? profile.Nationality : '',
    DOB: profile ? profile.DOB : '',
    Phone: profile ? profile.Phone : '',
    Email: profile ? profile.Email : '',
    Address: profile ? profile.Address : '',
    CityProvince: '',
    HighSchool: '',
    University: '',
    EnglishSchool: '',
    WorkPlace: profile ? profile.WorkPlace : '',
    GuardianPhone: profile ? profile.GuardianPhone : ''
  }

  const handleRegistration = async values => {
    console.log('handleRegistration values', values)
    try {
      const res = await createApplicant({
        variables: {
          input: values
        }
      })
      console.log('createApplicant res', res)
      const { code } = res.data.createApplicant
      if (code === 200) onRegistred && onRegistred()
      else setToggleSnackbar('There is some errors!')
    } catch (e) {
      console.log('createApplicant error', e)
      setToggleSnackbar('Unknown Error!')
    }
  }

  return (
    <Formik
      initialValues={InitialValues}
      validationSchema={ApplicationSchema}
      onSubmit={handleRegistration}>
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        setValues,
        errors,
        touched,
        values
      }) => (
        <>
          <Card>
            <Card.Title title={title} />
            <Card.Content>
              <TextContent>{content}</TextContent>
              <RadioMargined
                color={primaryColor}
                label="Competition Level"
                items={CompetitionLevelItems}
                value={values.Level}
                onChangeValue={value => {
                  if (value === 'High School')
                    setValues({
                      ...values,
                      University: '',
                      WorkPlace: ''
                    })
                  if (value === 'University')
                    setValues({
                      ...values,
                      HighSchool: '',
                      WorkPlace: ''
                    })
                  if (value === 'Young Professionals')
                    setValues({
                      ...values,
                      HighSchool: '',
                      EnglishSchool: ''
                    })
                  setLevel(value)
                  handleChange('Level')(value)
                }}
              />
              {touched.Level && errors.Level ? (
                <HelperText padding="none" type="error">
                  {errors.Level}
                </HelperText>
              ) : null}
              <RadioMargined
                color={primaryColor}
                label="Competition Category"
                items={CompetitionCategoryItems}
                value={values.Category}
                onChangeValue={handleChange('Category')}
              />
              {touched.Category && errors.Category ? (
                <HelperText padding="none" type="error">
                  {errors.Category}
                </HelperText>
              ) : null}
              <Label>Competition Information</Label>
              <ApplicationFormByLevel
                errors={errors}
                level={level}
                touched={touched}
                values={values}
                handleBlur={handleBlur}
                handleChange={handleChange}
              />
              <PickerMargined
                items={TeeShirtSizeItems}
                label="Select Tshirt Size"
                values={values.TshirtSize}
                onChangeValue={handleChange('TshirtSize')}
              />
              {touched.TshirtSize && errors.TshirtSize ? (
                <HelperText padding="none" type="error">
                  {errors.TshirtSize}
                </HelperText>
              ) : null}
              <PickerMargined
                items={CityProvinceItems}
                label="Select City/Province"
                value={values.CityProvince}
                onChangeValue={handleChange('CityProvince')}
              />
              {touched.CityProvince && errors.CityProvince ? (
                <HelperText padding="none" type="error">
                  {errors.CityProvince}
                </HelperText>
              ) : null}
              <LabelMargined>Applicant Information</LabelMargined>
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
                label="Mobile Phone"
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
                label="Emergency/Guardian Phone"
                mode="outlined"
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
                label="Your E-Mail"
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
                label="Residential Address"
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
                items={GenderItems}
                label="Select Gender"
                value={values.Sex}
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
                onChangeValue={handleChange('DOB')}
              />
              {touched.DOB && errors.DOB ? (
                <HelperText padding="none" type="error">
                  {errors.DOB}
                </HelperText>
              ) : null}
            </Card.Content>
          </Card>
          {error ? (
            <HelperText padding="none" type="error">
              {error.message}
            </HelperText>
          ) : null}
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
  )
}

const Card = styled(PaperCard)`
  margin-bottom: 10px;
`

const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
  padding: 5px;
  margin-bottom: 5px;
`

const LabelMargined = styled(Label)`
  margin-bottom: 10px;
`

const PickerMargined = styled(Picker)`
  margin-bottom: 10px;
`

const RadioMargined = styled(Radio)`
  margin-bottom: 10px;
`

const Text = styled.Text`
  font-size: 14px;
`

const TextContent = styled(Text)`
  margin-bottom: 10px;
`

const TextInputMargined = styled(TextInput)`
  margin-bottom: 10px;
`

export default ApplicationForm
