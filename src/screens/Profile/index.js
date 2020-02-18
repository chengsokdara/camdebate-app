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
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import ImagePicker from 'react-native-image-picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  Avatar,
  Button,
  Card as PaperCard,
  HelperText,
  Snackbar,
  TextInput,
  TouchableRipple
} from 'react-native-paper'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { Formik } from 'formik'

import { AppBar, DatePicker, Picker, Radio } from '../../components'
import { primaryColor } from '../../resources'
import {
  GenderRadioItems,
  NationalityItems,
  TitleItems
} from '../../resources/mocks'
import { UpdateProfileMutation } from '../../resources/mutations'
import { ProfileQuery } from '../../resources/queries'
import { setProfileAsync } from '../../service'

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const [photoUri, setPhotoUri] = useState(undefined)
  const [toggleSnackbar, setToggleSnackbar] = useState('')
  const [
    updateProfile,
    { data: updateData, error: updateError, loading: updateLoading }
  ] = useMutation(UpdateProfileMutation)
  const { profile } = useSelector(state => state.auth, shallowEqual)
  //const { data, error, loading } = useQuery(ProfileQuery)

  //if (loading) console.log('Loading...')
  //if (error) console.log('Error', error)

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
  console.log('ProfileScreen photoUri', photoUri)

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

  useEffect(() => {
    console.log('useEffect updateData', updateData)
  }, [updateData])

  return (
    <>
      <AppBar
        title="My Profile"
        onNotiPress={() => navigation.navigate('Notification')}
      />
      <Content
        enableOnAndroid
        extraScrollHeight={200}
        contentContainerStyle={{
          flexGrow: 1,
          padding: 10
        }}>
        <Card>
          <Card.Title title="Your Photo" />
          <Card.Content>
            <TextMargined>
              (This photo will appear on your CamDEBATE Contestant ID Card)
            </TextMargined>
            <Row>
              <TouchableRipple
                borderless
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 75
                }}
                onPress={() =>
                  ImagePicker.launchImageLibrary(response => {
                    console.log('Response', response)
                  })
                }>
                <Avatar.Image
                  size={150}
                  source={
                    photoUri
                      ? { uri: `file://${photoUri}` }
                      : require('../../resources/images/camdebate_white_logo.png')
                  }
                />
              </TouchableRipple>
              <Column>
                <Button
                  mode="contained"
                  contentStyle={{ height: 48 }}
                  onPress={() =>
                    ImagePicker.launchImageLibrary({}, response => {
                      console.log('Response', response)
                      setPhotoUri(response.path)
                    })
                  }>
                  Browse
                </Button>
                <Button
                  color="red"
                  mode="contained"
                  contentStyle={{ height: 48 }}
                  onPress={() => {
                    console.log('Remove image.')
                    setPhotoUri(undefined)
                  }}>
                  Remove
                </Button>
              </Column>
            </Row>
          </Card.Content>
        </Card>
        <Formik
          enableReinitialize
          initialValues={InitialValues}
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
        <Footer>
          <Text>
            {`
The CamDEBATE Championship Series
is an initiative of IDP Education
Copyright @ 2020 The CamDEBATE Championship Series.
All Right Reserved.
            `}
          </Text>
        </Footer>
      </Content>
      <Snackbar
        duration={5000}
        visible={toggleSnackbar}
        onDismiss={() => setToggleSnackbar('')}
        action={{
          label: 'Done',
          onPress: () => setToggleSnackbar('')
        }}>
        {toggleSnackbar || 'Profile updated!'}
      </Snackbar>
    </>
  )
}

const Card = styled(PaperCard)`
  margin-bottom: 10px;
`

const Column = styled.View`
  flex: 1;
  align-self: stretch;
  align-items: stretch;
  justify-content: space-evenly;
  padding-left: 20px;
`

const Content = styled(KeyboardAwareScrollView)``

const Footer = styled.View`
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
`

const PickerMargined = styled(Picker)`
  margin-bottom: 10px;
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const Text = styled.Text`
  font-size: 14px;
  text-align: center;
`

const TextMargined = styled(Text)`
  font-size: 14px;
  color: #757575;
  margin-bottom: 20px;
`

const TextInputMargined = styled(TextInput)`
  margin-bottom: 10px;
`

export default ProfileScreen
