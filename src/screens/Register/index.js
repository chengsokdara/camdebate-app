import React from 'react'
import styled from 'styled-components/native'
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Linking } from 'react-native'
import { Caption, Card as PaperCard, TextInput } from 'react-native-paper'

import { AppBar, DatePicker, Picker, Radio } from '../../components'
import { primaryColor, NationalityItems, TitleItems } from '../../resources'
import { GenderItems, MockRegistration } from '../../resources/mocks'

const RegisterScreen = ({ navigation }) => {
  const { content, link, notice, title } = MockRegistration
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
        <Card>
          <Card.Title title={title} />
          <Card.Content>
            <TextContent>{content}</TextContent>
            <RadioMargined
              color={primaryColor}
              label="Competition Level"
              items={[
                {
                  label: 'High School',
                  value: 'highschool'
                },
                {
                  label: 'University',
                  value: 'university'
                },
                {
                  label: 'Young Professionals',
                  value: 'youngProfessionals'
                }
              ]}
            />
            <RadioMargined
              color={primaryColor}
              label="Category"
              items={[
                {
                  label: 'Public Speaking',
                  value: 'publicSpeaking'
                },
                {
                  label: 'Debate',
                  value: 'debate'
                }
              ]}
            />
            <PickerMargined items={TitleItems} label="Select Title" />
            <TextInputMargined label="Given Name" mode="outlined" />
            <TextInputMargined label="Family Name" mode="outlined" />
            {/* Add Gender */}
            <PickerMargined items={GenderItems} label="Select Gender" />
            <PickerMargined
              items={[
                {
                  label: 'S',
                  value: 's'
                },
                {
                  label: 'M',
                  value: 'm'
                },
                {
                  label: 'M/L',
                  value: 'ml'
                },
                {
                  label: 'L',
                  value: 'l'
                },
                {
                  label: 'XL',
                  value: 'xl'
                }
              ]}
              label="Select Tshirt Size"
            />
            <PickerMargined
              items={NationalityItems}
              label="Select Nationality"
            />
            <DatePicker style={{ marginBottom: 10 }} />
            <TextInputMargined label="Mobile Phone" mode="outlined" />
            <TextInputMargined label="Your E-Mail" mode="outlined" />
            <TextInputMargined label="Residential Address" mode="outlined" />
            <PickerMargined
              items={[
                {
                  label: '',
                  value: ''
                },
                {
                  label: 'Phnom Penh',
                  value: 'phnompenh'
                }
              ]}
              label="Select City/Province"
            />
            <TextInputMargined
              label="Name of Your University"
              mode="outlined"
            />
            <TextInputMargined
              label="Name of Your English School"
              mode="outlined"
            />
            <TextInputMargined
              label="Emergency/Guardian Phone"
              mode="outlined"
            />
          </Card.Content>
        </Card>
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

export default RegisterScreen
