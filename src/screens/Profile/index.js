import React from 'react'
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

import { primaryColor } from '../../resources'
import { TitleItems, NationalityItems } from '../../resources/mocks'
import { AppBar, DatePicker, Picker, Radio } from '../../components'

const ProfileScreen = ({ navigation }) => {
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
              (This photo will appear on your CamDEBATE Conestant ID Card)
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
                  source={require('../../resources/images/camdebate_white_logo.png')}
                />
              </TouchableRipple>
              <Column>
                <Button
                  mode="contained"
                  contentStyle={{ height: 48 }}
                  onPress={() =>
                    ImagePicker.launchImageLibrary(response => {
                      console.log('Response', response)
                    })
                  }>
                  Browse photo
                </Button>
                <Button
                  color="red"
                  mode="contained"
                  contentStyle={{ height: 48 }}
                  onPress={() => console.log('Remove image.')}>
                  Remove photo
                </Button>
              </Column>
            </Row>
          </Card.Content>
        </Card>
        <Card>
          <Card.Title title="Your Details" />
          <Card.Content>
            <PickerMargined items={TitleItems} label="Select Title" />
            <TextInputMargined label="Given Name" mode="outlined" />
            <TextInputMargined label="Family Name" mode="outlined" />
            <Radio
              color={primaryColor}
              label="Gender"
              orientation="horizontal"
              style={{ marginBottom: 10 }}
              items={[
                {
                  label: 'Male',
                  value: 'male'
                },
                {
                  label: 'Female',
                  value: 'female'
                }
              ]}
            />
            <PickerMargined
              items={NationalityItems}
              label="Select Nationality"
            />
            <DatePicker style={{ marginBottom: 10 }} />
            <TextInputMargined label="Personal Phone" mode="outlined" />
            <TextInputMargined label="Working/Guardian Phone" mode="outlined" />
            <TextInputMargined label="E-Mail" mode="outlined" />
            <TextInputMargined label="Current Address" mode="outlined" />
            <TextInputMargined label="Name of Your School" mode="outlined" />
            <TextInput label="Workplace" mode="outlined" />
          </Card.Content>
        </Card>
        <Button mode="contained" contentStyle={{ width: '100%', height: 50 }}>
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
