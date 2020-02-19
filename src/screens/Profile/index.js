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

import { AppBar, Picker } from '../../components'
import ProfileForm from './form'

const ProfileScreen = ({ navigation }) => {
  const [photoUri, setPhotoUri] = useState(undefined)
  const [toggleSnackbar, setToggleSnackbar] = useState('')

  console.log('ProfileScreen photoUri', photoUri)

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
        <ProfileForm setToggleSnackbar={setToggleSnackbar} />
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
