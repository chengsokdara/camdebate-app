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
import { HelperText, TextInput } from 'react-native-paper'

const ApplicationFormByLevel = ({
  errors,
  level,
  touched,
  values,
  handleChange,
  handleBlur
}) => {
  const refHighSchool = useRef()
  const refUniversity = useRef()
  const refEnglishSchool = useRef()
  const refWorkPlace = useRef()

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
      />
      {touched.EnglishSchool && errors.EnglishSchool ? (
        <HelperText padding="none" type="error">
          {errors.EnglishSchool}
        </HelperText>
      ) : null}
    </>
  ) : null
}

const TextInputMargined = styled(TextInput)`
  margin-bottom: 10px;
`

export default ApplicationFormByLevel
