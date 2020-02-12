import React, { useRef } from 'react'
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
import { Formik } from 'formik'
import { object, string } from 'yup'

import { AppBar, DatePicker, Picker, Radio } from '../../components'
import { primaryColor, NationalityItems, TitleItems } from '../../resources'
import {
  CityProvinceItems,
  CompetitionLevelItems,
  CompetitionCategoryItems,
  GenderItems,
  MockRegistration,
  TeeShirtSizeItems
} from '../../resources/mocks'

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
  University: '',
  EnglishSchool: '',
  GuardianPhone: ''
}

const RegistrationSchema = object().shape({
  CompetitionLevel: string().required('Competition Level is a required field.'),
  CompetitionCategory: string().required(
    'Competitoin Category is a required field.'
  )
})

const RegisterScreen = ({ navigation }) => {
  const refFamilyName = useRef()
  const refPhone = useRef()
  const refEmail = useRef()
  const refAddress = useRef()
  const refUniversity = useRef()
  const refEnglishSchool = useRef()
  const refGuardianPhone = useRef()
  const { content, link, notice, title } = MockRegistration

  const handleRegistration = async values => {
    console.log('handleRegistration values', values)
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
          validationSchema={RegistrationSchema}
          onSubmit={handleRegistration}>
          {({ handleChange, handleBlur, handleSubmit, errors, values }) => (
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
                    onChangeValue={handleChange('CompetitionLevel')}
                  />
                  {errors.CompetitionLevel ? (
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
                  {errors.CompetitionCategory ? (
                    <HelperText padding="none" type="error">
                      {errors.CompetitionCategory}
                    </HelperText>
                  ) : null}
                  <PickerMargined
                    items={TitleItems}
                    label="Select Title"
                    value={values.Title}
                    onChangeValue={handleChange('Title')}
                  />
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
                  {/* Add Gender */}
                  <PickerMargined
                    items={GenderItems}
                    label="Select Gender"
                    value={values.Sex}
                    onChangeValue={handleChange('Sex')}
                  />
                  <PickerMargined
                    items={TeeShirtSizeItems}
                    label="Select Tshirt Size"
                    values={values.TshirtSize}
                    onChangeValue={handleChange('TshirtSize')}
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
                  <TextInputMargined
                    ref={refAddress}
                    label="Residential Address"
                    mode="outlined"
                    value={values.Address}
                    onChangeText={handleChange('Address')}
                    onBlur={handleBlur('Address')}
                    onSubmitEditing={() => refUniversity.current.focus()}
                  />
                  <PickerMargined
                    items={CityProvinceItems}
                    label="Select City/Province"
                    value={values.CityProvince}
                    onChangeValue={handleChange('CityProvince')}
                  />
                  <TextInputMargined
                    ref={refUniversity}
                    label="Name of Your University"
                    mode="outlined"
                    value={values.University}
                    onChangeText={handleChange('University')}
                    onBlur={handleBlur('University')}
                    onSubmitEditing={() => refEnglishSchool.current.focus()}
                  />
                  <TextInputMargined
                    ref={refEnglishSchool}
                    label="Name of Your English School"
                    mode="outlined"
                    value={values.EnglishSchool}
                    onChangeText={handleChange('EnglishSchool')}
                    onBlur={handleBlur('EnglishSchool')}
                    onSubmitEditing={() => refGuardianPhone.current.focus()}
                  />
                  <TextInputMargined
                    ref={refGuardianPhone}
                    label="Emergency/Guardian Phone"
                    mode="outlined"
                    value={values.GuardianPhone}
                    onChangeText={handleChange('GuardianPhone')}
                    onBlur={handleBlur('GuardianPhone')}
                  />
                </Card.Content>
              </Card>
              <Button
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

export default RegisterScreen
