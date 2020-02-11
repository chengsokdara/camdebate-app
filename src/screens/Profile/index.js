import React, { useState } from 'react'
import styled from 'styled-components/native'
import ImagePicker from 'react-native-image-picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  Avatar,
  Button,
  Card as PaperCard,
  TextInput,
  TouchableRipple
} from 'react-native-paper'
import { useMutation, useQuery } from '@apollo/react-hooks'

import { primaryColor } from '../../resources'
import { NationalityItems, TitleItems } from '../../resources/mocks'
import { UpdateProfileMutation } from '../../resources/mutations'
import { ProfileQuery } from '../../resources/queries'
import { AppBar, DatePicker, Picker, Radio } from '../../components'

const ProfileScreen = ({ navigation }) => {
  const [localState, setLocalState] = useState({})
  const [photoUri, setPhotoUri] = useState(undefined)
  const [
    updateProfile,
    { data: updateData, error: updateError, loading: updateLoading }
  ] = useMutation(UpdateProfileMutation)
  const { data, error, loading } = useQuery(ProfileQuery)

  if (loading) console.log('Loading...')
  if (error) console.log('Error', error)

  console.log('ProfileScreen data', data)
  console.log('ProfileScreen localState', localState)
  console.log('ProfileScreen photoUri', photoUri)

  const handleChangeValue = type => newValue => {
    setLocalState({
      ...localState,
      [type]: newValue
    })
  }

  const handleUpdateProfile = () => {
    try {
      updateProfile({
        variables: {
          input: localState
        }
      })
    } catch (e) {
      console.log('updateProfile e', e)
    }
  }

  return (
    <>
      <AppBar
        title="My Profile"
        onNotiPress={() => navigation.navigate('Notification')}
      />
      {data ? (
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
          <Card>
            <Card.Title title="Your Details" />
            <Card.Content>
              <PickerMargined
                items={TitleItems}
                label="Select Title"
                value={
                  localState.Title
                    ? localState.Title
                    : data.profile.contact.Title
                }
                onChangeValue={handleChangeValue('Title')}
              />
              <TextInputMargined
                label="Given Name"
                mode="outlined"
                value={
                  localState.GivenName
                    ? localState.GivenName
                    : data.profile.contact.GivenName
                }
                onChangeText={handleChangeValue('GivenName')}
              />
              <TextInputMargined
                label="Family Name"
                mode="outlined"
                value={
                  localState.FamilyName
                    ? localState.FamilyName
                    : data.profile.contact.FamilyName
                }
                onChangeText={handleChangeValue('FamilyName')}
              />
              <Radio
                color={primaryColor}
                items={[
                  {
                    label: 'Male',
                    value: 'Male'
                  },
                  {
                    label: 'Female',
                    value: 'Female'
                  }
                ]}
                label="Gender"
                orientation="horizontal"
                value={
                  localState.Sex ? localState.Sex : data.profile.contact.Sex
                }
                style={{ marginBottom: 10 }}
                onChangeValue={handleChangeValue('Sex')}
              />
              <PickerMargined
                items={NationalityItems}
                label="Select Nationality"
                value={
                  localState.Nationality
                    ? localState.Nationality
                    : data.profile.contact.Nationality
                }
                onChangeValue={handleChangeValue('Nationality')}
              />
              <DatePicker
                value={
                  localState.DOB ? localState.DOB : data.profile.contact.DOB
                }
                style={{ marginBottom: 10 }}
                onChangeValue={handleChangeValue('DOB')}
              />
              <TextInputMargined
                label="Personal Phone"
                mode="outlined"
                value={
                  localState.Phone
                    ? localState.Phone
                    : data.profile.contact.Phone
                }
                onChangeText={handleChangeValue('Phone')}
              />
              {/* <TextInputMargined label="Working/Guardian Phone" mode="outlined" /> */}
              <TextInputMargined
                label="E-Mail"
                mode="outlined"
                value={
                  localState.Email
                    ? localState.Email
                    : data.profile.contact.Email
                }
                onChangeText={handleChangeValue('Email')}
              />
              {/* <TextInputMargined label="Current Address" mode="outlined" /> */}
              {/* <TextInputMargined label="Name of Your School" mode="outlined" /> */}
              <TextInput
                label="Workplace"
                mode="outlined"
                value={
                  localState.WorkPlace
                    ? localState.WorkPlace
                    : data.profile.contact.WorkPlace
                }
                onChangeText={handleChangeValue('WorkPlace')}
              />
            </Card.Content>
          </Card>
          <Button
            mode="contained"
            contentStyle={{ width: '100%', height: 50 }}
            onPress={handleUpdateProfile}>
            Save
          </Button>
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
      ) : null}
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
