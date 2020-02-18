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
import RNDatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'

import { primaryColor } from '../../../resources'

const DatePicker = ({
  label = 'Date of Birth',
  placeholder = 'Select your date of birth',
  value,
  onChangeValue,
  style,
  ...rest
}) => {
  const dateRef = useRef()
  const [dateText, setDateText] = useState()

  const _openDatePicker = () => dateRef.current.onPressDate()

  const handleValueChange = date => {
    console.log('date', date)
    setDateText(date)
    onChangeValue && onChangeValue(date)
  }

  return (
    <>
      <Container
        style={[
          {
            height: 56,
            marginTop: 7,
            borderRadius: 10,
            backgroundColor: '#f5f5f5'
          },
          style
        ]}>
        <RNDatePicker
          ref={dateRef}
          {...rest}
          date={dateText ? dateText : value}
          mode="date"
          placeholder={placeholder}
          format="YYYY-MM-DD"
          minDate="1900-01-01"
          maxDate="2100-01-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon={false}
          style={{
            width: '100%',
            height: 56,
            marginTop: 8
          }}
          customStyles={{
            dateInput: {
              height: 57,
              borderColor: '#757575',
              borderRadius: 10,
              paddingHorizontal: 10,
              alignItems: 'flex-start'
            },
            dateText: {
              color: dateText ? 'black' : '#757575',
              fontSize: 16
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={handleValueChange}
        />
        <Label>{label}</Label>
        <ChevronDownIcon
          name="chevron-down-circle"
          size={24}
          color={primaryColor}
          onPress={_openDatePicker}
        />
      </Container>
    </>
  )
}

const Container = styled.View`
  flex: 1;
`

const ChevronDownIcon = styled(Icon)`
  position: absolute;
  top: 15px;
  right: 10px;
`

const Label = styled.Text`
  position: absolute;
  top: -8px;
  left: 10px;
  color: #757575;
  font-size: 12px;
  padding-left: 5px;
  padding-right: 5px;
  background-color: #f5f5f5;
`

export default DatePicker
