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
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Linking } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  Button,
  Caption,
  Card as PaperCard,
  HelperText,
  TextInput
} from 'react-native-paper'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { Formik } from 'formik'
import { object, string } from 'yup'

import { AppBar, DatePicker, Picker, Radio } from '../../components'
import { primaryColor } from '../../resources'
import {
  CityProvinceItems,
  CompetitionLevelItems,
  CompetitionCategoryItems,
  GenderItems,
  MockRegistration,
  NationalityItems,
  TeeShirtSizeItems,
  TitleItems
} from '../../resources/mocks'
import { CreateApplicantMutation } from '../../resources/mutations'

const InitialValues = {
  CompetitionLevel: '',
  CompetitionCategory: '',
  Title: '',
  GivenName: '',
  FamilyName: '',
  Sex: '',
  TshirtSize: '',
  Nationality: '',
  DOB: '',
  Phone: '',
  Email: '',
  Address: '',
  CityProvince: '',
  HighSchool: '',
  University: '',
  EnglishSchool: '',
  WorkPlace: '',
  GuardianPhone: ''
}

const ApplicationSchema = object().shape({
  CompetitionLevel: string().required('Competition level is a required field.'),
  CompetitionCategory: string().required(
    'Competitoin category is a required field.'
  ),
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
  HighSchool: string().when('CompetitionLevel', {
    is: 'High School',
    then: string()
      .min(3, 'High school must be at least 3 characters.')
      .max(50, 'High school length is too long')
      .required('High school is a required field.')
  }),
  University: string()
    .when('CompetitionLevel', {
      is: 'University',
      then: string()
        .min(3, 'University must be at least 3 characters.')
        .max(50, 'University length is too long')
        .required('University is a required field.')
    })
    .when('CompetitionLevel', {
      is: 'Young Professionals',
      then: string()
        .min(3, 'University must be at least 3 characters.')
        .max(50, 'University length is too long')
        .required('University is a required field.')
    }),
  EnglishSchool: string()
    .when('CompetitionLevel', {
      is: 'High School',
      then: string()
        .min(3, 'English school must be at least 3 characters.')
        .max(50, 'English school length is too long')
        .required('English school is a required field.')
    })
    .when('CompetitionLevel', {
      is: 'University',
      then: string()
        .min(3, 'English school must be at least 3 characters.')
        .max(50, 'English school length is too long')
        .required('English school is a required field.')
    }),
  WorkPlace: string().when('CompetitionLevel', {
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

const ApplicationScreen = ({ navigation }) => {
  const refFamilyName = useRef()
  const refPhone = useRef()
  const refEmail = useRef()
  const refAddress = useRef()
  const refHighSchool = useRef()
  const refUniversity = useRef()
  const refEnglishSchool = useRef()
  const refWorkPlace = useRef()
  const refGuardianPhone = useRef()

  const [level, setLevel] = useState()
  const [createApplicant, { data, loading, error }] = useMutation(
    CreateApplicantMutation
  )

  const { content, link, notice, title } = MockRegistration

  const handleRegistration = async values => {
    console.log('handleRegistration values', values)
    navigation.navigate('Payment')
    // const res = await createApplicant({
    //   variables: {
    //     input: values
    //   }
    // })
    // console.log('createApplicant res', res)
    // const { code, applicant } = res
    // if (code === 200) console.log('createApplicant applicant', applicant)
  }

  const renderBaseOnLevel = ({
    handleChange,
    handleBlur,
    errors,
    touched,
    values
  }) => {
    return level === 'University' ? (
      <>
        <TextInputMargined
          ref={refUniversity}
          label="Name of Your University"
          mode="outlined"
          value={values.University}
          onChangeText={handleChange('University')}
          onBlur={handleBlur('University')}
          onSubmitEditing={() => refEnglishSchool.current.focus()}
        />
        {touched.University && errors.University ? (
          <HelperText padding="none" type="error">
            {errors.University}
          </HelperText>
        ) : null}
        <TextInputMargined
          ref={refEnglishSchool}
          label="Name of Your English School"
          mode="outlined"
          value={values.EnglishSchool}
          onChangeText={handleChange('EnglishSchool')}
          onBlur={handleBlur('EnglishSchool')}
          onSubmitEditing={() => refGuardianPhone.current.focus()}
        />
        {touched.EnglishSchool && errors.EnglishSchool ? (
          <HelperText padding="none" type="error">
            {errors.EnglishSchool}
          </HelperText>
        ) : null}
      </>
    ) : level === 'Young Professionals' ? (
      <>
        <TextInputMargined
          ref={refUniversity}
          label="Name of Your University"
          mode="outlined"
          value={values.University}
          onChangeText={handleChange('University')}
          onBlur={handleBlur('University')}
          onSubmitEditing={() => refWorkPlace.current.focus()}
        />
        {touched.University && errors.University ? (
          <HelperText padding="none" type="error">
            {errors.University}
          </HelperText>
        ) : null}
        <TextInputMargined
          ref={refWorkPlace}
          label="Name of Your Workplace"
          mode="outlined"
          value={values.WorkPlace}
          onChangeText={handleChange('WorkPlace')}
          onBlur={handleBlur('WorkPlace')}
          onSubmitEditing={() => refGuardianPhone.current.focus()}
        />
        {touched.WorkPlace && errors.WorkPlace ? (
          <HelperText padding="none" type="error">
            {errors.WorkPlace}
          </HelperText>
        ) : null}
      </>
    ) : level === 'High School' ? (
      <>
        <TextInputMargined
          ref={refHighSchool}
          label="Name of Your High School"
          mode="outlined"
          value={values.HighSchool}
          onChangeText={handleChange('HighSchool')}
          onBlur={handleBlur('HighSchool')}
          onSubmitEditing={() => refEnglishSchool.current.focus()}
        />
        {touched.HighSchool && errors.HighSchool ? (
          <HelperText padding="none" type="error">
            {errors.HighSchool}
          </HelperText>
        ) : null}
        <TextInputMargined
          ref={refEnglishSchool}
          label="Name of Your English School"
          mode="outlined"
          value={values.EnglishSchool}
          onChangeText={handleChange('EnglishSchool')}
          onBlur={handleBlur('EnglishSchool')}
          onSubmitEditing={() => refGuardianPhone.current.focus()}
        />
        {touched.EnglishSchool && errors.EnglishSchool ? (
          <HelperText padding="none" type="error">
            {errors.EnglishSchool}
          </HelperText>
        ) : null}
      </>
    ) : null
  }

  return (
    <Container>
      <AppBar
        backable={false}
        onNotiPress={() => navigation.navigate('Notification')}
      />
      <Content
        enableOnAndroid
        extraScrollHeight={200}
        contentContainerStyle={{
          flexGrow: 1,
          padding: 10
        }}>
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
                    value={values.CompetitionLevel}
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
                      handleChange('CompetitionLevel')(value)
                    }}
                  />
                  {touched.CompetitionLevel && errors.CompetitionLevel ? (
                    <HelperText padding="none" type="error">
                      {errors.CompetitionLevel}
                    </HelperText>
                  ) : null}
                  <RadioMargined
                    color={primaryColor}
                    label="Category"
                    items={CompetitionCategoryItems}
                    value={values.CompetitionCategory}
                    onChangeValue={handleChange('CompetitionCategory')}
                  />
                  {touched.CompetitionCategory && errors.CompetitionCategory ? (
                    <HelperText padding="none" type="error">
                      {errors.CompetitionCategory}
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
                    label="Mobile Phone"
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
                    ref={refGuardianPhone}
                    label="Emergency/Guardian Phone"
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
                    onSubmitEditing={() =>
                      level === 'High School'
                        ? refHighSchool.current.focus()
                        : refUniversity.current.focus()
                    }
                  />
                  {touched.Address && errors.Address ? (
                    <HelperText padding="none" type="error">
                      {errors.Address}
                    </HelperText>
                  ) : null}
                  {renderBaseOnLevel({
                    handleChange,
                    handleBlur,
                    errors,
                    touched,
                    values
                  })}
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
          <Caption style={{ marginTop: 10 }}>
            {notice}
            <Link
              color={primaryColor}
              style={{ color: 'blue' }}
              onPress={() => Linking.openURL(`mailto:${link}`)}>
              {link}
            </Link>
          </Caption>
        </Footer>
      </Content>
    </Container>
  )
}

const Card = styled(PaperCard)`
  margin-bottom: 10px;
`

const Container = styled.View`
  flex: 1;
`

const Content = styled(KeyboardAwareScrollView)``

const Footer = styled.View`
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 20px;
`

const Link = styled.Text`
  font-size: 12px;
  color: ${props => props.color};
  margin-left: 5px;
  margin-right: 5px;
  padding-left: 5px;
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

export default ApplicationScreen
