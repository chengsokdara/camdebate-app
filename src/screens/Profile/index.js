import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import ImagePicker from 'react-native-image-picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  Avatar,
  Button,
  Card as PaperCard,
  Snackbar,
  TextInput,
  TouchableRipple
} from 'react-native-paper'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { Formik } from 'formik'
import { object, string } from 'yup'

import { primaryColor } from '../../resources'
import {
  GenderRadioItems,
  NationalityItems,
  TitleItems
} from '../../resources/mocks'
import { UpdateProfileMutation } from '../../resources/mutations'
import { ProfileQuery } from '../../resources/queries'
import { AppBar, DatePicker, Picker, Radio } from '../../components'

const ProfileSchema = object().shape({})

const ProfileScreen = ({ navigation }) => {
  const [toggleSnackbar, setToggleSnackbar] = useState(false)
  const [photoUri, setPhotoUri] = useState(undefined)
  const [
    updateProfile,
    { data: updateData, error: updateError, loading: updateLoading }
  ] = useMutation(UpdateProfileMutation)
  const { data, error, loading } = useQuery(ProfileQuery)

  if (loading) console.log('Loading...')
  if (error) console.log('Error', error)

  console.log('ProfileScreen data', data)
  console.log('ProfileScreen photoUri', photoUri)

  const handleUpdateProfile = async values => {
    //console.log('handleUpdateProfile values', values)
    try {
      setToggleSnackbar(true)
      const res = await updateProfile({
        variables: {
          input: values
        }
      })
      console.log('handleUpdateProfile response', res)
      const { code } = res.data.updateProfile
      if (code === 200) setToggleSnackbar(false)
    } catch (e) {
      console.log('updateProfile e', e)
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
                  Browse photo
                </Button>
                <Button
                  color="red"
                  mode="contained"
                  contentStyle={{ height: 48 }}
                  onPress={() => {
                    console.log('Remove image.')
                    setPhotoUri(undefined)
                  }}>
                  Remove photo
                </Button>
              </Column>
            </Row>
          </Card.Content>
        </Card>
        <Formik
          enableReinitialize
          initialValues={{
            Title: data ? data.profile.contact.Title : '',
            GivenName: data ? data.profile.contact.GivenName : '',
            FamilyName: data ? data.profile.contact.FamilyName : '',
            Sex: data ? data.profile.contact.Sex : '',
            Nationality: data ? data.profile.contact.Nationality : '',
            DOB: data ? data.profile.contact.DOB : '',
            Phone: data ? data.profile.contact.Phone : '',
            Email: data ? data.profile.contact.Email : '',
            WorkPlace: data ? data.profile.contact.WorkPlace : ''
          }}
          validationSchema={ProfileSchema}
          onSubmit={handleUpdateProfile}>
          {({ handleChange, handleBlur, handleSubmit, errors, values }) => (
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
                  <TextInputMargined
                    label="Given Name"
                    mode="outlined"
                    value={values.GivenName}
                    onChangeText={handleChange('GivenName')}
                    onBlur={handleBlur('GivenName')}
                  />
                  <TextInputMargined
                    label="Family Name"
                    mode="outlined"
                    value={values.FamilyName}
                    onChangeText={handleChange('FamilyName')}
                    onBlur={handleBlur('FamilyName')}
                  />
                  <Radio
                    color={primaryColor}
                    items={GenderRadioItems}
                    label="Gender"
                    orientation="horizontal"
                    value={values.Sex}
                    style={{ marginBottom: 10 }}
                    onChangeValue={handleChange('Sex')}
                  />
                  <PickerMargined
                    items={NationalityItems}
                    label="Select Nationality"
                    value={values.Nationality}
                    onChangeValue={handleChange('Nationality')}
                  />
                  <DatePicker
                    value={values.DOB}
                    style={{ marginBottom: 10 }}
                    onChangeValue={handleChange('DOB')}
                  />
                  <TextInputMargined
                    label="Personal Phone"
                    mode="outlined"
                    value={values.Phone}
                    onChangeText={handleChange('Phone')}
                    onBlur={handleBlur('Phone')}
                  />
                  {/* <TextInputMargined label="Working/Guardian Phone" mode="outlined" /> */}
                  <TextInputMargined
                    label="E-Mail"
                    mode="outlined"
                    value={values.Email}
                    onChangeText={handleChange('Email')}
                    onBlur={handleBlur('Email')}
                  />
                  {/* <TextInputMargined label="Current Address" mode="outlined" /> */}
                  {/* <TextInputMargined label="Name of Your School" mode="outlined" /> */}
                  <TextInput
                    label="Workplace"
                    mode="outlined"
                    value={values.WorkPlace}
                    onChangeText={handleChange('WorkPlace')}
                    onBlur={handleBlur('WorkPlace')}
                  />
                </Card.Content>
              </Card>
              <Button
                disabled={updateLoading}
                loading={updateLoading}
                mode="contained"
                contentStyle={{ width: '100%', height: 50 }}
                onPress={handleSubmit}>
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
        onDismiss={() => setToggleSnackbar(!toggleSnackbar)}
        action={{
          label: 'Done',
          onPress: () => setToggleSnackbar(!toggleSnackbar)
        }}>
        Profile updated!
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
  align-items: center;
  justify-content: space-evenly;
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
